import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { GameContainer } from '../../components/GameContainer';
import { useCoins } from '../../contexts/CoinContext';
import { CoinDisplay } from '../../components/CoinDisplay';
import { Button } from '../../components/Button';

const CANVAS_WIDTH = 1000;
const CANVAS_HEIGHT = 600;
const STATION_RADIUS = 15;
const LINE_WIDTH = 4;
const PASSENGER_SIZE = 8;
const PASSENGER_SPAWN_RATE = 3000; // ms
const MAX_PASSENGERS_PER_STATION = 4;

const colors = {
  red: '#ff0000',
  blue: '#0000ff',
  green: '#00ff00',
  yellow: '#ffff00',
  orange: '#ffa500',
  purple: '#800080',
};

const StyledCanvas = styled.canvas`
  background-color: #1a1a1a;
  border: 2px solid #2d8a4e;
  border-radius: 8px;
`;

const GameWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a1a1a;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const BackButton = styled(Button)`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 10;
`;

const Instructions = styled.div`
  color: #ffffff;
  text-align: center;
  margin-bottom: 20px;
  font-size: 18px;
  max-width: 600px;
  line-height: 1.5;
`;

const StationShape = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
};

class Passenger {
  constructor(shape, targetShape) {
    this.shape = shape;
    this.targetShape = targetShape;
    this.x = 0;
    this.y = 0;
    this.waitingTime = 0;
  }
}

class Station {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.passengers = [];
    this.connections = [];
  }

  addPassenger() {
    if (this.passengers.length >= MAX_PASSENGERS_PER_STATION) return false;
    
    const shapes = Object.values(StationShape);
    const targetShape = shapes[Math.floor(Math.random() * shapes.length)];
    const passenger = new Passenger(this.shape, targetShape);
    passenger.x = this.x + (Math.random() * 20 - 10);
    passenger.y = this.y + (Math.random() * 20 - 10);
    this.passengers.push(passenger);
    return true;
  }
}

class Line {
  constructor(color) {
    this.color = color;
    this.stations = [];
    this.path = [];
  }

  addStation(station) {
    this.stations.push(station);
    if (this.stations.length > 1) {
      const prev = this.stations[this.stations.length - 2];
      this.path.push({ from: prev, to: station });
    }
  }
}

const MiniMetro = () => {
  const navigate = useNavigate();
  const [stations, setStations] = useState([]);
  const [lines, setLines] = useState([]);
  const [selectedLine, setSelectedLine] = useState(null);
  const [gameRunning, setGameRunning] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const canvasRef = useRef(null);
  const { addCoins } = useCoins();

  const drawPassenger = useCallback((ctx, passenger) => {
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1;

    // Draw current shape
    ctx.beginPath();
    ctx.arc(passenger.x, passenger.y, PASSENGER_SIZE / 2, 0, Math.PI * 2);
    ctx.fill();

    // Draw target shape above
    ctx.beginPath();
    ctx.fillStyle = '#ffff00';
    switch (passenger.targetShape) {
      case StationShape.CIRCLE:
        ctx.arc(passenger.x, passenger.y - 12, PASSENGER_SIZE / 2, 0, Math.PI * 2);
        break;
      case StationShape.SQUARE:
        ctx.rect(
          passenger.x - PASSENGER_SIZE / 2,
          passenger.y - 12 - PASSENGER_SIZE / 2,
          PASSENGER_SIZE,
          PASSENGER_SIZE
        );
        break;
      case StationShape.TRIANGLE:
        ctx.moveTo(passenger.x, passenger.y - 12 - PASSENGER_SIZE / 2);
        ctx.lineTo(passenger.x + PASSENGER_SIZE / 2, passenger.y - 12 + PASSENGER_SIZE / 2);
        ctx.lineTo(passenger.x - PASSENGER_SIZE / 2, passenger.y - 12 + PASSENGER_SIZE / 2);
        ctx.closePath();
        break;
    }
    ctx.fill();
  }, []);

  const drawStation = (ctx, station) => {
    ctx.beginPath();
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;

    switch (station.shape) {
      case StationShape.CIRCLE:
        ctx.arc(station.x, station.y, STATION_RADIUS, 0, Math.PI * 2);
        break;
      case StationShape.SQUARE:
        ctx.rect(
          station.x - STATION_RADIUS,
          station.y - STATION_RADIUS,
          STATION_RADIUS * 2,
          STATION_RADIUS * 2
        );
        break;
      case StationShape.TRIANGLE:
        ctx.moveTo(station.x, station.y - STATION_RADIUS);
        ctx.lineTo(station.x + STATION_RADIUS, station.y + STATION_RADIUS);
        ctx.lineTo(station.x - STATION_RADIUS, station.y + STATION_RADIUS);
        ctx.closePath();
        break;
    }

    ctx.fill();
    ctx.stroke();
  };

  const drawLine = (ctx, line) => {
    ctx.beginPath();
    ctx.strokeStyle = line.color;
    ctx.lineWidth = LINE_WIDTH;

    line.path.forEach(({ from, to }) => {
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
    });

    ctx.stroke();
  };

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw lines
    lines.forEach(line => drawLine(ctx, line));

    // Draw stations and their passengers
    stations.forEach(station => {
      drawStation(ctx, station);
      station.passengers.forEach(passenger => drawPassenger(ctx, passenger));
    });
  }, [stations, lines, drawPassenger]);

  const addRandomStation = useCallback(() => {
    const x = Math.random() * (CANVAS_WIDTH - STATION_RADIUS * 2) + STATION_RADIUS;
    const y = Math.random() * (CANVAS_HEIGHT - STATION_RADIUS * 2) + STATION_RADIUS;
    const shapes = Object.values(StationShape);
    const shape = shapes[Math.floor(Math.random() * shapes.length)];

    setStations(prev => [...prev, new Station(x, y, shape)]);
  }, []);

  const updatePassengers = useCallback(() => {
    setStations(prev => {
      return prev.map(station => {
        // Update waiting time for passengers
        station.passengers.forEach(p => {
          p.waitingTime += 1;
          if (p.waitingTime > 100) { // Game over condition
            setGameOver(true);
            setGameRunning(false);
          }
        });

        // Try to add a new passenger
        if (Math.random() < 0.3) {
          station.addPassenger();
        }

        return station;
      });
    });
  }, []);

  const startGame = useCallback(() => {
    setGameRunning(true);
    setGameOver(false);
    setScore(0);
    setStations([]);
    setLines([
      new Line(colors.red),
      new Line(colors.blue),
      new Line(colors.green),
    ]);
    addRandomStation();
  }, [addRandomStation]);

  const handleCanvasClick = (e) => {
    if (!gameRunning || !selectedLine) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicked on a station
    const clickedStation = stations.find(station => {
      const dx = station.x - x;
      const dy = station.y - y;
      return Math.sqrt(dx * dx + dy * dy) < STATION_RADIUS;
    });

    if (clickedStation) {
      setLines(prev => {
        const newLines = [...prev];
        const line = newLines.find(l => l.color === selectedLine);
        if (line) {
          line.addStation(clickedStation);
        }
        return newLines;
      });
    }
  };

  // Game loop
  useEffect(() => {
    if (!gameRunning) return;

    const gameLoop = setInterval(() => {
      updatePassengers();
      draw();
    }, 1000);

    const stationSpawner = setInterval(() => {
      addRandomStation();
      setScore(prev => {
        const newScore = prev + 10;
        if (newScore % 50 === 0) {
          addCoins(5);
        }
        return newScore;
      });
    }, 5000);

    return () => {
      clearInterval(gameLoop);
      clearInterval(stationSpawner);
    };
  }, [gameRunning, updatePassengers, draw, addRandomStation, addCoins]);

  // Initialize canvas on mount
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  return (
    <GameWrapper>
      <BackButton onClick={() => navigate('/')}>Back to Menu</BackButton>
      <CoinDisplay />
      <div style={{ color: '#ffffff', fontSize: '24px' }}>Score: {score}</div>
      {!gameRunning && !gameOver && (
        <Instructions>
          Welcome to Mini Metro! Connect stations with metro lines to transport passengers.
          <br />
          • Click on stations to connect them with the selected line
          <br />
          • Match passenger shapes with their destination station shapes
          <br />
          • Don't let passengers wait too long!
          <br />
          • Earn coins for every 50 points
        </Instructions>
      )}
      <StyledCanvas
        ref={canvasRef}
        width={CANVAS_WIDTH}
        height={CANVAS_HEIGHT}
        onClick={handleCanvasClick}
      />
      <Controls>
        {gameOver ? (
          <>
            <div style={{ color: '#ff0000', fontSize: '24px', marginBottom: '20px' }}>
              Game Over! A passenger waited too long.
            </div>
            <Button onClick={startGame}>Try Again</Button>
          </>
        ) : !gameRunning ? (
          <Button onClick={startGame}>Start Game</Button>
        ) : (
          Object.entries(colors).map(([name, color]) => (
            <Button
              key={color}
              onClick={() => setSelectedLine(color)}
              style={{
                backgroundColor: color,
                color: '#ffffff',
                border: selectedLine === color ? '3px solid white' : 'none',
              }}
            >
              {name} Line
            </Button>
          ))
        )}
      </Controls>
    </GameWrapper>
  );
};

export { MiniMetro }; 