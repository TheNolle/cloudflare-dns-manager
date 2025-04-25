import { BaseRecord } from './_base.js'

export class RecordPTR extends BaseRecord {
	constructor(raw) {
		super({ ...raw, content: raw.domainName ?? raw.content })
	}

	static mapEditableFields(raw) {
		return { ...raw, domainName: raw.content }
	}
}
