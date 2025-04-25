import { create } from '../../utils/dom.js'
import { renderForm } from '../form/form-renderer.js'
import { renderTable } from './table-renderer.js'
import { DNSRecord } from '../../models/dns-record.js'
import { RecordStore } from '../../models/record-store/record-store.js'
import { GroupManager } from '../../models/group-store/group-store.js'
import { isReadOnly } from '../../models/record-store/filters.js'
import { parseInput, normalizeRecord } from '../../utils/normalization.js'
import { Cloudflare } from '../../api.js'

/**
 * Sets up edit/delete/save/cancel actions
 */
export const setupRowActions = (record, dataRow, editRow) => {
	const formContainer = editRow.querySelector('.edit-form')
	const controls = editRow.querySelector('.edit-controls')

	const deleteButton = create('button', 'delete-button')
	deleteButton.appendChild(create('i', 'fa-solid fa-trash'))
	deleteButton.onclick = async (event) => {
		event.preventDefault()

		if (confirm('Are you sure you want to delete this record?')) {
			deleteButton.disabled = true
			deleteButton.textContent = 'Deleting...'

			try {
				await Cloudflare.deleteEntry(record)
				RecordStore.load(await Cloudflare.getAll())
				renderTable(RecordStore.list())
				return window.toast.success('Record deleted successfully')
			} catch (error) {
				console.error('Error deleting record:', error)
				window.toast.error('Failed to delete record')
			} finally {
				deleteButton.disabled = false
				deleteButton.textContent = ''
				deleteButton.appendChild(create('i', 'fa-solid fa-trash'))
			}
		}
	}
	controls.appendChild(deleteButton)

	const cancelButton = create('button', 'cancel-button')
	cancelButton.appendChild(create('i', 'fa-solid fa-xmark'))
	cancelButton.onclick = () => {
		editRow.hidden = true
		formContainer.innerHTML = ''
	}
	controls.appendChild(cancelButton)

	const saveButton = create('button', 'save-button')
	saveButton.appendChild(create('i', 'fa-solid fa-check'))
	saveButton.onclick = async (event) => {
		event.preventDefault()

		const inputs = Array.from(formContainer.querySelectorAll('input, select, textarea'))

		let normalized = Object.fromEntries(inputs.filter(input => input.required || input.value).map(input => [input.name, parseInput(input)]))
		normalized.id = record.id
		normalized.type = record.type.toUpperCase()
		normalized = normalizeRecord(normalized)

		saveButton.disabled = true
		saveButton.textContent = 'Saving...'

		try {
			await Cloudflare.updateEntry(normalized)
			RecordStore.load(await Cloudflare.getAll())
			renderTable(RecordStore.list())
			return window.toast.success('Record updated successfully')
		} catch (error) {
			console.error('Error updating record:', error)
			window.toast.error('Failed to update record')
		} finally {
			saveButton.disabled = false
			saveButton.textContent = ''
			saveButton.appendChild(create('i', 'fa-solid fa-check'))
		}
	}
	controls.appendChild(saveButton)

	const editButton = create('button', 'edit-button')
	if (isReadOnly(record)) {
		editButton.textContent = 'Read-Only'
		editButton.disabled = true
		const readOnlyIcon = create('i', 'fa-solid fa-lock')
		editButton.appendChild(readOnlyIcon)
	} else {
		editButton.textContent = 'Edit'
		const editIcon = create('i', 'fa-solid fa-pen-to-square')
		editButton.appendChild(editIcon)
	}
	dataRow.querySelector('.actions').appendChild(editButton)

	editButton.onclick = () => {
		const wasVisible = !editRow.hidden
		editRow.hidden = wasVisible
		if (!wasVisible) {
			renderForm(record.type, formContainer, DNSRecord.mapEditableFields(record))
		} else {
			formContainer.innerHTML = ''
		}

		if (GroupManager.isLastInGroup(record.id)) {
			if (!wasVisible) {
				editRow.classList.add('group-end')
				dataRow.classList.remove('group-end')
			} else {
				dataRow.classList.add('group-end')
				editRow.classList.remove('group-end')
			}
		}
	}
}
