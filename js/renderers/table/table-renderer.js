import { clear, $ } from '../../utils/dom.js'
import { renderPagination } from './pagination.js'
import { renderRows } from './row-renderer.js'
import { GroupManager } from '../../models/group-store/group-store.js'
import { RecordStore } from '../../models/record-store/record-store.js'
import './read-only.js'

const MAXENTRIES_KEY = 'cloudflarednsmanager_maxentries'
const entriesSelect = $('#entries-per-page')
if (entriesSelect) entriesSelect.value = localStorage.getItem(MAXENTRIES_KEY) || 10
let PAGE_SIZE = entriesSelect ? parseInt(entriesSelect.value) : 10

entriesSelect.addEventListener('change', (event) => {
	event.preventDefault()
	if (!entriesSelect) return
	const value = entriesSelect.value === 'all' ? Number.MAX_SAFE_INTEGER : parseInt(entriesSelect.value)
	if (isNaN(value)) return
	PAGE_SIZE = value
	localStorage.setItem(MAXENTRIES_KEY, PAGE_SIZE)
	renderTable(RecordStore.list())
})

/**
 * Render the DNS records table and pagination
 */
export const renderTable = (records, page = 1) => {
	const table = document.getElementById('dns-table')
	const pagination = document.getElementById('pagination-controls')

	clear(table)
	clear(pagination)

	const ordered = getOrderedRecords(records)

	const totalPages = Math.ceil(ordered.length / PAGE_SIZE)
	const currentPage = Math.min(page, totalPages)

	const paginated = ordered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

	renderPagination(totalPages, currentPage, records)
	renderRows(paginated, currentPage, table)
}

/**
 * Build the ordered list: group header → children → loose entries
 */
const getOrderedRecords = (records) => {
	const groups = new Map()
	const ungrouped = []

	for (const record of records) {
		const group = GroupManager.list().find(group => group.hasRecord(record.id))
		if (group) {
			if (!groups.has(group.id)) groups.set(group.id, { group, records: [] })
			groups.get(group.id).records.push(record)
		} else {
			ungrouped.push(record)
		}
	}

	const result = []
	for (const { group, records } of groups.values()) {
		result.push({ __group: group })
		result.push(...records)
	}
	result.push(...ungrouped)

	return result
}
