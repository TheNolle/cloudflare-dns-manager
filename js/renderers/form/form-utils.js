import { create } from '../../utils/dom.js'

export const createInputElement = (field, data) => {
	let input
	switch (field.type) {
		case 'textarea':
			input = create('textarea')
			break
		case 'select':
			input = create('select')
			for (const value of field.options || []) {
				const option = create('option')
				option.value = value
				option.textContent = value
				input.appendChild(option)
			}
			break
		case 'checkbox':
			input = create('input')
			input.type = 'checkbox'
			break
		default:
			input = create('input')
			input.type = field.type
	}

	input.id = field.name
	input.name = field.name
	input.required = field.required ?? false
	input.placeholder = field.placeholder || getPlaceholder(field)

	if ('min' in field) input.min = field.min
	if ('max' in field) input.max = field.max
	if ('default' in field) input.value = field.default

	if (data) {
		if (field.type === 'checkbox') input.checked = !!data[field.name]
		else if (data[field.name] != null) input.value = data[field.name]
	}

	return input
}

const getPlaceholder = (field) =>
	field.type === 'number' && ('min' in field || 'max' in field)
		? `${field.min ?? ''}${'max' in field ? ` - ${field.max}` : ''}`
		: ''
