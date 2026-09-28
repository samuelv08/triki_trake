export default function ScoreBoard({ scores, mode }) {
  const items = [
    { label: 'Jugador X', value: scores.X, tone: 'x' },
    { label: 'Empates', value: scores.draws, tone: 'draw' },
    { label: mode === 'ai' ? 'Máquina O' : 'Jugador O', value: scores.O, tone: 'o' },
  ];

  return (
    <div className="scoreboard row g-2 text-center my-4">
      {items.map(({ label, value, tone }) => (
        <div className="col-4" key={label}>
          <div className={`score score--${tone}`}>
            <span className="score__label">{label}</span>
            <span className="score__value">{value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
