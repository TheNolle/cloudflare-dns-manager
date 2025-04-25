import { PROXY_URL } from './entrypoint.js'

/**
 * Delete a DNS record
 * @param {Object} params
 * @param {string} params.apiToken
 * @param {string} params.zoneId
 * @param {string} params.id
 * @returns {Promise<Object>}
 */
export async function deleteRecord({ apiToken, zoneId, id }) {
	const response = await fetch(PROXY_URL + encodeURIComponent(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${id}`), {
		method: 'DELETE',
		headers: {
			Authorization: `Bearer ${apiToken}`,
			'Content-Type': 'application/json'
		}
	})

	const data = await response.json()

	if (!response.ok || !data.success) {
		throw new Error(data.errors?.[0]?.message || 'Failed to delete DNS record')
	}

	return { success: true }
}
