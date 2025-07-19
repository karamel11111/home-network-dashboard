// Сервис для работы с API погоды OpenWeatherMap
interface WeatherData {
  temperature: number;
  feelsLike: number;
  description: string;
  humidity: number;
  iconCode: string;
  city: string;
}

interface ForecastData {
  date: string;
  temperature: number;
  description: string;
  iconCode: string;
}

interface WeatherResponse {
  current: WeatherData;
  forecast: ForecastData[];
}

// Демо данные для разработки (замените на реальный API ключ)
const DEMO_WEATHER_DATA: WeatherResponse = {
  current: {
    temperature: 22,
    feelsLike: 24,
    description: "Облачно с прояснениями",
    humidity: 65,
    iconCode: "03d",
    city: "Москва"
  },
  forecast: [
    {
      date: "завтра",
      temperature: 25,
      description: "Небольшой дождь",
      iconCode: "10d"
    },
    {
      date: "послезавтра", 
      temperature: 27,
      description: "Переменная облачность",
      iconCode: "02d"
    }
  ]
};

class WeatherService {
  private apiKey: string = 'DEMO_MODE'; // Замените на ваш API ключ
  private baseUrl = 'https://api.openweathermap.org/data/2.5';

  async getCurrentWeather(city: string = 'Moscow'): Promise<WeatherResponse> {
    try {
      // В демо режиме возвращаем тестовые данные
      if (this.apiKey === 'DEMO_MODE') {
        return new Promise(resolve => {
          setTimeout(() => resolve(DEMO_WEATHER_DATA), 500);
        });
      }

      // Реальный запрос к API (раскомментируйте при наличии API ключа)
      /*
      const [currentResponse, forecastResponse] = await Promise.all([
        fetch(`${this.baseUrl}/weather?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`),
        fetch(`${this.baseUrl}/forecast?q=${city}&appid=${this.apiKey}&units=metric&lang=ru`)
      ]);

      const currentData = await currentResponse.json();
      const forecastData = await forecastResponse.json();

      return {
        current: {
          temperature: Math.round(currentData.main.temp),
          feelsLike: Math.round(currentData.main.feels_like),
          description: currentData.weather[0].description,
          humidity: currentData.main.humidity,
          iconCode: currentData.weather[0].icon,
          city: currentData.name
        },
        forecast: forecastData.list.slice(0, 2).map((item: any) => ({
          date: new Date(item.dt * 1000).toLocaleDateString('ru-RU', { weekday: 'short' }),
          temperature: Math.round(item.main.temp),
          description: item.weather[0].description,
          iconCode: item.weather[0].icon
        }))
      };
      */

      return DEMO_WEATHER_DATA;
    } catch (error) {
      console.error('Ошибка получения данных о погоде:', error);
      return DEMO_WEATHER_DATA;
    }
  }

  getWeatherIconUrl(iconCode: string): string {
    return `https://openweathermap.org/img/w/${iconCode}.png`;
  }

  // Метод для получения иконки по описанию погоды
  getWeatherIcon(description: string): string {
    const iconMap: { [key: string]: string } = {
      'ясно': 'Sun',
      'облачно': 'Cloud',
      'снег': 'CloudSnow',
      'дождь': 'CloudRain',
      'туман': 'CloudFog',
      'гроза': 'CloudLightning'
    };

    const lowerDesc = description.toLowerCase();
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerDesc.includes(key)) {
        return icon;
      }
    }
    
    return 'Cloud';
  }
}

export const weatherService = new WeatherService();
export type { WeatherData, ForecastData, WeatherResponse };