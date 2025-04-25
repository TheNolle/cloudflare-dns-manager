import { BaseRecord } from './_base.js'

export class RecordSRV extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.target ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, target: raw.content }
	}
}
