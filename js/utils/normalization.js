import { getRecordClass } from '../models/dns-records/_index.js'

/**
 * Parses individual input values by type
 */
export const parseInput = (input) => {
	if (input.type === 'checkbox') return input.checked
	if (input.type === 'number') return Number(input.value)
	return input.value
}

/**
 * Normalizes a raw form object to Cloudflare-compatible format
 * @param {Object} record
 * @returns {Object}
 */
export const normalizeRecord = (record) => {
	const RecordClass = getRecordClass(record.type)
	if (!RecordClass) return record

	const instance = new RecordClass(record)
	return RecordClass.toRaw(instance)
}
