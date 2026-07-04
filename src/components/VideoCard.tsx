import { useNavigate } from 'react-router-dom'
import { getAuthor, type Video } from '@/data/videos'

export default function VideoCard({ video }: { video: Video }) {
  const navigate = useNavigate()
  const author = getAuthor(video.authorId)

  return (
    <div
      className="group cursor-pointer"
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <div className="relative rounded-xl overflow-hidden aspect-video bg-neutral-900">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
      </div>
      <div className="flex gap-3 mt-3">
        <img
          src={author?.avatar}
          alt={author?.name}
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />
        <div className="min-w-0">
          <h3 className="text-white font-medium leading-tight line-clamp-2">{video.title}</h3>
          <p className="text-neutral-400 text-sm mt-1">{author?.name}</p>
          <p className="text-neutral-500 text-xs">{video.views} просмотров · {video.uploaded}</p>
        </div>
      </div>
    </div>
  )
}
