import { $, create } from '../../utils/dom.js'
import { RecordStore } from '../../models/record-store/record-store.js'
import { renderTable } from './table-renderer.js'

const READONLY_KEY = 'cloudflarednsmanager_readonly'

let showReadOnly = localStorage.getItem(READONLY_KEY) === 'true'

const readOnlyToggle = $('#read-only-toggle')
readOnlyToggle.onclick = () => toggleShowReadOnly(showReadOnly = !showReadOnly)

const toggleShowReadOnly = (state) => {
	readOnlyToggle.textContent = state ? 'Hide Read-Only' : 'Show Read-Only'
	readOnlyToggle.prepend(create('i', state ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'))

	localStorage.setItem(READONLY_KEY, state)

	RecordStore.setShowReadOnly(state)
	renderTable(RecordStore.list())
}
document.addEventListener('DOMContentLoaded', () => toggleShowReadOnly(showReadOnly))
