export interface Author {
  id: string
  name: string
  avatar: string
  subscribers: string
  banner?: string
  socials?: { icon: string; url: string }[]
}

export interface Video {
  id: string
  title: string
  thumbnail: string
  duration: string
  views: string
  uploaded: string
  authorId: string
  description: string
  videoUrl: string
}

const THUMB_1 = 'https://cdn.poehali.dev/projects/145dde01-5d62-4c9a-abd3-1d3d516a41b5/files/5e92502e-2d27-4a51-a604-b619e86f78d8.jpg'
const THUMB_2 = 'https://cdn.poehali.dev/projects/145dde01-5d62-4c9a-abd3-1d3d516a41b5/files/fa559d4f-d134-4394-b6b1-92087aa342a6.jpg'
const THUMB_3 = 'https://cdn.poehali.dev/projects/145dde01-5d62-4c9a-abd3-1d3d516a41b5/files/128b004e-939e-4907-b0b3-1b30446c81a5.jpg'

export const authors: Author[] = [
  {
    id: 'a1',
    name: 'ProGamer',
    avatar: THUMB_1,
    subscribers: '1.2M',
    banner: THUMB_1,
    socials: [
      { icon: 'Youtube', url: '#' },
      { icon: 'Twitch', url: '#' },
      { icon: 'Instagram', url: '#' },
    ],
  },
  {
    id: 'a2',
    name: 'TechWave',
    avatar: THUMB_2,
    subscribers: '850K',
    banner: THUMB_2,
    socials: [
      { icon: 'Youtube', url: '#' },
      { icon: 'Twitter', url: '#' },
    ],
  },
  {
    id: 'a3',
    name: 'LiveMusic',
    avatar: THUMB_3,
    subscribers: '2.4M',
    banner: THUMB_3,
    socials: [
      { icon: 'Instagram', url: '#' },
      { icon: 'Music', url: '#' },
    ],
  },
]

export const videos: Video[] = [
  {
    id: 'v1',
    title: 'Финал турнира: эпичная развязка',
    thumbnail: THUMB_1,
    duration: '12:45',
    views: '340K',
    uploaded: '2 дня назад',
    authorId: 'a1',
    description: 'Смотрите лучшие моменты финального матча сезона. Напряжение до последней секунды!',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  },
  {
    id: 'v2',
    title: 'Обзор новинок технологий 2026',
    thumbnail: THUMB_2,
    duration: '18:30',
    views: '120K',
    uploaded: '5 дней назад',
    authorId: 'a2',
    description: 'Разбираем самые интересные гаджеты этого года и делимся впечатлениями.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  },
  {
    id: 'v3',
    title: 'Live-концерт: полная запись',
    thumbnail: THUMB_3,
    duration: '54:12',
    views: '1.1M',
    uploaded: '1 неделю назад',
    authorId: 'a3',
    description: 'Полная запись живого выступления. Атмосфера, свет и звук на максимум.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'v4',
    title: 'Разбор стратегий для новичков',
    thumbnail: THUMB_1,
    duration: '22:08',
    views: '89K',
    uploaded: '3 дня назад',
    authorId: 'a1',
    description: 'Пошаговый гайд для тех, кто только начинает. Простые советы и приёмы.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'v5',
    title: 'Сборка мечты: тест на пределе',
    thumbnail: THUMB_2,
    duration: '15:40',
    views: '200K',
    uploaded: '6 дней назад',
    authorId: 'a2',
    description: 'Тестируем мощную сборку в реальных задачах и играх.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'v6',
    title: 'Акустический сет вживую',
    thumbnail: THUMB_3,
    duration: '31:55',
    views: '450K',
    uploaded: '2 недели назад',
    authorId: 'a3',
    description: 'Уютный акустический вечер. Только голос и гитара.',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
]

export const getAuthor = (id: string) => authors.find((a) => a.id === id)
