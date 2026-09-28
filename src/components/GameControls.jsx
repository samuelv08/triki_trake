export default function GameControls({ onNewGame, onResetScores, onChangeMode }) {
  return (
    <div className="d-grid gap-2">
      <button type="button" className="btn btn-primary btn-lg btn-main" onClick={onNewGame}>
        Nueva partida
      </button>
      <div className="row g-2">
        <div className="col-6 d-grid">
          <button type="button" className="btn btn-outline-secondary" onClick={onResetScores}>
            Reiniciar marcador
          </button>
        </div>
        <div className="col-6 d-grid">
          <button type="button" className="btn btn-outline-secondary" onClick={onChangeMode}>
            Cambiar modo
          </button>
        </div>
      </div>
    </div>
  );
}
