import { useEffect, useState } from 'react';
import GameMenu from './components/GameMenu.jsx';
import DifficultySelector from './components/DifficultySelector.jsx';
import GameInfo from './components/GameInfo.jsx';
import GameBoard from './components/GameBoard.jsx';
import ScoreBoard from './components/ScoreBoard.jsx';
import GameControls from './components/GameControls.jsx';
import GameResult from './components/GameResult.jsx';
import { calculateWinner, getAIMove, isBoardFull } from './gameLogic.js';

const EMPTY_BOARD = Array(9).fill(null);
const INITIAL_SCORES = { X: 0, O: 0, draws: 0 };

export default function App() {
  const [screen, setScreen] = useState('menu'); // menu | difficulty | game
  const [mode, setMode] = useState(null); // pvp | ai
  const [difficulty, setDifficulty] = useState(null);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [scores, setScores] = useState(INITIAL_SCORES);
  const [showResult, setShowResult] = useState(false);

  const outcome = calculateWinner(board);
  const isDraw = !outcome && isBoardFull(board);
  const isOver = Boolean(outcome) || isDraw;
  const isMachineTurn = mode === 'ai' && !xIsNext && !isOver;

  const playMove = (index) => {
    const next = [...board];
    next[index] = xIsNext ? 'X' : 'O';
    setBoard(next);
    setXIsNext(!xIsNext);
  };

  // Turno de la máquina, con una pausa corta para que se sienta natural.
  useEffect(() => {
    if (!isMachineTurn) return;
    const timer = setTimeout(() => playMove(getAIMove(board, difficulty)), 550);
    return () => clearTimeout(timer);
  }, [isMachineTurn, board, difficulty]);

  // Actualiza el marcador una vez por partida y muestra el resultado.
  useEffect(() => {
    if (!isOver) return;
    const key = outcome ? outcome.winner : 'draws';
    setScores((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    const timer = setTimeout(() => setShowResult(true), 900);
    return () => clearTimeout(timer);
  }, [isOver]);

  const newGame = () => {
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setShowResult(false);
  };

  const handleSquareClick = (index) => {
    if (board[index] || isOver || isMachineTurn) return;
    playMove(index);
  };

  const handleSelectMode = (selectedMode) => {
    setMode(selectedMode);
    setScores(INITIAL_SCORES);
    newGame();
    setScreen(selectedMode === 'ai' ? 'difficulty' : 'game');
  };

  const handleSelectDifficulty = (level) => {
    setDifficulty(level);
    newGame();
    setScreen('game');
  };

  const handleChangeMode = () => {
    newGame();
    setMode(null);
    setDifficulty(null);
    setScreen('menu');
  };

  return (
    <main className="app-shell d-flex align-items-center justify-content-center min-vh-100 p-3">
      <section className="game-card card border-0 w-100">
        <div className="card-body p-3 p-sm-4 p-md-5">
          <header className="text-center mb-4">
            <h1 className="app-title">TRIKI</h1>
            <p className="app-subtitle mb-0">El clásico juego de tres en línea</p>
          </header>

          {screen === 'menu' && <GameMenu onSelectMode={handleSelectMode} />}

          {screen === 'difficulty' && (
            <DifficultySelector
              onSelect={handleSelectDifficulty}
              onBack={() => setScreen('menu')}
            />
          )}

          {screen === 'game' && (
            <>
              <GameInfo
                mode={mode}
                difficulty={difficulty}
                xIsNext={xIsNext}
                isOver={isOver}
              />
              <GameBoard
                board={board}
                winningLine={outcome ? outcome.line : []}
                disabled={isOver || isMachineTurn}
                onSquareClick={handleSquareClick}
              />
              <ScoreBoard scores={scores} mode={mode} />
              <GameControls
                onNewGame={newGame}
                onResetScores={() => setScores(INITIAL_SCORES)}
                onChangeMode={handleChangeMode}
              />
            </>
          )}
        </div>
      </section>

      {showResult && (
        <GameResult
          winner={outcome ? outcome.winner : null}
          mode={mode}
          onPlayAgain={newGame}
          onClose={() => setShowResult(false)}
        />
      )}
    </main>
  );
}
