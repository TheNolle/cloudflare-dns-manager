import { encrypt, decrypt } from '../utils/crypto.js'
import { Cloudflare } from '../api.js'

const STORAGE_KEY = 'cloudflarednsmanager_credentials'
const MASTER_KEY = 'cloudflarednsmanager_safe_key'

export const CredentialManager = {
	async load() {
		const raw = localStorage.getItem(STORAGE_KEY)
		if (!raw) return null
		try {
			const json = await decrypt(raw, MASTER_KEY)
			return JSON.parse(json)
		} catch (error) {
			console.warn('Failed to load credentials', error)
			window.toast.warn('Failed to decrypt credentials')
			return null
		}
	},

	async save(credentials) {
		const json = JSON.stringify(credentials)
		const encrypted = await encrypt(json, MASTER_KEY)
		localStorage.setItem(STORAGE_KEY, encrypted)
	},

	async clear() {
		localStorage.removeItem(STORAGE_KEY)
	},

	async validate({ apiToken, zoneId }) {
		if (!apiToken || !zoneId) return false
		try {
			await Cloudflare.verifyToken(apiToken, zoneId)
			return true
		} catch (error) {
			console.warn('Failed to validate credentials', error)
			window.toast.error('Failed to validate credentials')
			return false
		}
	}
}
