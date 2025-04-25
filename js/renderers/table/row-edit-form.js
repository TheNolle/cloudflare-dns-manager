import { create } from '../../utils/dom.js'

/**
 * Creates the hidden edit form row
 */
export const createEditRow = (record, dataRow) => {
	const editRow = create('tr', 'edit-row')
	editRow.dataset.id = record.id
	editRow.hidden = true

	const spanCell = create('td')
	spanCell.colSpan = dataRow.children.length
	editRow.appendChild(spanCell)

	const formContainer = create('div', 'edit-form')
	spanCell.appendChild(formContainer)

	const controls = create('div', 'edit-controls')
	spanCell.appendChild(controls)

	return editRow
}
