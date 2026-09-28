function getMessage(winner, mode) {
  if (!winner) return '¡Empate!';
  if (winner === 'O' && mode === 'ai') return '¡La máquina ha ganado!';
  return `¡Jugador ${winner} gana!`;
}

export default function GameResult({ winner, mode, onPlayAgain, onClose }) {
  const tone = winner ? winner.toLowerCase() : 'draw';

  return (
    <>
      <div className="modal-backdrop show" />
      <div className="modal d-block" role="dialog" aria-modal="true" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content result-card text-center p-4">
            <div className={`result-badge result-badge--${tone}`}>{winner ?? '='}</div>
            <h2 className="result-title">{getMessage(winner, mode)}</h2>
            <div className="d-grid gap-2 mt-3">
              <button type="button" className="btn btn-primary btn-lg btn-main" onClick={onPlayAgain}>
                Jugar de nuevo
              </button>
              <button type="button" className="btn btn-link text-secondary" onClick={onClose}>
                Ver tablero
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
