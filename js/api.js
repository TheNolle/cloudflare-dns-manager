import { parseTTL, formatTTL } from './utils/parseTTL.js'
import { CredentialManager } from './models/credential-manager.js'
import { verifyToken, listRecords, createRecord, updateRecord, deleteRecord } from './cloudflare/entrypoint.js'

const API_BASE = 'php/api.php'

export const Cloudflare = {
	verifyToken: async (apiToken, zoneId) => verifyToken(apiToken, zoneId),

	async getAll() {
		const credentials = await CredentialManager.load()
		const data = await listRecords(credentials)
		return data.map(record => ({ ...record, ttl: formatTTL(record.ttl) }))
	},

	async newEntry(record) {
		const credentials = await CredentialManager.load()
		const parsed = { ...record, ttl: parseTTL(record.ttl) }
		return createRecord({ ...credentials, ...parsed })
	},

	async updateEntry(record) {
		const credentials = await CredentialManager.load()
		const parsed = { ...record, ttl: parseTTL(record.ttl) }
		return updateRecord({ ...credentials, ...parsed })
	},

	async deleteEntry(record) {
		const credentials = await CredentialManager.load()
		return deleteRecord({ ...credentials, id: record.id })
	}
}
