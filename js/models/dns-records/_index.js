import { RecordA } from './A.js'
import { RecordAAAA } from './AAAA.js'
import { RecordCNAME } from './CNAME.js'
import { RecordMX } from './MX.js'
import { RecordPTR } from './PTR.js'
import { RecordSRV } from './SRV.js'

export const RecordTypes = {
	A: RecordA,
	AAAA: RecordAAAA,
	CNAME: RecordCNAME,
	MX: RecordMX,
	PTR: RecordPTR,
	SRV: RecordSRV,
}

export const getRecordClass = (type) => RecordTypes[type.toUpperCase()] || null
