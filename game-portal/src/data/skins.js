export const GAME_SKINS = {
  snake: [
    {
      id: 'snake_default',
      name: 'Classic Snake',
      price: 0,
      image: '/assets/skins/snake/default.png',
      description: 'The classic green snake we all know and love',
      rarity: 'common',
      styles: { baseStyle: { background: '#4CAF50', boxShadow: '0 0 10px rgba(76, 175, 80, 0.5)' } }
    },
    {
      id: 'snake_neon',
      name: 'Neon Viper',
      price: 150,
      image: '/assets/skins/snake/neon.png',
      description: 'A glowing neon snake that lights up the path!',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ff00ff, #00ffff)', boxShadow: '0 0 15px rgba(255, 0, 255, 0.7)' } }
    },
    {
      id: 'snake_golden',
      name: 'Golden Serpent',
      price: 200,
      image: '/assets/skins/snake/golden.png',
      description: 'Pure gold, for the most prestigious players',
      rarity: 'legendary',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ffd700, #ffa500)', boxShadow: '0 0 20px rgba(255, 215, 0, 0.8)' } }
    },
    {
      id: 'snake_rainbow',
      name: 'Rainbow Snake',
      price: 180,
      image: '/assets/skins/snake/rainbow.png',
      description: 'A colorful snake that leaves a rainbow trail',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)', boxShadow: '0 0 15px rgba(255, 0, 0, 0.7)' } }
    },
    {
      id: 'snake_crystal',
      name: 'Crystal Snake',
      price: 160,
      image: '/assets/skins/snake/crystal.png',
      description: 'A transparent crystal snake that sparkles',
      rarity: 'epic',
      styles: { baseStyle: { background: 'rgba(255, 255, 255, 0.3)', backdropFilter: 'blur(5px)', boxShadow: '0 0 15px rgba(255, 255, 255, 0.7)' } }
    }
  ],
  
  tetris: [
    {
      id: 'tetris_default',
      name: 'Classic Tetris',
      price: 0,
      image: '/assets/skins/tetris/default.png',
      description: 'The original Tetris blocks',
      rarity: 'common',
      styles: { baseStyle: { background: '#3498db', boxShadow: '0 0 10px rgba(52, 152, 219, 0.5)' } }
    },
    {
      id: 'tetris_cyberpunk',
      name: 'Cyberpunk',
      price: 180,
      image: '/assets/skins/tetris/cyberpunk.png',
      description: 'Futuristic neon blocks with cyber effects',
      rarity: 'epic',
      styles: { baseStyle: { background: '#1a0033', boxShadow: '0 0 30px #ff00ff', border: '2px solid #ff00ff' } }
    },
    {
      id: 'tetris_holographic',
      name: 'Holographic',
      price: 220,
      image: '/assets/skins/tetris/holographic.png',
      description: 'Shimmering holographic blocks that change color',
      rarity: 'legendary',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #00ffff, #ff00ff)', boxShadow: '0 0 25px rgba(0, 255, 255, 0.8)' } }
    },
    {
      id: 'tetris_retro',
      name: 'Retro Wave',
      price: 150,
      image: '/assets/skins/tetris/retro.png',
      description: '80s style retro wave blocks',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ff6b6b, #4ecdc4)', boxShadow: '0 0 20px rgba(255, 107, 107, 0.6)' } }
    },
    {
      id: 'tetris_pixel',
      name: 'Pixel Art',
      price: 160,
      image: '/assets/skins/tetris/pixel.png',
      description: 'Classic pixel art style blocks',
      rarity: 'epic',
      styles: { baseStyle: { background: '#2ecc71', boxShadow: '0 0 15px rgba(46, 204, 113, 0.6)' } }
    }
  ],
  
  pong: [
    {
      id: 'pong_default',
      name: 'Classic Pong',
      price: 0,
      image: '/assets/skins/pong/default.png',
      description: 'The original Pong paddles',
      rarity: 'common',
      styles: { baseStyle: { background: '#ffffff', boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)' } }
    },
    {
      id: 'pong_matrix',
      name: 'Matrix',
      price: 160,
      image: '/assets/skins/pong/matrix.png',
      description: 'Digital rain effect inspired by The Matrix',
      rarity: 'epic',
      styles: { baseStyle: { background: '#000000', boxShadow: '0 0 15px #00ff00', border: '2px solid #00ff00' } }
    },
    {
      id: 'pong_rainbow',
      name: 'Rainbow Wave',
      price: 190,
      image: '/assets/skins/pong/rainbow.png',
      description: 'Constantly shifting rainbow colors',
      rarity: 'legendary',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ff0000, #00ff00, #0000ff)', boxShadow: '0 0 20px rgba(255, 0, 0, 0.8)' } }
    },
    {
      id: 'pong_neon',
      name: 'Neon Glow',
      price: 170,
      image: '/assets/skins/pong/neon.png',
      description: 'Bright neon paddles that glow in the dark',
      rarity: 'epic',
      styles: { baseStyle: { background: '#ff00ff', boxShadow: '0 0 20px #ff00ff' } }
    },
    {
      id: 'pong_fire',
      name: 'Fire Paddles',
      price: 180,
      image: '/assets/skins/pong/fire.png',
      description: 'Paddles engulfed in flames',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #ff4500, #ff8c00)', boxShadow: '0 0 20px rgba(255, 69, 0, 0.8)' } }
    }
  ],
  
  unblockme: [
    {
      id: 'unblockme_default',
      name: 'Classic Blocks',
      price: 0,
      image: '/assets/skins/unblockme/default.png',
      description: 'The original wooden blocks',
      rarity: 'common',
      styles: { baseStyle: { background: '#8B4513', boxShadow: '0 0 10px rgba(139, 69, 19, 0.5)' } }
    },
    {
      id: 'unblockme_crystal',
      name: 'Crystal Clear',
      price: 170,
      image: '/assets/skins/unblockme/crystal.png',
      description: 'Transparent crystal blocks with light refraction',
      rarity: 'epic',
      styles: { baseStyle: { background: 'rgba(255, 255, 255, 0.2)', boxShadow: '0 0 20px rgba(255, 255, 255, 0.5)', backdropFilter: 'blur(10px)' } }
    },
    {
      id: 'unblockme_galaxy',
      name: 'Galaxy',
      price: 210,
      image: '/assets/skins/unblockme/galaxy.png',
      description: 'Blocks containing swirling galaxies',
      rarity: 'legendary',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #000033, #330033)', boxShadow: '0 0 25px rgba(255, 255, 255, 0.8)' } }
    },
    {
      id: 'unblockme_metal',
      name: 'Metal Blocks',
      price: 150,
      image: '/assets/skins/unblockme/metal.png',
      description: 'Shiny metallic blocks with reflections',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #808080, #A9A9A9)', boxShadow: '0 0 15px rgba(169, 169, 169, 0.7)' } }
    },
    {
      id: 'unblockme_ice',
      name: 'Ice Blocks',
      price: 160,
      image: '/assets/skins/unblockme/ice.png',
      description: 'Frozen ice blocks that sparkle',
      rarity: 'epic',
      styles: { baseStyle: { background: 'linear-gradient(45deg, #E0FFFF, #B0E0E6)', boxShadow: '0 0 20px rgba(176, 224, 230, 0.8)' } }
    }
  ]
}; 