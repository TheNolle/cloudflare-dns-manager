const UNITS = [
	['1min', 60],
	['2min', 120],
	['5min', 300],
	['10min', 600],
	['30min', 1800],
	['1h', 3600],
	['2h', 7200],
	['5h', 18000],
	['12h', 43200],
	['1d', 86400],
]

/**
 * Converts a human-readable TTL to a number in seconds
 * @param {string|number} ttl
 * @returns {number}
 */
export const parseTTL = (ttl) => {
	if (typeof ttl === 'number') return ttl
	if (ttl === 'Auto') return 1

	const match = String(ttl).toLowerCase().match(/^(\d+)(min|h|d)$/)
	if (!match) throw new Error(`Invalid TTL format: ${ttl}`)

	const [, amount, unit] = match
	const multiplier = unit === 'min' ? 60 : unit === 'h' ? 3600 : 86400
	return Number(amount) * multiplier
}

/**
 * Converts a TTL number (in seconds) to a display label
 * @param {number} ttl
 * @returns {string}
 */
export const formatTTL = (ttl) => {
	if (ttl === 1) return 'Auto'
	for (const [label, seconds] of UNITS) {
		if (ttl === seconds) return label
	}
	return `${ttl}s`
}
