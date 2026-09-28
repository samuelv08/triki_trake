export default function Square({ value, isWinning, disabled, onClick, index }) {
  const classes = [
    'square',
    value ? `square--${value.toLowerCase()}` : '',
    isWinning ? 'square--win' : '',
  ].join(' ');

  return (
    <button
      type="button"
      className={classes}
      disabled={disabled || Boolean(value)}
      onClick={onClick}
      aria-label={`Casilla ${index + 1}${value ? `, ${value}` : ', vacía'}`}
    >
      {value && <span className="mark">{value}</span>}
    </button>
  );
}
