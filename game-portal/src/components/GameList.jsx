import React from 'react';
import { Snake } from '../games/Snake';
import { Tetris } from '../games/Tetris';
import { Pong } from '../games/Pong';
import { UnblockMe } from '../games/UnblockMe';
import { MiniMetro } from '../games/MiniMetro';

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
      }
    ]
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'The classic table tennis arcade game!',
    component: Pong,
    thumbnail: '/thumbnails/pong.png',
    price: 75,
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
      }
    ]
  },
  {
    id: 'unblock-me',
    title: 'Unblock Me',
    description: 'Slide blocks to help the red block escape!',
    component: UnblockMe,
    thumbnail: '/thumbnails/unblock-me.png',
    price: 100,
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
      }
    ]
  },
  {
    id: 'mini-metro',
    title: 'Mini Metro',
    description: 'Design subway systems by connecting stations. Keep your city moving!',
    component: MiniMetro,
    thumbnail: '/thumbnails/mini-metro.png',
    price: 100,
    skins: [
      {
        id: 'mini_metro_default',
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
        id: 'mini_metro_neon',
        name: 'Neon',
        price: 200,
        equipped: false,
        styles: {
          baseStyle: {
            backgroundColor: '#000000',
            border: '2px solid #ff00ff',
            boxShadow: '0 0 20px #ff00ff'
          }
        }
      }
    ]
  }
]; 