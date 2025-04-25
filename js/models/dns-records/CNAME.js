import { BaseRecord } from './_base.js'

export class RecordCNAME extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.target ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, target: raw.content }
	}
}
