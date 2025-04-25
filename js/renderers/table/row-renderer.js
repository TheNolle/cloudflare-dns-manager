import { createRowWithEdit } from './row-edit.js'
import { create } from '../../utils/dom.js'
import { GroupManager } from '../../models/group-store/group-store.js'
import { openEditGroupModal } from '../../models/group-store/group-edit-modal.js'

/**
 * Renders the table body correctly: groups first, then ungrouped
 */
export const renderRows = (records, page, table) => {
	table.innerHTML = ''

	const thead = create('thead')
	const headerRow = create('tr')
		;['Date', 'Type', 'Name', 'Content', 'Proxy', 'TTL', 'Actions'].forEach((label) => {
			const th = create('th')
			if (label === 'Actions') th.classList.add('actions')
			th.textContent = label
			headerRow.appendChild(th)
		})
	thead.appendChild(headerRow)
	table.appendChild(thead)

	const tbody = create('tbody')
	table.appendChild(tbody)

	const groupedRecords = new Map()
	for (const record of records) {
		if ('__group' in record) continue
		const group = GroupManager.list().find(group => group.hasRecord(record.id))
		const groupId = group?.id ?? null
		if (!groupedRecords.has(groupId)) groupedRecords.set(groupId, [])
		groupedRecords.get(groupId).push(record)
	}

	for (const [groupId, groupRecords] of groupedRecords.entries()) {
		if (groupId !== null) {
			const group = GroupManager.get(groupId)

			const groupRow = create('tr', 'group-header')
			groupRow.onclick = () => {
				GroupManager.toggle(group.id)
				GroupManager.save()
				renderRows(records, page, table)
			}
			tbody.appendChild(groupRow)

			const groupCell = create('td')
			groupCell.colSpan = 7
			groupRow.appendChild(groupCell)

			const groupContent = create('div', 'group-content')
			groupCell.appendChild(groupContent)

			if (group.color) {
				const color = create('span', 'group-color')
				color.style.backgroundColor = group.color
				groupContent.appendChild(color)
			}

			const title = create('h2')
			if (group.icon) {
				const icon = create('i', group.icon)
				title.appendChild(icon)
			}
			title.appendChild(document.createTextNode(group.label))
			groupContent.appendChild(title)

			if (group.description) {
				const description = create('p')
				description.textContent = group.description
				groupContent.appendChild(description)
			}

			const actions = create('div', 'group-actions')
			groupCell.appendChild(actions)

			const editButton = create('button', 'edit')
			editButton.textContent = 'Edit'
			editButton.onclick = (event) => {
				event.stopPropagation()
				event.preventDefault()
				openEditGroupModal(group)
			}
			actions.appendChild(editButton)

			const editIcon = create('i', 'fa-solid fa-pen-to-square')
			editButton.appendChild(editIcon)
		}

		const isGroupOpen = GroupManager.isOpen(groupId)

		for (const record of groupRecords) {
			const { dataRow, editRow } = createRowWithEdit(record)
			if (groupId !== null) {
				if (!isGroupOpen) {
					dataRow.classList.add('group-collapsed')
					editRow.classList.add('group-collapsed')
				}
				if (GroupManager.isLastInGroup(record.id)) {
					dataRow.classList.add('group-end')
					editRow.classList.remove('group-end')
				}
			}
			tbody.appendChild(dataRow)
			tbody.appendChild(editRow)
		}
	}
}
