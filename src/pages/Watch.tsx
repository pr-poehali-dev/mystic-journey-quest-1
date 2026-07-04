import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SiteHeader from '@/components/SiteHeader'
import VideoCard from '@/components/VideoCard'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { videos, getAuthor } from '@/data/videos'

export default function Watch() {
  const { id } = useParams()
  const navigate = useNavigate()
  const video = videos.find((v) => v.id === id)
  const [liked, setLiked] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  if (!video) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SiteHeader />
        <div className="text-center py-20">
          <p className="text-neutral-400">Видео не найдено</p>
          <Button className="mt-4 bg-[#FF4D00] text-black hover:bg-[#ff6a2b]" onClick={() => navigate('/explore')}>
            К обзору
          </Button>
        </div>
      </div>
    )
  }

  const author = getAuthor(video.authorId)
  const recommendations = videos.filter((v) => v.id !== video.id)

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-xl overflow-hidden bg-neutral-950 aspect-video">
            <video src={video.videoUrl} poster={video.thumbnail} controls className="w-full h-full" />
          </div>
          <h1 className="text-2xl font-bold mt-4">{video.title}</h1>
          <p className="text-neutral-500 text-sm mt-1">{video.views} просмотров · {video.uploaded}</p>

          <div className="flex items-center justify-between flex-wrap gap-4 mt-4 border-b border-neutral-900 pb-4">
            <button className="flex items-center gap-3" onClick={() => navigate(`/channel/${author?.id}`)}>
              <img src={author?.avatar} alt={author?.name} className="w-11 h-11 rounded-full object-cover" />
              <div className="text-left">
                <p className="font-medium">{author?.name}</p>
                <p className="text-neutral-500 text-sm">{author?.subscribers} подписчиков</p>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant={liked ? 'default' : 'outline'}
                onClick={() => setLiked(!liked)}
                className={liked ? 'bg-[#FF4D00] text-black hover:bg-[#ff6a2b]' : 'border-neutral-700 text-white'}
              >
                <Icon name="ThumbsUp" size={18} className="mr-1" /> {liked ? 'Нравится' : 'Лайк'}
              </Button>
              <Button
                onClick={() => setSubscribed(!subscribed)}
                className={subscribed ? 'bg-neutral-800 text-white hover:bg-neutral-700' : 'bg-[#FF4D00] text-black hover:bg-[#ff6a2b]'}
              >
                {subscribed ? 'Вы подписаны' : 'Подписаться'}
              </Button>
            </div>
          </div>

          <div className="mt-4 bg-neutral-950 rounded-xl p-4">
            <p className="text-neutral-300 whitespace-pre-line">{video.description}</p>
          </div>
        </div>

        <aside>
          <h2 className="text-lg font-bold mb-4">Рекомендации</h2>
          <div className="flex flex-col gap-5">
            {recommendations.map((v) => (
              <VideoCard key={v.id} video={v} />
            ))}
          </div>
        </aside>
      </main>
    </div>
  )
}
