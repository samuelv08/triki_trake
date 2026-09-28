import Square from './Square.jsx';

export default function GameBoard({ board, winningLine, disabled, onSquareClick }) {
  return (
    <div className="board" role="grid" aria-label="Tablero de Triki">
      {board.map((value, index) => (
        <Square
          key={index}
          index={index}
          value={value}
          isWinning={winningLine.includes(index)}
          disabled={disabled}
          onClick={() => onSquareClick(index)}
        />
      ))}
    </div>
  );
}
