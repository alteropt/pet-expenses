import { TransactionType } from '@/types/transaction.type'
import { create } from 'zustand'

type ModalDataMap = {
	'create-expense': undefined
	'edit-expense': TransactionType
}

type ModalStore = {
	type: keyof ModalDataMap | null
	data?: ModalDataMap[keyof ModalDataMap] | undefined
	open: <T extends keyof ModalDataMap>(type: T, data?: ModalDataMap[T]) => void
	close: () => void
}

export const useModal = create<ModalStore>(set => ({
	type: null,
	data: undefined,
	open: (type, data) => set({ type, data }),
	close: () => set({ type: null, data: undefined }),
}))
