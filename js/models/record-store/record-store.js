import { getFilteredRecords, applyFilters, loadRecordsToState, updateRecordInState, addRecordToState, deleteRecordFromState } from './state.js'
import { setTypeFilter, setSearchQuery, setShowReadOnly } from './filters.js'

export class RecordStore {
	static load(rawRecords) {
		loadRecordsToState(rawRecords)
		applyFilters()
	}

	static list() {
		return getFilteredRecords()
	}

	static setFilterType(type) {
		setTypeFilter(type)
		applyFilters()
	}

	static setSearchQuery(query) {
		setSearchQuery(query)
		applyFilters()
	}

	static paginate(page = 1, size = 5) {
		const all = getFilteredRecords()
		return all.slice((page - 1) * size, page * size)
	}

	static add(record) {
		addRecordToState(record)
		applyFilters()
	}

	static update(updated) {
		updateRecordInState(updated)
		applyFilters()
	}

	static delete(id) {
		deleteRecordFromState(id)
		applyFilters()
	}

	static setShowReadOnly(show) {
		setShowReadOnly(show)
		applyFilters()
	}
}
