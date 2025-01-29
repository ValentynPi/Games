import React from 'react';
import Snake from '../games/Snake';
import Tetris from '../games/Tetris';
import { Pong } from '../games/Pong';
import UnblockMe from '../games/UnblockMe';

export const games = [
  {
    id: 'snake',
    title: 'Snake',
    description: 'Classic snake game with modern twists and power-ups!',
    component: Snake,
    thumbnail: '/thumbnails/snake.png',
    price: 0,
    skins: [
      {
        id: 'snake_default',
        name: 'Default',
        price: 0,
        equipped: true,
        styles: {
          baseStyle: {
            backgroundColor: '#1a1a1a',
            border: '2px solid #2d8a4e'
          }
        }
      },
      {
        id: 'snake_neon',
        name: 'Neon Viper',
        price: 150,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#000000',
            border: '2px solid #00ff00',
            boxShadow: '0 0 20px #00ff00'
          }
        }
      },
      {
        id: 'snake_retro',
        name: 'Retro Arcade',
        price: 100,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#000080',
            border: '2px solid #ffff00',
            fontFamily: "'Press Start 2P', cursive"
          }
        }
      }
    ]
  },
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'The classic block-stacking puzzle game!',
    component: Tetris,
    thumbnail: '/thumbnails/tetris.png',
    price: 50,
    skins: [
      {
        id: 'tetris_default',
        name: 'Default',
        price: 0,
        equipped: true,
        styles: {
          baseStyle: {
            backgroundColor: '#1a1a1a',
            border: '2px solid #2d8a4e'
          }
        }
      },
      {
        id: 'tetris_cyberpunk',
        name: 'Cyberpunk',
        price: 200,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#1a0033',
            border: '2px solid #ff00ff',
            boxShadow: '0 0 30px #ff00ff'
          }
        }
      },
      {
        id: 'tetris_minimal',
        name: 'Minimalist',
        price: 150,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#ffffff',
            border: '2px solid #000000',
            color: '#000000'
          }
        }
      }
    ]
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'The original arcade classic!',
    component: Pong,
    thumbnail: '/thumbnails/pong.png',
    price: 0,
    skins: [
      {
        id: 'pong_default',
        name: 'Default',
        price: 0,
        equipped: true,
        styles: {
          baseStyle: {
            backgroundColor: '#1a1a1a',
            border: '2px solid #2d8a4e'
          }
        }
      },
      {
        id: 'pong_synthwave',
        name: 'Synthwave',
        price: 175,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#2d0066',
            border: '2px solid #ff0066',
            boxShadow: '0 0 25px #ff0066'
          }
        }
      },
      {
        id: 'pong_matrix',
        name: 'Matrix',
        price: 150,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#000000',
            border: '2px solid #00ff00',
            boxShadow: '0 0 15px #00ff00',
            fontFamily: 'monospace'
          }
        }
      }
    ]
  },
  {
    id: 'unblockme',
    title: 'Unblock Me',
    description: 'Slide blocks to solve puzzles!',
    component: UnblockMe,
    thumbnail: '/thumbnails/unblockme.png',
    price: 75,
    skins: [
      {
        id: 'unblock_me_default',
        name: 'Default',
        price: 0,
        equipped: true,
        styles: {
          baseStyle: {
            backgroundColor: '#1a1a1a',
            border: '2px solid #2d8a4e'
          }
        }
      },
      {
        id: 'unblock_me_wooden',
        name: 'Wooden Classic',
        price: 125,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#8b4513',
            border: '2px solid #654321',
            boxShadow: '0 0 15px rgba(139, 69, 19, 0.5)'
          }
        }
      },
      {
        id: 'unblock_me_futuristic',
        name: 'Futuristic',
        price: 200,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#001a33',
            border: '2px solid #00ccff',
            boxShadow: '0 0 20px #00ccff'
          }
        }
      }
    ]
  }
];