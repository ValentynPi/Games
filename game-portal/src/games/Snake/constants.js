// Grid and sizing
export const GRID_SIZE = 20;
export const CELL_SIZE = 20;

// Initial game settings
export const INITIAL_SNAKE_LENGTH = 3;

// Powerup types and their properties
export const POWERUP_TYPES = {
  SPEED_BOOST: { 
    color: '#3498db', 
    duration: 5000, 
    effect: 'Increases snake speed temporarily',
    symbol: '⚡'
  },
  SHIELD: { 
    color: '#f39c12', 
    duration: 8000, 
    effect: 'Allows passing through walls once',
    symbol: '🛡️'
  },
  DOUBLE_POINTS: { 
    color: '#9b59b6', 
    duration: 10000, 
    effect: 'Doubles points from food',
    symbol: '×2'
  }
};

// Food types and their properties
export const FOOD_TYPES = {
  REGULAR: { points: 10, color: '#e74c3c', symbol: '🍎' },
  GOLDEN: { points: 30, color: '#f1c40f', symbol: '🌟' },
  SPECIAL: { points: 50, color: '#9b59b6', symbol: '💎' },
  BONUS: { points: 100, color: '#2ecc71', symbol: '🎁' }
}; 