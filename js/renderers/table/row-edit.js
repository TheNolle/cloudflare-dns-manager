import { createDataRow } from './row-data.js'
import { createEditRow } from './row-edit-form.js'
import { setupRowActions } from './row-actions.js'

/**
 * Combines data and edit rows for a given record
 */
export const createRowWithEdit = (record) => {
	const dataRow = createDataRow(record)
	const editRow = createEditRow(record, dataRow)

	setupRowActions(record, dataRow, editRow)

	return { dataRow, editRow }
}
