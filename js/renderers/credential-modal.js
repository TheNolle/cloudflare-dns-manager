import { create } from '../utils/dom.js'
import { CredentialManager } from '../models/credential-manager.js'

export const openCredentialsModal = () => {
	closeCredentialsModal()

	const overlay = create('div', 'modal-overlay open')
	overlay.dataset.type = 'credentials'
	overlay.tabIndex = -1
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) closeCredentialsModal()
	})
	document.body.appendChild(overlay)

	const modal = create('div', 'modal')
	overlay.appendChild(modal)

	const title = create('h2')
	title.textContent = 'Enter your Cloudflare API'
	modal.appendChild(title)

	const form = create('form')
	form.onsubmit = (event) => {
		event.preventDefault()
	}
	modal.appendChild(form)

	const apiTokenLabel = create('label')
	apiTokenLabel.textContent = 'API Token'
	apiTokenLabel.for = 'api-token'
	form.appendChild(apiTokenLabel)

	const apiTokenInput = create('input')
	apiTokenInput.id = 'api-token'
	apiTokenInput.type = 'text'
	apiTokenInput.placeholder = 'Enter your API Token'
	apiTokenInput.required = true
	apiTokenInput.autocomplete = 'off'
	apiTokenInput.autocorrect = 'off'
	apiTokenInput.autocapitalize = 'off'
	apiTokenInput.spellcheck = false
	apiTokenLabel.appendChild(apiTokenInput)

	const zoneIdLabel = create('label')
	zoneIdLabel.textContent = 'Zone ID'
	zoneIdLabel.for = 'zone-id'
	form.appendChild(zoneIdLabel)

	const zoneIdInput = create('input')
	zoneIdInput.id = 'zone-id'
	zoneIdInput.type = 'text'
	zoneIdInput.placeholder = 'Enter your Zone ID'
	zoneIdInput.required = true
	zoneIdInput.autocomplete = 'off'
	zoneIdInput.autocorrect = 'off'
	zoneIdInput.autocapitalize = 'off'
	zoneIdInput.spellcheck = false
	zoneIdLabel.appendChild(zoneIdInput)

	let validCredentials = false

	const validateButton = create('button')
	validateButton.type = 'button'
	validateButton.textContent = 'Validate'
	validateButton.onclick = async () => {
		const apiToken = apiTokenInput.value
		const zoneId = zoneIdInput.value

		if (!apiToken || !zoneId) {
			window.toast.error('Please fill in all fields')
			return
		}

		const isValid = await CredentialManager.validate({ apiToken, zoneId })
		if (isValid) {
			window.toast.success('Credentials are valid')
			validCredentials = true
		}
	}
	modal.appendChild(validateButton)

	const saveButton = create('button')
	saveButton.type = 'submit'
	saveButton.textContent = 'Save'
	saveButton.onclick = () => {
		validateButton.click()
		if (!validCredentials) {
			window.toast.error('Please validate your credentials before saving.')
			return
		}
		const apiToken = apiTokenInput.value
		const zoneId = zoneIdInput.value
		CredentialManager.save({ apiToken, zoneId })
		window.toast.success('Credentials saved successfully')
		closeCredentialsModal()
		window.dispatchEvent(new Event('credentialsReady'))
	}
	modal.appendChild(saveButton)

	const clearButton = create('button')
	clearButton.type = 'button'
	clearButton.textContent = 'Clear'
	clearButton.onclick = () => {
		CredentialManager.clear()
		location.reload()
	}
	modal.appendChild(clearButton)
}

export const closeCredentialsModal = () => {
	const overlay = document.querySelector(`div.modal-overlay.open[data-type='credentials']`)
	if (overlay) overlay.remove()
}
