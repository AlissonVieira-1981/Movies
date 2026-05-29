import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Hls from "hls.js";
import "./Canais.css";

const IPTV_BR_URL = "https://iptv-org.github.io/iptv/countries/br.m3u";
const STORAGE_KEY = "nexus-canais-funcionando";
const MAX_CANAIS_TESTADOS = 120;
const TEST_TIMEOUT_MS = 6000;

const canaisFallback = [
  {
    nome: "TV Brasil",
    tipo: "hls",
    url: "https://tvbrasil-stream.ebc.com.br/index.m3u8",
    sinopse:
      "Canal público nacional com programação variada de jornalismo, cultura, esportes e entretenimento.",
  },
  {
    nome: "Canal Gov",
    tipo: "hls",
    url: "https://canalgov-stream.ebc.com.br/index.m3u8",
    sinopse:
      "Transmissões oficiais do Governo Federal, incluindo eventos e comunicados.",
  },
];

function pegarNomeDaLinha(linha) {
  return linha.split(",").pop()?.trim() || "Canal sem nome";
}

function parseM3U(texto) {
  const linhas = texto.split("\n").map((linha) => linha.trim());
  const canaisEncontrados = [];

  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];

    if (!linha.startsWith("#EXTINF")) continue;

    const nome = pegarNomeDaLinha(linha);
    const url = linhas[i + 1];

    if (!url || !url.startsWith("http") || !url.includes(".m3u8")) continue;

    canaisEncontrados.push({
      nome,
      tipo: "hls",
      url,
      sinopse: `Canal público listado pelo IPTV-org: ${nome}.`,
    });
  }

  return canaisEncontrados;
}

function juntarSemDuplicar(...listas) {
  const urls = new Set();

  return listas
    .flat()
    .filter((canal) => {
      if (urls.has(canal.url)) return false;

      urls.add(canal.url);
      return true;
    });
}

function salvarCanais(canais) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(canais));
}

function lerCanaisSalvos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

async function testarCanalHls(canal) {
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), TEST_TIMEOUT_MS);

  try {
    const response = await fetch(canal.url, {
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) return false;

    const texto = await response.text();

    return texto.includes("#EXTM3U");
  } catch {
    return false;
  } finally {
    window.clearTimeout(timeout);
  }
}

async function filtrarCanaisFuncionando(canais, onProgress) {
  const total = canais.length;
  const resultado = new Array(total).fill(null);

  let proximo = 0;
  let testados = 0;
  let aprovados = 0;

  async function worker() {
    while (proximo < total) {
      const index = proximo;
      proximo += 1;

      const canal = canais[index];
      const funciona = await testarCanalHls(canal);

      testados += 1;

      if (funciona) {
        aprovados += 1;
        resultado[index] = canal;
      }

      onProgress(testados, total, aprovados);
    }
  }

  await Promise.all(Array.from({ length: 6 }, worker));

  return resultado.filter(Boolean);
}

function HlsPlayer({ canal, onError }) {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    let hls;

    const iniciarVideo = () => {
      video.play().catch(() => { });
    };

    video.muted = false;
    video.volume = 1;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = canal.url;
      video.addEventListener("loadedmetadata", iniciarVideo);
    } else if (Hls.isSupported()) {
      hls = new Hls({
        enableWorker: true,
        lowLatencyMode: true,
      });

      hls.loadSource(canal.url);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, iniciarVideo);

      hls.on(Hls.Events.ERROR, (_, data) => {
        if (!data.fatal) return;

        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) {
          hls.startLoad();
          return;
        }

        if (data.type === Hls.ErrorTypes.MEDIA_ERROR) {
          hls.recoverMediaError();
          return;
        }

        onError();
      });
    } else {
      onError();
    }

    return () => {
      video.pause();
      video.removeEventListener("loadedmetadata", iniciarVideo);

      if (hls) {
        hls.destroy();
      }

      video.removeAttribute("src");
      video.load();
    };
  }, [canal.url, onError]);

  return (
    <video
      ref={videoRef}
      className="channel-video"
      controls
      autoPlay
      playsInline
    />
  );
}

export default function Canais() {
  const navigate = useNavigate();

  const [canaisDisponiveis, setCanaisDisponiveis] = useState(canaisFallback);
  const [canalAtual, setCanalAtual] = useState(canaisFallback[0]);
  const [erroPlayer, setErroPlayer] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [carregandoCanais, setCarregandoCanais] = useState(false);
  const [statusLista, setStatusLista] = useState("");

  const carregarCanaisPublicos = useCallback(async () => {
    setCarregandoCanais(true);
    setStatusLista("Buscando lista pública de canais...");

    try {
      const response = await fetch(IPTV_BR_URL, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Não foi possível carregar a lista pública.");
      }

      const texto = await response.text();
      const canaisPublicos = parseM3U(texto);
      const listaParaTeste = juntarSemDuplicar(
        canaisFallback,
        canaisPublicos
      ).slice(0, MAX_CANAIS_TESTADOS);

      setStatusLista("Testando canais...");

      const canaisFuncionando = await filtrarCanaisFuncionando(
        listaParaTeste,
        (testados, total, aprovados) => {
          setStatusLista(
            `Testando canais: ${testados}/${total} | funcionando: ${aprovados}`
          );
        }
      );

      const listaFinal =
        canaisFuncionando.length > 0 ? canaisFuncionando : canaisFallback;

      setCanaisDisponiveis(listaFinal);
      setCanalAtual(listaFinal[0]);
      setErroPlayer(false);
      setReloadKey((key) => key + 1);
      setStatusLista(`${listaFinal.length} canais funcionando.`);
      salvarCanais(listaFinal);
    } catch (error) {
      console.error("Erro ao carregar canais públicos:", error);
      setStatusLista("Usando canais salvos ou fixos.");
    } finally {
      setCarregandoCanais(false);
    }
  }, []);

  useEffect(() => {
    const canaisSalvos = lerCanaisSalvos();

    if (canaisSalvos.length > 0) {
      setCanaisDisponiveis(canaisSalvos);
      setCanalAtual(canaisSalvos[0]);
      setStatusLista(`${canaisSalvos.length} canais funcionando.`);
      return;
    }

    carregarCanaisPublicos();
  }, [carregarCanaisPublicos]);

  const trocarCanal = (canal) => {
    setCanalAtual(canal);
    setErroPlayer(false);
    setReloadKey((key) => key + 1);
  };

  const removerCanalComErro = useCallback(() => {
    const novaLista = canaisDisponiveis.filter(
      (canal) => canal.url !== canalAtual.url
    );

    setCanaisDisponiveis(novaLista);
    salvarCanais(novaLista);

    if (novaLista.length > 0) {
      setCanalAtual(novaLista[0]);
      setErroPlayer(false);
      setReloadKey((key) => key + 1);
      setStatusLista(`${novaLista.length} canais funcionando.`);
      return;
    }

    setErroPlayer(true);
    setStatusLista("Nenhum canal funcionando no momento.");
  }, [canalAtual.url, canaisDisponiveis]);

  const tentarNovamente = () => {
    if (canaisDisponiveis.length === 0) {
      carregarCanaisPublicos();
      return;
    }

    setErroPlayer(false);
    setReloadKey((key) => key + 1);
  };

  return (
    <div className="canais-container">
      <aside className="canais-sidebar">
        <button
          type="button"
          className="voltar-btn"
          onClick={() => navigate("/menu")}
        >
          Voltar
        </button>

        <button
          type="button"
          onClick={carregarCanaisPublicos}
          disabled={carregandoCanais}
        >
          Atualizar canais
        </button>

        <h1 className="page-title">Canais</h1>

        {statusLista && <p className="canais-status">{statusLista}</p>}

        <div className="canais-lista">
          {canaisDisponiveis.map((canal) => (
            <button
              key={`${canal.nome}-${canal.url}`}
              type="button"
              onClick={() => trocarCanal(canal)}
              className={canalAtual.url === canal.url ? "active" : ""}
            >
              {canal.nome}
            </button>
          ))}
        </div>
      </aside>

      <main className="main-content">
        <h1>{canalAtual.nome}</h1>

        <div className="player-fixed">
          {erroPlayer ? (
            <div className="player-error">
              <p>Não foi possível carregar este canal agora.</p>

              <button type="button" onClick={tentarNovamente}>
                Tentar novamente
              </button>
            </div>
          ) : (
            <HlsPlayer
              key={`${canalAtual.url}-${reloadKey}`}
              canal={canalAtual}
              onError={removerCanalComErro}
            />
          )}
        </div>

        <div className="sinopse-fixed">
          <p>{canalAtual.sinopse}</p>
        </div>
      </main>
    </div>
  );
}