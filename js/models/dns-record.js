import { getRecordClass } from './dns-records/_index.js'

/**
 * @typedef {Object} DNSRecordRaw
 * @property {string} id
 * @property {string} type
 * @property {string} name
 * @property {string} content
 * @property {string} [comment]
 * @property {string} [ttl]
 * @property {number|null} [priority]
 * @property {boolean} [proxied]
 * @property {string} date
 * @property {Object} [meta]
 */

export class DNSRecord {
	/**
	 * @param {DNSRecordRaw} raw
	 * @returns {RecordClass}
	 */
	static from(raw) {
		const RecordClass = getRecordClass(raw.type)
		return RecordClass ? RecordClass.fromRaw(raw) : new DNSRecord(raw)
	}

	/**
	 * @param {DNSRecordRaw} raw
	 */
	constructor(raw) {
		this.id = raw.id
		this.type = raw.type
		this.name = raw.name
		this.comment = raw.comment ?? ''
		this.ttl = raw.ttl ?? 'Auto'
		this.priority = raw.priority ?? null
		this.proxied = raw.proxied ?? false
		this.date = raw.created_on ?? new Date().toISOString()
		this.content = raw.content
		this.meta = raw.meta ?? {}
	}

	toObject() {
		const RecordClass = getRecordClass(this.type)
		return RecordClass ? RecordClass.toRaw(this) : { ...this }
	}

	static mapEditableFields(record) {
		const RecordClass = getRecordClass(record.type)
		return RecordClass?.mapEditableFields(record) ?? { ...record }
	}
}
