import { create } from '../../utils/dom.js'
import { isReadOnly } from '../../models/record-store/filters.js'
import { GroupManager } from '../../models/group-store/group-store.js'
import { openGroupModal } from '../../models/group-store/group-modal.js'
import proxied from '../../../assets/proxied.js'
import dnsOnly from '../../../assets/dns-only.js'

/**
 * Creates a single data row (record display)
 */
export const createDataRow = (record) => {
	const dataRow = create('tr')
	dataRow.dataset.id = record.id

	const date = create('td')
	date.textContent = new Date(record.date).toLocaleDateString('en-GB')
	dataRow.appendChild(date)

	const type = create('td')
	type.textContent = record.type
	if (isReadOnly(record)) {
		const readOnly = create('i', 'fa-solid fa-lock')
		readOnly.title = 'Read Only'
		type.prepend(readOnly)
	}
	if (record.comment) {
		const comment = create('i', 'fa-solid fa-comment')
		comment.title = record.comment
		type.appendChild(comment)
	}
	dataRow.appendChild(type)

	const name = create('td')
	name.textContent = record.name
	dataRow.appendChild(name)

	const content = create('td')
	content.textContent = record.content.length > 75 ? `${record.content.slice(0, 75)}...` : record.content
	if (record.content.length > 75) content.title = record.content
	if (record.priority) {
		const priority = create('span', 'priority')
		priority.textContent = record.priority
		content.appendChild(priority)
	}
	dataRow.appendChild(content)

	const proxy = create('td')
	const proxyImage = create('img')
	proxyImage.src = record.proxied ? proxied : dnsOnly
	proxyImage.alt = record.proxied ? 'Proxied' : 'DNS Only'
	proxy.textContent = record.proxied ? 'Proxied' : 'DNS Only'
	proxy.prepend(proxyImage)
	dataRow.appendChild(proxy)

	const ttl = create('td')
	ttl.textContent = record.ttl
	dataRow.appendChild(ttl)

	const actions = create('td', 'actions')
	const recordGroup = GroupManager.list().find(group => group.hasRecord(record.id))

	const groupButton = create('button', recordGroup ? 'group-button' : 'add-to-group-button')
	groupButton.textContent = recordGroup ? 'Group' : 'Add to Group'
	groupButton.onclick = () => openGroupModal(record, recordGroup)
	actions.appendChild(groupButton)

	dataRow.appendChild(actions)

	return dataRow
}
