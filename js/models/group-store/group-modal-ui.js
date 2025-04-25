import { create } from '../../utils/dom.js'
import { GroupManager } from './group-store.js'
import { closeGroupModal } from './group-modal.js'
import { renderTable } from '../../renderers/table/table-renderer.js'
import { RecordStore } from '../record-store/record-store.js'

/**
 * Renders the full modal UI to manage group assignment
 */
export const renderGroupModalUI = (record, currentGroup) => {
	const wrapper = create('div', 'modal')

	// Title
	const title = create('h2')
	title.textContent = currentGroup
		? `Manage Group: ${currentGroup.label}`
		: 'Add to Group'
	wrapper.appendChild(title)

	// Group selection
	const groupList = create('div', 'list')

	const groups = GroupManager.list()

	for (const group of groups) {
		const button = create('button')
		button.textContent = group.label

		if (group.id === currentGroup?.id) {
			button.classList.add('current')
			button.textContent += ' (current)'
			button.disabled = true
		} else {
			button.onclick = () => {
				if (currentGroup) currentGroup.removeRecord(record.id)
				group.addRecord(record.id)
				GroupManager.save()
				closeGroupModal()
				renderTable(RecordStore.list())
			}
		}

		groupList.appendChild(button)
	}
	wrapper.appendChild(groupList)

	// Divider
	const hr = create('hr')
	wrapper.appendChild(hr)

	// Create group section
	const createGroupTitle = create('h3')
	createGroupTitle.textContent = 'Create new group'
	wrapper.appendChild(createGroupTitle)

	const form = create('form')

	const nameInput = create('input')
	nameInput.type = 'text'
	nameInput.placeholder = 'Group label'
	form.appendChild(nameInput)

	const iconInput = create('input')
	iconInput.type = 'text'
	iconInput.placeholder = 'Optional icon class (e.g. fa-solid fa-cube)'
	form.appendChild(iconInput)

	const colorInput = create('input')
	colorInput.type = 'color'
	colorInput.value = '#bfa2d6'
	form.appendChild(colorInput)

	const descInput = create('textarea')
	descInput.placeholder = 'Optional group description...'
	form.appendChild(descInput)

	const createButton = create('button')
	createButton.type = 'submit'
	createButton.textContent = 'Create & Assign'
	form.appendChild(createButton)

	form.onsubmit = (event) => {
		event.preventDefault()
		const label = nameInput.value.trim()
		if (!label) return window.toast.error('Label required')

		const newGroup = GroupManager.create(label, {
			icon: iconInput.value.trim() || null,
			color: colorInput.value || null,
			description: descInput.value.trim() || null
		})
		if (currentGroup) currentGroup.removeRecord(record.id)
		newGroup.addRecord(record.id)
		GroupManager.save()
		closeGroupModal()
		renderTable(RecordStore.list())
	}

	wrapper.appendChild(form)

	// Remove from current group
	if (currentGroup) {
		const removeBtn = create('button', 'remove')
		removeBtn.textContent = 'Remove from Group'

		removeBtn.onclick = () => {
			currentGroup.removeRecord(record.id)

			if (currentGroup.recordIds.size === 0) {
				GroupManager.delete(currentGroup.id)
			}

			GroupManager.save()
			closeGroupModal()
			renderTable(RecordStore.list())
		}

		wrapper.appendChild(removeBtn)
	}

	// Cancel
	const cancel = create('button')
	cancel.textContent = 'Cancel'
	cancel.onclick = closeGroupModal
	wrapper.appendChild(cancel)

	return wrapper
}
