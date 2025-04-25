import { create, $ } from '../../utils/dom.js'
import { GroupManager } from './group-store.js'
import { renderTable } from '../../renderers/table/table-renderer.js'
import { RecordStore } from '../record-store/record-store.js'

export const openEditGroupModal = (group) => {
	closeEditGroupModal()

	const overlay = create('div', 'modal-overlay open')
	overlay.dataset.type = 'edit-group'
	overlay.tabIndex = -1
	overlay.addEventListener('click', (event) => {
		if (event.target === overlay) closeEditGroupModal()
	})
	document.body.appendChild(overlay)

	const modal = create('div', 'modal')
	overlay.appendChild(modal)

	const title = create('h2')
	title.textContent = 'Edit Group'
	modal.appendChild(title)

	const form = create('form')
	form.onsubmit = (event) => {
		event.preventDefault()
		group.label = label.value.trim()
		group.icon = icon.value.trim() || null
		group.color = color.value || null
		group.description = description.value.trim() || null
		GroupManager.save()
		closeEditGroupModal()
		renderTable(RecordStore.list())
	}
	modal.appendChild(form)

	const label = create('input')
	label.type = 'text'
	label.placeholder = 'Group label'
	label.value = group.label
	form.appendChild(label)

	const icon = create('input')
	icon.type = 'text'
	icon.placeholder = 'Icon class (e.g. fa-solid fa-cube)'
	icon.value = group.icon || ''
	form.appendChild(icon)

	const color = create('input')
	color.type = 'color'
	color.value = group.color || '#bfa2d6'
	form.appendChild(color)

	const description = create('textarea')
	description.placeholder = 'Description'
	description.value = group.description || ''
	form.appendChild(description)

	const save = create('button')
	save.type = 'submit'
	save.textContent = 'Save'
	form.appendChild(save)

	const cancel = create('button')
	cancel.textContent = 'Cancel'
	cancel.onclick = (event) => {
		event.preventDefault()
		closeEditGroupModal()
	}
	form.appendChild(cancel)

	const deleteButton = create('button')
	deleteButton.textContent = 'Delete Group'
	deleteButton.classList.add('delete')
	deleteButton.onclick = (event) => {
		event.preventDefault()
		if (confirm('Are you sure you want to delete this group?')) {
			GroupManager.delete(group.id)
			GroupManager.save()
			closeEditGroupModal()
			renderTable(RecordStore.list())
		}
	}
	modal.appendChild(deleteButton)
}

export const closeEditGroupModal = () => {
	const overlay = $(`div.modal-overlay.open[data-type='edit-group']`)
	if (overlay) overlay.remove()
}
