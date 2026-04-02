'use client'

import { useModal } from '@/store/modal.store'
import { X } from 'lucide-react'
import { useEffect } from 'react'

const Modal = ({ children }: { children: React.ReactNode }) => {
	const close = useModal(state => state.close)
	const type = useModal(state => state.type)

	useEffect(() => {
		if (!type) return

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				close()
			}
		}
		window.addEventListener('keydown', handleKeyDown)
		document.querySelector('body')?.classList.add('overflow-hidden')
		return () => {
			window.removeEventListener('keydown', handleKeyDown)
			document.querySelector('body')?.classList.remove('overflow-hidden')
		}
	}, [close, type])

	if (!type) return null

	return (
		<div className='inset-0 absolute backdrop-blur-xs w-full h-full bg-white/10 z-10 flex items-center justify-center'>
			<div className='bg-white shadow-lg w-2/5 py-8 px-10 relative overflow-x-hidden scrollbar-stable overflow-y-auto h-9/10 scrollbar'>
				{children}
				<button
					className='absolute top-7 right-2 p-1.5 rounded-md transition-colors duration-300 hover:bg-gray-200/40'
					onClick={close}
				>
					<X />
				</button>
			</div>
		</div>
	)
}

export default Modal
