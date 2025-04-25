import { BaseRecord } from './_base.js'

export class RecordMX extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.mailServer ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, mailServer: raw.content }
	}
}
