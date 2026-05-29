import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const INTRO_DURATION = 4000;

function playMenuPad() {
  const AudioContext = window.AudioContext || window.webkitAudioContext;

  if (!AudioContext) return;

  const audio = new AudioContext();
  window.__nexusIntroAudio = audio;

  if (audio.state === "suspended") {
    audio.resume();
  }

  const now = audio.currentTime;
  const duration = INTRO_DURATION / 1000;

  const compressor = audio.createDynamicsCompressor();
  compressor.threshold.setValueAtTime(-24, now);
  compressor.knee.setValueAtTime(18, now);
  compressor.ratio.setValueAtTime(8, now);
  compressor.attack.setValueAtTime(0.002, now);
  compressor.release.setValueAtTime(0.28, now);

  const master = audio.createGain();
  master.gain.setValueAtTime(0.0001, now);
  master.gain.exponentialRampToValueAtTime(1.25, now + 0.025);
  master.gain.setValueAtTime(1.25, now + 0.38);
  master.gain.exponentialRampToValueAtTime(0.32, now + 1.2);
  master.gain.setValueAtTime(0.32, now + duration - 0.6);
  master.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  master.connect(compressor);
  compressor.connect(audio.destination);

  const createTone = (frequency, volume, start, end, type = "sine") => {
    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, now + start);

    gain.gain.setValueAtTime(0.0001, now + start);
    gain.gain.exponentialRampToValueAtTime(volume, now + start + 0.02);
    gain.gain.setValueAtTime(volume, now + 0.45);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + end);

    osc.connect(gain);
    gain.connect(master);

    osc.start(now + start);
    osc.stop(now + end);
  };

  const dropOsc = audio.createOscillator();
  const dropGain = audio.createGain();

  dropOsc.type = "sine";
  dropOsc.frequency.setValueAtTime(444, now);
  dropOsc.frequency.exponentialRampToValueAtTime(444, now + 0.18);

  dropGain.gain.setValueAtTime(0.0001, now);
  dropGain.gain.exponentialRampToValueAtTime(1, now + 0.018);
  dropGain.gain.setValueAtTime(1, now + 0.18);
  dropGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.15);

  dropOsc.connect(dropGain);
  dropGain.connect(master);

  dropOsc.start(now);
  dropOsc.stop(now + 1.2);

  createTone(444, 0.95, 0.03, duration);
  createTone(222, 0.42, 0.04, 1.4, "triangle");
  createTone(666, 0.2, 0.05, 0.9, "triangle");

  const pulseOsc = audio.createOscillator();
  const pulseGain = audio.createGain();
  const lfo = audio.createOscillator();
  const lfoGain = audio.createGain();

  pulseOsc.type = "sine";
  pulseOsc.frequency.setValueAtTime(444, now + 0.2);

  lfo.frequency.setValueAtTime(4, now);
  lfoGain.gain.setValueAtTime(0.34, now);

  lfo.connect(lfoGain);
  lfoGain.connect(pulseGain.gain);

  pulseGain.gain.setValueAtTime(0.0001, now + 0.2);
  pulseGain.gain.exponentialRampToValueAtTime(0.58, now + 0.45);
  pulseGain.gain.setValueAtTime(0.58, now + duration - 0.7);
  pulseGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

  pulseOsc.connect(pulseGain);
  pulseGain.connect(master);

  pulseOsc.start(now + 0.2);
  pulseOsc.stop(now + duration);

  lfo.start(now);
  lfo.stop(now + duration);

  window.setTimeout(() => {
    audio.close().catch(() => {});
    window.__nexusIntroAudio = null;
  }, INTRO_DURATION + 300);
}
const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <img
        src={`${import.meta.env.BASE_URL}logo.png`}
        alt="Logo do App"
        className="landing-logo"
      />

      <h1 className="page-title">Nexus Movie</h1>

      <p className="landing-text">
        Bem-vindo ao seu portal de filmes, séries e canais abertos.
      </p>

      <form className="landing-form">
        <input type="text" placeholder="Usuário" className="landing-input" />
        <input type="password" placeholder="Senha" className="landing-input" />

        <button
          type="button"
          onClick={() => {
            playMenuPad();
            navigate("/menu", { state: { playIntro: true } });
          }}
          className="landing-button"
        >
          Entrar
        </button>
      </form>
    </div>
  );
};

export default LandingPage;