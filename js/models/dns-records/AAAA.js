import { BaseRecord } from './_base.js'

export class RecordAAAA extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.ipv6Address ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, ipv6Address: raw.content }
	}
}
