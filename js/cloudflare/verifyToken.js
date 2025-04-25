import { PROXY_URL } from './entrypoint.js'

/**
 * Verify Cloudflare API token
 * @param {string} apiToken
 * @returns {Promise<Object>}
 */
export async function verifyToken(apiToken) {
	const response = await fetch(PROXY_URL + encodeURIComponent('https://api.cloudflare.com/client/v4/user/tokens/verify'), {
		headers: {
			Authorization: `Bearer ${apiToken}`,
			'Content-Type': 'application/json'
		}
	})

	const data = await response.json()

	if (!response.ok || !data.success) {
		throw new Error(data.errors?.[0]?.message || 'Failed to verify API token')
	}

	return data.result
}
