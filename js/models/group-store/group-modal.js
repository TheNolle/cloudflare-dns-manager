import { create, $ } from '../../utils/dom.js'
import { renderGroupModalUI } from './group-modal-ui.js'

/**
 * Opens the modal to manage the group for a given record
 * @param {DNSRecord} record - The DNS record to manage
 * @param {Group|null} currentGroup - The group the record is currently in (if any)
 */
export const openGroupModal = (record, currentGroup) => {
	closeGroupModal()

	const escapeListener = (event) => { if (event.key === 'Escape') closeGroupModal() }

	const overlay = create('div', 'modal-overlay open')
	overlay.tabIndex = -1
	overlay.addEventListener('click', (event) => { if (event.target === overlay) closeGroupModal() })
	overlay.dataset.cleanup = 'true'
	overlay._escapeListener = escapeListener
	window.addEventListener('keydown', escapeListener)
	document.body.appendChild(overlay)

	const modalContent = renderGroupModalUI(record, currentGroup)
	overlay.appendChild(modalContent)
}

/**
 * Closes the modal and removes listeners
 */
export const closeGroupModal = () => {
	const overlay = $('.modal-overlay')
	if (!overlay) return

	const escapeListener = overlay._escapeListener
	if (escapeListener) window.removeEventListener('keydown', escapeListener)

	overlay.remove()
}
