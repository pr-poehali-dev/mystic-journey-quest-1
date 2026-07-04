import { useRef, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import SiteHeader from '@/components/SiteHeader'
import VideoCard from '@/components/VideoCard'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { authors, videos, getAuthor } from '@/data/videos'
import { toast } from '@/hooks/use-toast'

export default function Channel() {
  const { id } = useParams()
  const navigate = useNavigate()
  const author = getAuthor(id || 'a1') || authors[0]
  const avatarRef = useRef<HTMLInputElement>(null)

  const [avatar, setAvatar] = useState(author.avatar)
  const [socials, setSocials] = useState(author.socials || [])
  const [newSocial, setNewSocial] = useState({ icon: 'Link', url: '' })

  const channelVideos = videos.filter((v) => v.authorId === author.id)
  const subscriptions = authors.filter((a) => a.id !== author.id)

  const handleAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(reader.result as string)
      toast({ title: 'Иконка канала обновлена' })
    }
    reader.readAsDataURL(file)
  }

  const addSocial = () => {
    if (!newSocial.url.trim()) return
    setSocials([...socials, newSocial])
    setNewSocial({ icon: 'Link', url: '' })
    toast({ title: 'Ссылка добавлена' })
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />

      <div className="h-40 md:h-56 w-full overflow-hidden">
        <img src={author.banner} alt="" className="w-full h-full object-cover opacity-60" />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end gap-5 -mt-12 md:-mt-16">
          <div className="relative w-28 h-28 shrink-0">
            <img src={avatar} alt={author.name} className="w-28 h-28 rounded-full object-cover border-4 border-black" />
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute bottom-1 right-1 bg-[#FF4D00] text-black rounded-full p-1.5 hover:bg-[#ff6a2b]"
            >
              <Icon name="Camera" size={16} />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" hidden onChange={handleAvatar} />
          </div>

          <div className="flex-1">
            <h1 className="text-3xl font-bold">{author.name}</h1>
            <p className="text-neutral-400">{author.subscribers} подписчиков · {channelVideos.length} видео</p>
            <div className="flex gap-3 mt-3">
              {socials.map((s, i) => (
                <a key={i} href={s.url} className="text-neutral-400 hover:text-[#FF4D00]">
                  <Icon name={s.icon} fallback="Link" size={22} />
                </a>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button className="bg-[#FF4D00] text-black hover:bg-[#ff6a2b]">Подписаться</Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="border-neutral-700 text-white">
                  <Icon name="Settings" size={18} className="mr-1" /> Соцсети
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-neutral-800 text-white">
                <DialogHeader>
                  <DialogTitle>Ссылки на соцсети</DialogTitle>
                </DialogHeader>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Иконка (Youtube, Instagram...)"
                      value={newSocial.icon}
                      onChange={(e) => setNewSocial({ ...newSocial, icon: e.target.value })}
                      className="bg-neutral-900 border-neutral-700"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Input
                      placeholder="https://..."
                      value={newSocial.url}
                      onChange={(e) => setNewSocial({ ...newSocial, url: e.target.value })}
                      className="bg-neutral-900 border-neutral-700"
                    />
                    <Button onClick={addSocial} className="bg-[#FF4D00] text-black hover:bg-[#ff6a2b]">
                      <Icon name="Plus" size={18} />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-3 pt-2">
                    {socials.map((s, i) => (
                      <div key={i} className="flex items-center gap-1 text-neutral-300">
                        <Icon name={s.icon} fallback="Link" size={18} /> {s.icon}
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <Tabs defaultValue="videos" className="mt-8">
          <TabsList className="bg-neutral-900">
            <TabsTrigger value="videos">Видео</TabsTrigger>
            <TabsTrigger value="subscriptions">Подписки</TabsTrigger>
          </TabsList>

          <TabsContent value="videos" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
              {channelVideos.map((v) => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="subscriptions" className="mt-6">
            <div className="flex flex-wrap gap-6 pb-12">
              {subscriptions.map((a) => (
                <button
                  key={a.id}
                  onClick={() => navigate(`/channel/${a.id}`)}
                  className="flex flex-col items-center gap-2 w-28"
                >
                  <img src={a.avatar} alt={a.name} className="w-20 h-20 rounded-full object-cover" />
                  <span className="text-sm font-medium">{a.name}</span>
                  <span className="text-xs text-neutral-500">{a.subscribers}</span>
                </button>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
