import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import "./Canais.css";

const canais = [
  { nome: "TV Brasil", url: "https://tvbrasil-stream.ebc.com.br/index.m3u8", sinopse: "Canal público nacional com programação variada de jornalismo, cultura, esportes e entretenimento." },
  { nome: "Canal Gov", url: "https://canalgov-stream.ebc.com.br/index.m3u8", sinopse: "Transmissões oficiais do Governo Federal, incluindo eventos e comunicados." },
  { nome: "NBR", url: "https://nbr-stream.ebc.com.br/index.m3u8", sinopse: "Canal institucional com notícias e informações do governo." },
  { nome: "TV Câmara", url: "https://stream3.camara.leg.br/tv1/manifest.m3u8", sinopse: "Sessões plenárias e debates da Câmara dos Deputados." },
  { nome: "TV Senado", url: "https://videos.senado.leg.br/live/tvsenado.m3u8", sinopse: "Transmissões ao vivo das sessões e comissões do Senado Federal." },
  { nome: "TV Justiça", url: "https://tvjustica-stream.ebc.com.br/index.m3u8", sinopse: "Programação dedicada ao Judiciário, julgamentos e programas jurídicos." },
  { nome: "TV Cultura", url: "https://cultura-live.cdn.nextplay.com.br/cultura/index.m3u8", sinopse: "Canal educativo e cultural com programas infantis, debates e documentários." },
  { nome: "TV Futura", url: "https://futura-hls-video.cdn.nextplay.com.br/futura/index.m3u8", sinopse: "Canal voltado para educação, cidadania e cultura." },
  { nome: "TV Educação", url: "https://educacao-stream.ebc.com.br/index.m3u8", sinopse: "Programação pedagógica e conteúdos educativos." },
  { nome: "Rede Vida", url: "https://cvd1.cds.ebtcvd.net/live-redevida/smil:redevida.smil/playlist.m3u8", sinopse: "Canal católico com missas, programas religiosos e culturais." },
  { nome: "TV Aparecida", url: "https://tvaparecida-live.cdn.nextplay.com.br/tvaparecida/index.m3u8", sinopse: "Programação religiosa e cultural ligada ao Santuário Nacional de Aparecida." },
  { nome: "Novo Tempo", url: "https://stream.novotempo.com/tv/index.m3u8", sinopse: "Canal evangélico com programação cristã e educativa." },
  { nome: "DW Brasil", url: "https://dwamdstream103.akamaized.net/hls/live/2015536/dwstream103/index.m3u8", sinopse: "Canal internacional com notícias globais em português." },
  { nome: "France 24 PT", url: "https://stream.france24.com/live/pt/index.m3u8", sinopse: "Canal francês com cobertura jornalística mundial em português." }
];

export default function Canais() {
  const [canalAtual, setCanalAtual] = useState(canais[0]);
  const navigate = useNavigate();

  return (
    <div className="canais-container">
      
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => navigate("/menu")}>← Voltar</button>
        <h2>Canais</h2>
        {canais.map((canal) => (
          <button
            key={canal.nome}
            onClick={() => setCanalAtual(canal)}
            className={canalAtual.nome === canal.nome ? "active" : ""}
          >
            {canal.nome}
          </button>
        ))}
      </div>

      {/* Área principal */}
      <div className="main-content">
        <div className="player-fixed">
          <ReactPlayer 
            url={canalAtual.url} 
            controls 
            playing 
            width="100%" 
            height="100%" 
          />
        </div>

        <div className="sinopse-fixed">
          <p>{canalAtual.sinopse}</p>
        </div>
      </div>
    </div>
  );
}
