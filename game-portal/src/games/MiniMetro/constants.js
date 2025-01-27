export const SHAPES = {
  CIRCLE: 'circle',
  SQUARE: 'square',
  TRIANGLE: 'triangle',
  DIAMOND: 'diamond',
  STAR: 'star',
  PENTAGON: 'pentagon'
};

export const COLORS = [
  '#e74c3c', // Red
  '#3498db', // Blue
  '#2ecc71', // Green
  '#f1c40f', // Yellow
  '#9b59b6', // Purple
  '#e67e22', // Orange
  '#1abc9c', // Turquoise
  '#34495e'  // Navy
];

export const GAME_CONFIG = {
  TRAIN_SPEED: 100, // pixels per second
  PASSENGER_SPAWN_RATE: 0.05, // probability per frame
  STATION_SPAWN_INTERVAL: 20000, // milliseconds
  MAX_PASSENGERS_PER_STATION: 6,
  INITIAL_STATIONS: 3,
  INITIAL_LINES: 3,
  INITIAL_TRAINS: 3,
  TRAIN_CAPACITY: 6,
  STATION_RADIUS: 20,
  LINE_WIDTH: 8,
  PASSENGER_SIZE: 12,
  TRAIN_SIZE: 16,
  HOVER_SCALE: 1.2,
  STATION_COLORS: {
    [SHAPES.CIRCLE]: '#2c3e50',
    [SHAPES.SQUARE]: '#2c3e50',
    [SHAPES.TRIANGLE]: '#2c3e50',
    [SHAPES.DIAMOND]: '#2c3e50',
    [SHAPES.STAR]: '#2c3e50',
    [SHAPES.PENTAGON]: '#2c3e50'
  }
};

export const CANVAS_STYLES = {
  BACKGROUND: '#f5f5f5',
  GRID_COLOR: '#ecf0f1',
  GRID_SIZE: 40,
  STATION_STROKE: '#fff',
  STATION_STROKE_WIDTH: 4,
  LINE_CAP: 'round',
  LINE_JOIN: 'round',
  FONT: '16px Arial',
  TEXT_COLOR: '#2c3e50'
};

export const ANIMATIONS = {
  STATION_SPAWN: {
    DURATION: 500,
    SCALE: [0, 1.2, 1]
  },
  TRAIN_SPAWN: {
    DURATION: 300,
    SCALE: [0, 1.1, 1]
  },
  PASSENGER_SPAWN: {
    DURATION: 200,
    SCALE: [0, 1.1, 1]
  },
  LINE_DRAW: {
    DURATION: 300
  }
};

export const SOUND_CONFIG = {
  VOLUME: 0.5,
  FORMATS: ['mp3', 'wav']
}; 