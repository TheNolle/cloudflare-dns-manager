import { renderForm } from './renderers/form/form-renderer.js'
import { renderTable } from './renderers/table/table-renderer.js'
import { RecordStore } from './models/record-store/record-store.js'
import { GroupManager } from './models/group-store/group-store.js'
import { Cloudflare } from './api.js'
import { Toast } from '../assets/libs/toast.js'
import { CredentialManager } from './models/credential-manager.js'
import { openCredentialsModal } from './renderers/credential-modal.js'
import formConfig from './form-config.js'


window.addEventListener('DOMContentLoaded', async () => {
	// Init Toasts
	window.toast = new Toast({ position: 'bottom-right', showCloseButton: false })

	// Check if credentials are set
	const credentials = await CredentialManager.load()
	if (!credentials || !(await CredentialManager.validate(credentials))) return openCredentialsModal()

	// Check if credentials are valid
	if (credentials && !(await CredentialManager.validate(credentials))) {
		window.toast.error('Invalid credentials, please re-enter your API token and zone ID.')
		return openCredentialsModal()
	}

	// Credentials are valid
	window.dispatchEvent(new Event('credentialsReady'))
})

window.addEventListener('credentialsReady', async () => {
	// Load initial data
	const initialData = await Cloudflare.getAll()

	// Init GroupManager
	GroupManager.load()

	// Get Elements
	const typeSelector = document.getElementById('record-type')
	const filterType = document.getElementById('filter-type')
	const searchBar = document.getElementById('search-bar')

	// Init RecordStore
	RecordStore.load(initialData)

	// Populate selectors
	Object.keys(formConfig).forEach((type) => {
		const option1 = new Option(type, type)
		const option2 = option1.cloneNode(true)
		typeSelector.appendChild(option1)
		filterType.appendChild(option2)
	})

	// Render default form
	renderForm(typeSelector.value || 'A')

	// Bind change events
	typeSelector.addEventListener('change', () => {
		renderForm(typeSelector.value)
	})

	filterType.addEventListener('change', () => {
		RecordStore.setFilterType(filterType.value)
		renderTable(RecordStore.list())
	})

	searchBar.addEventListener('input', () => {
		RecordStore.setSearchQuery(searchBar.value)
		renderTable(RecordStore.list())
	})

	// Initial render
	renderTable(RecordStore.list())

	// Toast
	window.toast.success('Application loaded successfully!')
})
