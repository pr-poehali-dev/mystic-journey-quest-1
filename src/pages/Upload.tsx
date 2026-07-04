import { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SiteHeader from '@/components/SiteHeader'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/hooks/use-toast'

export default function Upload() {
  const navigate = useNavigate()
  const [thumbnail, setThumbnail] = useState<string | null>(null)
  const [videoName, setVideoName] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [timings, setTimings] = useState('')
  const [description, setDescription] = useState('')
  const [errors, setErrors] = useState<Record<string, string>>({})
  const thumbRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLInputElement>(null)

  const handleThumb = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      toast({ title: 'Ошибка', description: 'Миниатюра должна быть изображением', variant: 'destructive' })
      return
    }
    const reader = new FileReader()
    reader.onload = () => setThumbnail(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('video/')) {
      toast({ title: 'Ошибка', description: 'Файл должен быть видео', variant: 'destructive' })
      return
    }
    setVideoName(file.name)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Record<string, string> = {}
    if (!title.trim()) newErrors.title = 'Введите название'
    if (!videoName) newErrors.video = 'Загрузите видео'
    if (!thumbnail) newErrors.thumbnail = 'Загрузите миниатюру'
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return

    toast({ title: 'Видео загружено!', description: 'Ваш ролик появится на канале после обработки.' })
    navigate('/channel/a1')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <SiteHeader />
      <main className="max-w-3xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold mb-8">Загрузка видео</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label className="mb-2 block">Видео *</Label>
            <button
              type="button"
              onClick={() => videoRef.current?.click()}
              className="w-full border-2 border-dashed border-neutral-700 rounded-xl py-10 flex flex-col items-center gap-2 hover:border-[#FF4D00] transition-colors"
            >
              <Icon name={videoName ? 'CircleCheck' : 'Film'} size={32} className={videoName ? 'text-[#FF4D00]' : 'text-neutral-500'} />
              <span className="text-neutral-400">{videoName || 'Нажмите, чтобы выбрать видеофайл'}</span>
            </button>
            <input ref={videoRef} type="file" accept="video/*" hidden onChange={handleVideo} />
            {errors.video && <p className="text-red-500 text-sm mt-1">{errors.video}</p>}
          </div>

          <div>
            <Label className="mb-2 block">Миниатюра *</Label>
            <button
              type="button"
              onClick={() => thumbRef.current?.click()}
              className="w-full border-2 border-dashed border-neutral-700 rounded-xl overflow-hidden hover:border-[#FF4D00] transition-colors"
            >
              {thumbnail ? (
                <img src={thumbnail} alt="Миниатюра" className="w-full aspect-video object-cover" />
              ) : (
                <div className="py-10 flex flex-col items-center gap-2">
                  <Icon name="Image" size={32} className="text-neutral-500" />
                  <span className="text-neutral-400">Загрузить обложку</span>
                </div>
              )}
            </button>
            <input ref={thumbRef} type="file" accept="image/*" hidden onChange={handleThumb} />
            {errors.thumbnail && <p className="text-red-500 text-sm mt-1">{errors.thumbnail}</p>}
          </div>

          <div>
            <Label htmlFor="title" className="mb-2 block">Название *</Label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Введите название видео" className="bg-neutral-900 border-neutral-700" />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          <div>
            <Label htmlFor="timings" className="mb-2 block">Тайминги</Label>
            <Textarea id="timings" value={timings} onChange={(e) => setTimings(e.target.value)} placeholder="00:00 Вступление&#10;01:30 Основная часть&#10;10:00 Итоги" className="bg-neutral-900 border-neutral-700 min-h-[100px]" />
          </div>

          <div>
            <Label htmlFor="description" className="mb-2 block">Описание</Label>
            <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Расскажите о вашем видео..." className="bg-neutral-900 border-neutral-700 min-h-[120px]" />
          </div>

          <Button type="submit" className="w-full bg-[#FF4D00] text-black hover:bg-[#ff6a2b] h-12 text-base">
            <Icon name="Upload" size={18} className="mr-2" /> Опубликовать видео
          </Button>
        </form>
      </main>
    </div>
  )
}
