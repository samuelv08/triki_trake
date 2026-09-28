// Lógica pura del juego: ganador, empate e inteligencia artificial.
export const WIN_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6],
];

export function calculateWinner(board) {
  for (const line of WIN_LINES) {
    const [a, b, c] = line;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], line };
    }
  }
  return null;
}

export const isBoardFull = (board) => board.every(Boolean);

const emptyIndexes = (board) =>
  board.reduce((list, cell, i) => (cell ? list : [...list, i]), []);

const pickRandom = (list) => list[Math.floor(Math.random() * list.length)];

// Devuelve la casilla con la que `player` completaría una línea, o null.
function findCompletingMove(board, player) {
  const move = emptyIndexes(board).find((i) => {
    const copy = [...board];
    copy[i] = player;
    return calculateWinner(copy)?.winner === player;
  });
  return move ?? null;
}

function easyMove(board) {
  return pickRandom(emptyIndexes(board));
}

function mediumMove(board) {
  const win = findCompletingMove(board, 'O');
  if (win !== null) return win;

  const block = findCompletingMove(board, 'X');
  if (block !== null) return block;

  if (!board[4]) return 4;

  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length) return pickRandom(corners);

  return easyMove(board);
}

// Minimax: O maximiza, X minimiza. Se prefiere ganar rápido y perder tarde.
function minimax(board, isMaximizing, depth) {
  const result = calculateWinner(board);
  if (result) return result.winner === 'O' ? 10 - depth : depth - 10;
  if (isBoardFull(board)) return 0;

  const scores = emptyIndexes(board).map((i) => {
    const copy = [...board];
    copy[i] = isMaximizing ? 'O' : 'X';
    return minimax(copy, !isMaximizing, depth + 1);
  });
  return isMaximizing ? Math.max(...scores) : Math.min(...scores);
}

function impossibleMove(board) {
  let bestScore = -Infinity;
  let bestMoves = [];
  emptyIndexes(board).forEach((i) => {
    const copy = [...board];
    copy[i] = 'O';
    const score = minimax(copy, false, 1);
    if (score > bestScore) {
      bestScore = score;
      bestMoves = [i];
    } else if (score === bestScore) {
      bestMoves.push(i);
    }
  });
  return pickRandom(bestMoves);
}

export function getAIMove(board, difficulty) {
  if (difficulty === 'medium') return mediumMove(board);
  if (difficulty === 'impossible') return impossibleMove(board);
  return easyMove(board);
}
