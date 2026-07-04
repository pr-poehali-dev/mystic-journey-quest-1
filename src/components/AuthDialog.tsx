import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/hooks/use-toast'

interface AuthDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function AuthDialog({ open, onOpenChange }: AuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>('register')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: mode === 'login' ? 'Вход выполнен' : 'Регистрация завершена',
      description: 'Добро пожаловать в PLAYERS LIVE!',
    })
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black border-neutral-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {mode === 'login' ? 'Вход в канал' : 'Регистрация'}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Название канала</Label>
              <Input id="name" placeholder="Мой канал" className="bg-neutral-900 border-neutral-700" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@email.com" className="bg-neutral-900 border-neutral-700" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <Input id="password" type="password" placeholder="••••••••" className="bg-neutral-900 border-neutral-700" required />
          </div>
          <Button type="submit" className="w-full bg-[#FF4D00] text-black hover:bg-[#ff6a2b]">
            {mode === 'login' ? 'Войти' : 'Создать канал'}
          </Button>
        </form>
        <div className="text-center text-sm text-neutral-400">
          {mode === 'login' ? 'Ещё нет канала?' : 'Уже есть канал?'}{' '}
          <button
            className="text-[#FF4D00] hover:underline"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
