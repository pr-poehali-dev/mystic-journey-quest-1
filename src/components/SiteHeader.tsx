import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from '@/components/ui/icon'
import { Button } from '@/components/ui/button'
import AuthDialog from '@/components/AuthDialog'

export default function SiteHeader() {
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-4 bg-black/80 backdrop-blur border-b border-neutral-900">
      <AuthDialog open={authOpen} onOpenChange={setAuthOpen} />
      <button onClick={() => navigate('/')} className="text-white font-bold tracking-widest text-lg">
        PLAYERS <span className="text-[#FF4D00]">LIVE</span>
      </button>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" className="text-neutral-300 hover:text-white" onClick={() => navigate('/explore')}>
          <Icon name="Compass" size={18} className="mr-1" /> Обзор
        </Button>
        <Button variant="ghost" className="text-neutral-300 hover:text-white" onClick={() => navigate('/upload')}>
          <Icon name="Upload" size={18} className="mr-1" /> Загрузить
        </Button>
        <Button variant="ghost" className="text-neutral-300 hover:text-white" onClick={() => navigate('/channel/a1')}>
          <Icon name="User" size={18} className="mr-1" /> Мой канал
        </Button>
        <Button className="bg-[#FF4D00] text-black hover:bg-[#ff6a2b]" onClick={() => setAuthOpen(true)}>
          Войти
        </Button>
      </div>
    </header>
  )
}
