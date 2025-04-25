import { BaseRecord } from './_base.js'

export class RecordA extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.ipv4Address ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, ipv4Address: raw.content }
	}
}
