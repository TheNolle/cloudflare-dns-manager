import { $, create } from '../../utils/dom.js'
import { createInputElement } from './form-utils.js'
import { Cloudflare } from '../../api.js'
import { RecordStore } from '../../models/record-store/record-store.js'
import { renderTable } from '../table/table-renderer.js'
import { parseInput, normalizeRecord } from '../../utils/normalization.js'

export const renderFields = (fieldsConfig, fieldset, data) => {
	const fields = create('div', 'form-fields')
	fieldset.appendChild(fields)

	/** @type {HTMLInputElement[]} */
	const inputs = []

	for (const field of fieldsConfig) {
		const wrapper = create('div', 'form-field')
		fields.appendChild(wrapper)

		const label = create('label')
		label.textContent = field.label
		label.htmlFor = field.name
		label.title = field.placeholder || field.label
		wrapper.appendChild(label)

		const input = createInputElement(field, data)
		input.name = field.name
		inputs.push(input)
		wrapper.appendChild(input)
	}

	if (!data) {
		const add = create('button')
		add.textContent = 'Add'
		add.onclick = async (event) => {
			event.preventDefault()

			let record = Object.fromEntries(inputs.filter(input => input.required || input.value).map(input => [input.name, parseInput(input)]))
			record.type = $('#record-type')?.value.toUpperCase()
			record = normalizeRecord(record)

			add.disabled = true
			add.textContent = 'Adding...'

			try {
				await Cloudflare.newEntry(record)
				renderTable(RecordStore.list())
				window.toast.success('DNS record added successfully')
			} catch (error) {
				console.error('Error adding DNS record:', error)
				window.toast.error('Failed to add DNS record')
			} finally {
				add.disabled = false
				add.textContent = 'Add'
			}
		}
		fieldset.appendChild(add)
	}
}
