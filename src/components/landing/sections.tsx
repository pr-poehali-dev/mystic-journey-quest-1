import { Badge } from "@/components/ui/badge"

export const sections = [
  {
    id: 'hero',
    subtitle: <Badge variant="outline" className="text-[#FF4D00] border-[#FF4D00]">РЕЛИЗ</Badge>,
    title: "PLAYERS LIVE",
    content: 'Стриминговая видео-платформа нового поколения. Смотри, создавай и делись — всё вживую.',
    showButton: true,
    buttonText: 'Присоединиться',
    buttonAction: 'auth' as const
  },
  {
    id: 'about',
    title: 'Что такое PLAYERS LIVE?',
    content: 'Это площадка для авторов и зрителей: тысячи каналов, прямые эфиры и видео на любой вкус. Подписывайся на любимых авторов и не пропускай новинки.'
  },
  {
    id: 'features',
    title: 'Загружай своё видео',
    content: 'Собственный канал с подписчиками, лайками и загрузкой роликов. Добавляй миниатюру, описание и тайминги — делись контентом с миром за пару минут.'
  },
  {
    id: 'testimonials',
    title: 'Смотри любимых авторов',
    content: 'Удобный поиск по всем авторам и видео, персональные рекомендации и лента, которая подстраивается под тебя.'
  },
  {
    id: 'join',
    title: 'Начни смотреть сейчас',
    content: 'Присоединяйся к PLAYERS LIVE — открой мир живого видео уже сегодня.',
    showButton: true,
    buttonText: 'Смотреть видео',
    buttonAction: 'explore' as const
  },
]