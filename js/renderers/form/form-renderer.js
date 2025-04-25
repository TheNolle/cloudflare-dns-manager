import { renderDescription } from './form-description.js'
import { renderFields } from './form-fields.js'
import recordTypes from '../../form-config.js'
import { create } from '../../utils/dom.js'


/**
 * Renders the form fields for a given record type
 * @param {string} type - The record type (e.g., 'A', 'AAAA', 'CNAME', etc.)
 * @param {HTMLElement} [container=document.getElementById('form-fields')] - The container element to render the form fields into
 * @param {Object|null} [data=null] - The data to populate the form fields with
 */
export const renderForm = (type, container = document.getElementById('form-fields'), data = null) => {
	container.innerHTML = ''
	const config = recordTypes[type?.toUpperCase()]
	if (!config) return

	const fieldset = create('fieldset')
	container.appendChild(fieldset)

	if (!data) renderDescription(type, config, fieldset)
	renderFields(config.fields, fieldset, data)
}
