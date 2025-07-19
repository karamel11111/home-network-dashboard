// Сервис для работы с API пробок Яндекс.Карты
interface TrafficData {
  name: string;
  level: number;
  color: 'green' | 'yellow' | 'red';
  description: string;
}

interface TrafficResponse {
  roads: TrafficData[];
  lastUpdated: string;
}

// Демо данные для разработки
const DEMO_TRAFFIC_DATA: TrafficResponse = {
  roads: [
    {
      name: "Садовое кольцо",
      level: 9,
      color: "red",
      description: "Серьезные пробки"
    },
    {
      name: "ТТК",
      level: 7,
      color: "yellow", 
      description: "Затруднения"
    },
    {
      name: "МКАД",
      level: 4,
      color: "green",
      description: "Свободно"
    },
    {
      name: "Ленинский проспект",
      level: 6,
      color: "yellow",
      description: "Небольшие пробки"
    }
  ],
  lastUpdated: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
};

class TrafficService {
  private apiKey: string = 'DEMO_MODE'; // Замените на ваш API ключ Яндекс.Карт
  
  async getTrafficData(): Promise<TrafficResponse> {
    try {
      // В демо режиме возвращаем тестовые данные с небольшой рандомизацией
      if (this.apiKey === 'DEMO_MODE') {
        return new Promise(resolve => {
          setTimeout(() => {
            const data = { ...DEMO_TRAFFIC_DATA };
            // Добавляем небольшую рандомизацию для демонстрации
            data.roads = data.roads.map(road => ({
              ...road,
              level: Math.max(1, Math.min(10, road.level + Math.floor(Math.random() * 3) - 1))
            })).map(road => ({
              ...road,
              color: this.getLevelColor(road.level),
              description: this.getLevelDescription(road.level)
            }));
            data.lastUpdated = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
            resolve(data);
          }, 300);
        });
      }

      // Реальный запрос к API Яндекс.Карт (раскомментируйте при наличии API ключа)
      /*
      const response = await fetch(
        `https://api-maps.yandex.ru/2.1/?apikey=${this.apiKey}&format=json&lang=ru_RU`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      const data = await response.json();
      
      return {
        roads: data.roads.map((road: any) => ({
          name: road.name,
          level: road.jamLevel,
          color: this.getLevelColor(road.jamLevel),
          description: this.getLevelDescription(road.jamLevel)
        })),
        lastUpdated: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      */

      return DEMO_TRAFFIC_DATA;
    } catch (error) {
      console.error('Ошибка получения данных о пробках:', error);
      return DEMO_TRAFFIC_DATA;
    }
  }

  private getLevelColor(level: number): 'green' | 'yellow' | 'red' {
    if (level <= 3) return 'green';
    if (level <= 6) return 'yellow';
    return 'red';
  }

  private getLevelDescription(level: number): string {
    if (level <= 2) return 'Свободно';
    if (level <= 4) return 'Легкие затруднения';
    if (level <= 6) return 'Небольшие пробки';
    if (level <= 8) return 'Затруднения';
    return 'Серьезные пробки';
  }

  // Метод для получения badge стиля по цвету
  getBadgeVariant(color: string): 'default' | 'destructive' | 'outline' {
    switch (color) {
      case 'red':
        return 'destructive';
      case 'yellow':
        return 'outline';
      case 'green':
        return 'outline';
      default:
        return 'default';
    }
  }

  // Метод для получения CSS классов для цветных badge
  getBadgeClasses(color: string): string {
    switch (color) {
      case 'green':
        return 'bg-green-500/20 text-green-400 border-green-500';
      case 'yellow':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      case 'red':
        return '';
      default:
        return '';
    }
  }
}

export const trafficService = new TrafficService();
export type { TrafficData, TrafficResponse };