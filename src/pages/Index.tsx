import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { weatherService, WeatherResponse } from '@/services/weatherApi';
import { trafficService, TrafficResponse } from '@/services/trafficApi';
import { useState, useEffect } from 'react';

const Index = () => {
  const [weatherData, setWeatherData] = useState<WeatherResponse | null>(null);
  const [trafficData, setTrafficData] = useState<TrafficResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [weather, traffic] = await Promise.all([
          weatherService.getCurrentWeather('Moscow'),
          trafficService.getTrafficData()
        ]);
        setWeatherData(weather);
        setTrafficData(traffic);
      } catch (error) {
        console.error('Ошибка загрузки данных:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    
    // Обновляем данные каждые 5 минут
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  const getCurrentTime = () => {
    return new Date().toLocaleString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Домашняя панель
        </h1>
        <p className="text-slate-400 text-lg">{getCurrentTime()}</p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        
        {/* Weather Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="Cloud" size={24} />
              Погода в Москве
              {loading && <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {weatherData && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-4xl font-bold text-blue-400">{weatherData.current.temperature}°C</div>
                    <div className="text-slate-400">Ощущается как {weatherData.current.feelsLike}°C</div>
                    <div className="text-slate-300 text-sm">{weatherData.current.description}</div>
                  </div>
                  <Icon name={weatherService.getWeatherIcon(weatherData.current.description)} size={48} className="text-blue-400" />
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-slate-400">{weatherData.forecast[0]?.date || 'Завтра'}</div>
                    <div className="font-semibold">{weatherData.forecast[0]?.temperature || 'N/A'}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">{weatherData.forecast[1]?.date || 'Послезавтра'}</div>
                    <div className="font-semibold">{weatherData.forecast[1]?.temperature || 'N/A'}°C</div>
                  </div>
                  <div className="text-center">
                    <div className="text-slate-400">Влажность</div>
                    <div className="font-semibold">{weatherData.current.humidity}%</div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Time Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-3xl font-mono font-bold text-green-400 mb-2">
                {new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </div>
              <div className="text-slate-400">
                {new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Traffic Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="Car" size={20} />
              Пробки
              {loading && <div className="w-3 h-3 border-2 border-orange-400 border-t-transparent rounded-full animate-spin"></div>}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {trafficData && (
              <>
                <div className="space-y-3">
                  {trafficData.roads.slice(0, 3).map((road, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">{road.name}</span>
                      <Badge 
                        variant={trafficService.getBadgeVariant(road.color)}
                        className={road.color !== 'red' ? trafficService.getBadgeClasses(road.color) : ''}
                      >
                        {road.level} {road.level === 1 ? 'балл' : road.level < 5 ? 'балла' : 'баллов'}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-xs text-slate-500">
                    Обновлено: {trafficData.lastUpdated}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* News Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="Newspaper" size={20} />
              Новости Москвы
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Новая станция метро открылась на Сокольнической линии</h3>
                <p className="text-sm text-slate-400">15 минут назад</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Температурный рекорд зафиксирован в столице</h3>
                <p className="text-sm text-slate-400">1 час назад</p>
              </div>
              <div className="border-l-4 border-orange-500 pl-4">
                <h3 className="font-semibold text-white mb-1">Реконструкция парка Горького завершена</h3>
                <p className="text-sm text-slate-400">3 часа назад</p>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent border-slate-600 hover:bg-slate-700">
              Показать все новости
            </Button>
          </CardContent>
        </Card>

        {/* School News Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm col-span-1 lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="GraduationCap" size={20} />
              Школа № 2036
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Летние профильные смены</h3>
                <p className="text-sm text-slate-300 mb-2">Набор в IT-лагерь и математическую смену на август</p>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">Запись открыта</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Выпускной 11 классов</span>
                  <span className="text-xs text-slate-500">25 июля</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Подача документов в 10 класс</span>
                  <span className="text-xs text-slate-500">до 28 июля</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Ремонт актового зала</span>
                  <span className="text-xs text-slate-500">июль-август</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Widget */}
        <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-white">
              <Icon name="Calendar" size={20} />
              События
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-white">Встреча с врачом</div>
                  <div className="text-xs text-slate-400">Сегодня, 16:00</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-white">День рождения мамы</div>
                  <div className="text-xs text-slate-400">Завтра</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <div className="text-sm font-medium text-white">Отпуск</div>
                  <div className="text-xs text-slate-400">1-15 февраля</div>
                </div>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 bg-transparent border-slate-600 hover:bg-slate-700">
              <Icon name="Plus" size={16} />
              Добавить событие
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

export default Index;