import { useState } from 'react';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button
      className="ttt-square"
      onClick={onClick}
      style={{
        width: 80,
        height: 80,
        fontSize: 36,
        fontWeight: 700,
        background: '#f1f5f9',
        border: '2px solid #6366f1',
        borderRadius: 8,
        margin: 4,
        cursor: value ? 'default' : 'pointer',
        color: value === 'X' ? '#6366f1' : '#06b6d4',
        transition: 'background 0.2s',
      }}
      disabled={!!value}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function TicTacToe() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(i) {
    if (squares[i] || winner) return;
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  function handleReset() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <h1 style={{ color: '#6366f1', fontWeight: 800, fontSize: 36, marginBottom: 16 }}>Tic-Tac-Toe Game</h1>
      <div style={{ marginBottom: 24, fontSize: 22, fontWeight: 600, color: '#222' }}>{status}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0 }}>
        {squares.map((val, i) => (
          <Square key={i} value={val} onClick={() => handleClick(i)} />
        ))}
      </div>
      <button
        onClick={handleReset}
        style={{
          marginTop: 32,
          background: 'linear-gradient(90deg, #6366f1 0%, #06b6d4 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: 8,
          padding: '0.7em 2em',
          fontWeight: 700,
          fontSize: 18,
          cursor: 'pointer',
          boxShadow: '0 2px 8px #0001',
          transition: 'background 0.2s',
        }}
      >Reset Game</button>
    </div>
  );
}

function App() {
  return (
    <TicTacToe />
  );
}

export default App;
