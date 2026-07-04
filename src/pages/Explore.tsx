import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '@/components/SiteHeader'
import VideoCard from '@/components/VideoCard'
import Icon from '@/components/ui/icon'
import { Input } from '@/components/ui/input'
import { authors, videos, getAuthor } from '@/data/videos'

export default function Explore() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const q = query.trim().toLowerCase()

  const filteredVideos = useMemo(
    () =>
      videos.filter((v) => {
        const author = getAuthor(v.authorId)
        return (
          v.title.toLowerCase().includes(q) ||
          (author?.name.toLowerCase().includes(q) ?? false)
        )
      }),
    [q]
  )

  const filteredAuthors = useMemo(
    () => authors.filter((a) => a.name.toLowerCase().includes(q)),
    [q]
  )

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        <div className="relative max-w-xl mx-auto mb-10">
          <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Поиск авторов и видео..."
            className="pl-10 bg-neutral-900 border-neutral-700 h-11"
          />
        </div>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Авторы</h2>
          {filteredAuthors.length === 0 ? (
            <p className="text-neutral-500">Авторы не найдены</p>
          ) : (
            <div className="flex gap-6 flex-wrap">
              {filteredAuthors.map((a) => (
                <button
                  key={a.id}
                  onClick={() => navigate(`/channel/${a.id}`)}
                  className="flex flex-col items-center gap-2 w-28"
                >
                  <img src={a.avatar} alt={a.name} className="w-20 h-20 rounded-full object-cover" />
                  <span className="text-sm font-medium truncate w-full text-center">{a.name}</span>
                  <span className="text-xs text-neutral-500">{a.subscribers}</span>
                </button>
              ))}
            </div>
          )}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">Все видео</h2>
          {filteredVideos.length === 0 ? (
            <p className="text-neutral-500">Видео не найдены</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
