import { PROXY_URL } from './entrypoint.js'

/**
 * Update an existing DNS record
 * @param {Object} params
 * @param {string} params.apiToken
 * @param {string} params.zoneId
 * @param {string} params.id
 * @param {string} params.type
 * @param {string} params.name
 * @param {string} params.content
 * @param {number} [params.ttl]
 * @param {boolean} [params.proxied]
 * @param {number} [params.priority]
 * @param {string} [params.comment]
 * @returns {Promise<Object>}
 */
export async function updateRecord({ apiToken, zoneId, id, ...record }) {
	const payload = Object.fromEntries(
		Object.entries({
			type: record.type,
			name: record.name,
			content: record.content,
			ttl: record.ttl ?? 1,
			proxied: record.proxied ?? false,
			priority: record.priority ?? null,
			comment: record.comment ?? null
		}).filter(([_, v]) => v !== null)
	)

	const response = await fetch(PROXY_URL + encodeURIComponent(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records/${id}`), {
		method: 'PUT',
		headers: {
			Authorization: `Bearer ${apiToken}`,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})

	const data = await response.json()

	if (!response.ok || !data.success) {
		throw new Error(data.errors?.[0]?.message || 'Failed to update DNS record')
	}

	return data.result
}
