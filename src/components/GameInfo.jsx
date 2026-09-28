const MODE_LABELS = { pvp: 'Jugador vs Jugador', ai: 'Jugador vs Máquina' };
const DIFFICULTY_LABELS = { easy: 'Fácil', medium: 'Medio', impossible: 'Imposible' };

function getTurn(mode, xIsNext) {
  if (mode === 'pvp') return { text: `Jugador ${xIsNext ? 'X' : 'O'}`, symbol: xIsNext ? 'x' : 'o' };
  return xIsNext
    ? { text: 'Jugador', symbol: 'x' }
    : { text: 'Máquina pensando…', symbol: 'o' };
}

export default function GameInfo({ mode, difficulty, xIsNext, isOver }) {
  const turn = getTurn(mode, xIsNext);

  return (
    <div className="game-info text-center mb-3">
      <p className="mb-1"><span className="text-secondary">Modo:</span> <strong>{MODE_LABELS[mode]}</strong></p>
      {mode === 'ai' && (
        <p className="mb-2">
          <span className="text-secondary">Dificultad:</span>{' '}
          <span className="badge badge-level">{DIFFICULTY_LABELS[difficulty]}</span>
        </p>
      )}
      <div className={`turn-pill ${isOver ? 'turn-pill--over' : `turn-pill--${turn.symbol}`}`} aria-live="polite">
        {isOver ? 'Partida terminada' : <>Turno: <strong>{turn.text}</strong></>}
      </div>
    </div>
  );
}
