import { DNSRecord } from '../dns-record.js'
import { matchesFilter } from './filters.js'

let all = []
let filtered = []

export const loadRecordsToState = (rawRecords) => {
	all = rawRecords.map(DNSRecord.from)
}

export const getFilteredRecords = () => filtered

export const applyFilters = () => {
	filtered = all.filter(matchesFilter)
}

export const addRecordToState = (record) => {
	all.push(record)
}

export const updateRecordInState = (updated) => {
	const index = all.findIndex(r => r.id === updated.id)
	if (index !== -1) all[index] = updated
}

export const deleteRecordFromState = (id) => {
	all = all.filter(r => r.id !== id)
	applyFilters()
}
