import { useState } from 'react';

const LEVELS = [
  { id: 'easy', label: 'Fácil', text: 'Movimientos aleatorios; comete errores con frecuencia.' },
  { id: 'medium', label: 'Medio', text: 'Intenta ganar y bloquea tus amenazas evidentes.' },
  { id: 'impossible', label: 'Imposible', text: 'Usa Minimax: no se le puede ganar.' },
];

export default function DifficultySelector({ onSelect, onBack }) {
  const [selected, setSelected] = useState(null);

  // Muestra el nivel elegido un instante antes de empezar.
  const handleClick = (id) => {
    setSelected(id);
    setTimeout(() => onSelect(id), 350);
  };

  return (
    <div>
      <h2 className="section-title">Elige la dificultad</h2>
      <div className="d-grid gap-2 mb-3">
        {LEVELS.map(({ id, label, text }) => (
          <button
            key={id}
            type="button"
            className={`level-option ${selected === id ? 'level-option--selected' : ''}`}
            disabled={selected !== null}
            onClick={() => handleClick(id)}
          >
            <strong>{label}</strong>
            <small>{text}</small>
          </button>
        ))}
      </div>
      <button type="button" className="btn btn-link text-secondary p-0" onClick={onBack}>
        Volver al menú
      </button>
    </div>
  );
}
