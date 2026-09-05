import { defineStore } from 'pinia'

const savedItems = () => {
	try { return JSON.parse(localStorage.getItem('vora-cart') || '[]') } catch { return [] }
}

export const useCartStore = defineStore('cart', {
	state: () => ({ items: savedItems(), discount: 0 }),
	getters: {
		count: state => state.items.reduce((total, item) => total + item.qty, 0),
		subtotal: state => state.items.reduce((total, item) => total + item.price * item.qty, 0),
		total () { return Math.max(0, this.subtotal - this.discount) }
	},
	actions: {
		persist () { localStorage.setItem('vora-cart', JSON.stringify(this.items)) },
		add (product, qty = 1) {
			const existing = this.items.find(item => item.id === product.id)
			if (existing) existing.qty += qty
			else this.items.push({ ...product, qty })
			this.persist()
		},
		remove (id) { this.items = this.items.filter(item => item.id !== id); this.persist() },
		setQty (id, qty) {
			const item = this.items.find(entry => entry.id === id)
			if (item) item.qty = Math.max(1, Number(qty) || 1)
			this.persist()
		},
		clear () { this.items = []; this.persist() }
	}
})
