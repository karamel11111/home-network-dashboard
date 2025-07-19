import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const Index = () => {
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-4xl font-bold text-blue-400">-2°C</div>
                <div className="text-slate-400">Ощущается как -5°C</div>
              </div>
              <Icon name="CloudSnow" size={48} className="text-blue-400" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="text-slate-400">Завтра</div>
                <div className="font-semibold">-1°C</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Послезавтра</div>
                <div className="font-semibold">+2°C</div>
              </div>
              <div className="text-center">
                <div className="text-slate-400">Влажность</div>
                <div className="font-semibold">78%</div>
              </div>
            </div>
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
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">Садовое кольцо</span>
                <Badge variant="destructive">9 баллов</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">ТТК</span>
                <Badge variant="outline" className="bg-yellow-500/20 text-yellow-400 border-yellow-500">7 баллов</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">МКАД</span>
                <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">4 балла</Badge>
              </div>
            </div>
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
              <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 p-4 rounded-lg">
                <h3 className="font-semibold text-white mb-2">Олимпиада по математике</h3>
                <p className="text-sm text-slate-300 mb-2">Региональный этап начинается 25 января</p>
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500">Важное</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">Родительское собрание 8А</span>
                  <span className="text-xs text-slate-500">28 янв</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-400">День открытых дверей</span>
                  <span className="text-xs text-slate-500">2 фев</span>
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