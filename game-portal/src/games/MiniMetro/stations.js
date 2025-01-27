import { SHAPES, GAME_CONFIG, ANIMATIONS } from './constants';

export class Station {
  constructor(x, y, shape) {
    this.x = x;
    this.y = y;
    this.shape = shape;
    this.passengers = [];
    this.lines = [];
    this.spawnTime = Date.now();
    this.animationProgress = 0;
  }

  addPassenger(passenger) {
    if (this.passengers.length < GAME_CONFIG.MAX_PASSENGERS_PER_STATION) {
      this.passengers.push(passenger);
      return true;
    }
    return false;
  }

  removePassenger(passenger) {
    const index = this.passengers.indexOf(passenger);
    if (index !== -1) {
      this.passengers.splice(index, 1);
      return true;
    }
    return false;
  }

  connectLine(line) {
    if (!this.lines.includes(line)) {
      this.lines.push(line);
    }
  }

  disconnectLine(line) {
    const index = this.lines.indexOf(line);
    if (index !== -1) {
      this.lines.splice(index, 1);
    }
  }

  update(deltaTime) {
    // Update animation progress
    if (this.animationProgress < 1) {
      this.animationProgress = Math.min(
        1,
        (Date.now() - this.spawnTime) / ANIMATIONS.STATION_SPAWN.DURATION
      );
    }
  }

  getScale() {
    if (this.animationProgress < 1) {
      const { SCALE } = ANIMATIONS.STATION_SPAWN;
      const progress = this.animationProgress;
      if (progress < 0.5) {
        return SCALE[0] + (SCALE[1] - SCALE[0]) * (progress * 2);
      } else {
        return SCALE[1] + (SCALE[2] - SCALE[1]) * ((progress - 0.5) * 2);
      }
    }
    return 1;
  }
}

export const generateStations = (count) => {
  const stations = [];
  const shapes = Object.values(SHAPES);
  const margin = GAME_CONFIG.STATION_RADIUS * 4;
  const minDistance = GAME_CONFIG.STATION_RADIUS * 8;

  const isValidPosition = (x, y) => {
    return stations.every(station => {
      const dx = station.x - x;
      const dy = station.y - y;
      return Math.sqrt(dx * dx + dy * dy) >= minDistance;
    });
  };

  for (let i = 0; i < count; i++) {
    let x, y, attempts = 0;
    do {
      x = margin + Math.random() * (window.innerWidth - margin * 2);
      y = margin + Math.random() * (window.innerHeight - margin * 2);
      attempts++;
    } while (!isValidPosition(x, y) && attempts < 100);

    if (attempts < 100) {
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      stations.push(new Station(x, y, shape));
    }
  }

  return stations;
};

export const findClickedStation = (pos, stations) => {
  const { x, y } = pos;
  const radius = GAME_CONFIG.STATION_RADIUS * GAME_CONFIG.HOVER_SCALE;

  return stations.find(station => {
    const dx = station.x - x;
    const dy = station.y - y;
    return Math.sqrt(dx * dx + dy * dy) <= radius;
  });
};

export const findNearestStation = (pos, stations) => {
  const { x, y } = pos;
  let nearest = null;
  let minDistance = Infinity;

  stations.forEach(station => {
    const dx = station.x - x;
    const dy = station.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < minDistance) {
      minDistance = distance;
      nearest = station;
    }
  });

  return minDistance <= GAME_CONFIG.STATION_RADIUS * GAME_CONFIG.HOVER_SCALE ? nearest : null;
};

export const getStationPath = (ctx, station, scale = 1) => {
  const radius = GAME_CONFIG.STATION_RADIUS * scale;

  ctx.beginPath();
  switch (station.shape) {
    case SHAPES.CIRCLE:
      ctx.arc(station.x, station.y, radius, 0, Math.PI * 2);
      break;
    case SHAPES.SQUARE:
      ctx.rect(station.x - radius, station.y - radius, radius * 2, radius * 2);
      break;
    case SHAPES.TRIANGLE:
      ctx.moveTo(station.x, station.y - radius);
      ctx.lineTo(station.x + radius * Math.cos(Math.PI / 6), station.y + radius * Math.sin(Math.PI / 6));
      ctx.lineTo(station.x - radius * Math.cos(Math.PI / 6), station.y + radius * Math.sin(Math.PI / 6));
      ctx.closePath();
      break;
    case SHAPES.DIAMOND:
      ctx.moveTo(station.x, station.y - radius);
      ctx.lineTo(station.x + radius, station.y);
      ctx.lineTo(station.x, station.y + radius);
      ctx.lineTo(station.x - radius, station.y);
      ctx.closePath();
      break;
    case SHAPES.STAR:
      for (let i = 0; i < 5; i++) {
        const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
        const nextAngle = ((i + 1) * 4 * Math.PI) / 5 - Math.PI / 2;
        const innerAngle = angle + Math.PI / 5;
        
        if (i === 0) {
          ctx.moveTo(
            station.x + radius * Math.cos(angle),
            station.y + radius * Math.sin(angle)
          );
        }
        
        ctx.lineTo(
          station.x + (radius * 0.4) * Math.cos(innerAngle),
          station.y + (radius * 0.4) * Math.sin(innerAngle)
        );
        
        ctx.lineTo(
          station.x + radius * Math.cos(nextAngle),
          station.y + radius * Math.sin(nextAngle)
        );
      }
      ctx.closePath();
      break;
    case SHAPES.PENTAGON:
      for (let i = 0; i < 5; i++) {
        const angle = (i * 2 * Math.PI) / 5 - Math.PI / 2;
        if (i === 0) {
          ctx.moveTo(
            station.x + radius * Math.cos(angle),
            station.y + radius * Math.sin(angle)
          );
        } else {
          ctx.lineTo(
            station.x + radius * Math.cos(angle),
            station.y + radius * Math.sin(angle)
          );
        }
      }
      ctx.closePath();
      break;
  }
}; 