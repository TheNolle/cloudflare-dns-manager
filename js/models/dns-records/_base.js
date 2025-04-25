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
 */

export class BaseRecord {
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
		this.content = BaseRecord.resolveContent(raw)
		this.meta = raw.meta ?? []
	}

	/**
	 * @param {DNSRecordRaw} raw
	 */
	static resolveContent(raw) {
		return raw.content
	}

	/**
	 * @param {DNSRecordRaw} raw
	 */
	static fromRaw(raw) {
		return new this(raw)
	}

	/**
	 * @returns {DNSRecordRaw}
	 */
	static toRaw(instance) {
		return {
			id: instance.id,
			type: instance.type,
			name: instance.name,
			comment: instance.comment,
			ttl: instance.ttl,
			priority: instance.priority,
			proxied: instance.proxied,
			date: instance.date,
			content: instance.content,
			meta: instance.meta,
		}
	}


	/**
	 * @param {DNSRecordRaw} raw
	 */
	static mapEditableFields(raw) {
		return { ...raw }
	}
}
