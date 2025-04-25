let filterType = null
let searchQuery = null
let showReadOnly = false

export const setTypeFilter = (type) => {
	filterType = type || null
}

export const setSearchQuery = (query) => {
	searchQuery = query?.trim().toLowerCase() || null
}

export const setShowReadOnly = (show) => {
	showReadOnly = show
}

export const matchesFilter = (record) => {
	if (!showReadOnly && record.meta?.read_only) return false

	const matchType = !filterType || record.type === filterType
	if (!searchQuery || searchQuery.length < 1) return matchType

	const safe = (value) => value?.toString().toLowerCase() || ''
	const query = searchQuery
	const target = safe(query.slice(1))

	let match = false
	switch (query[0]) {
		case '@': match = record.name?.toLowerCase().includes(target); break
		case '#': match = record.comment?.toLowerCase().includes(target); break
		case '-': match = record.content?.toLowerCase().includes(target); break
		default: match = [record.name, record.comment, record.content].some(field => safe(field).includes(query)); break
	}

	return matchType && match
}

export const isReadOnly = (record) => !!record.meta?.read_only
