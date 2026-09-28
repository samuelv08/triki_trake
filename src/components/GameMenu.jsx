const OPTIONS = [
  {
    mode: 'pvp',
    title: 'Jugador vs Jugador',
    description: 'Juega contra un amigo en el mismo dispositivo.',
    ghost: false,
  },
  {
    mode: 'ai',
    title: 'Jugador vs Máquina',
    description: 'Enfréntate a la inteligencia artificial.',
    ghost: true,
  },
];

export default function GameMenu({ onSelectMode }) {
  return (
    <div className="row g-3">
      {OPTIONS.map(({ mode, title, description, ghost }) => (
        <div className="col-12 col-md-6" key={mode}>
          <button type="button" className="mode-card" onClick={() => onSelectMode(mode)}>
            <span className="glyphs" aria-hidden="true">
              <span className="glyph glyph--x">X</span>
              <span className={`glyph glyph--o ${ghost ? 'glyph--ghost' : ''}`}>O</span>
            </span>
            <span className="mode-card__title">{title}</span>
            <span className="mode-card__text">{description}</span>
          </button>
        </div>
      ))}
    </div>
  );
}
