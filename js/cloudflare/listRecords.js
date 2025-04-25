import { PROXY_URL } from './entrypoint.js'

/**
 * List DNS records
 * @param {Object} params
 * @param {string} params.apiToken
 * @param {string} params.zoneId
 * @returns {Promise<Array>}
 */
export async function listRecords({ apiToken, zoneId }) {
	const response = await fetch(PROXY_URL + encodeURIComponent(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`), {
		headers: {
			Authorization: `Bearer ${apiToken}`,
			'Content-Type': 'application/json'
		}
	})

	const data = await response.json()

	if (!response.ok || !data.success) {
		throw new Error(data.errors?.[0]?.message || 'Failed to list DNS records')
	}

	return data.result
}
