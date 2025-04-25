import { create } from '../../utils/dom.js'
import { renderTable } from './table-renderer.js'

const MAX_BUTTONS = 3

export const renderPagination = (totalPages, currentPage, records) => {
	const container = document.getElementById('pagination-controls')

	const button = (label, disabled = false, onClick = null, current = false) => {
		const btn = create('button')
		btn.textContent = label
		if (disabled) btn.disabled = true
		if (current) btn.classList.add('current')
		if (onClick) btn.onclick = onClick
		return btn
	}

	const start = Math.max(1, currentPage - Math.floor(MAX_BUTTONS / 2))
	const end = Math.min(totalPages, start + MAX_BUTTONS - 1)
	const realStart = Math.max(1, end - MAX_BUTTONS + 1)

	container.appendChild(button('<', currentPage === 1, () => renderTable(records, currentPage - 1)))

	for (let i = realStart; i <= end; i++) {
		container.appendChild(button(i, false, () => renderTable(records, i), i === currentPage))
	}

	container.appendChild(button('>', currentPage === totalPages, () => renderTable(records, currentPage + 1)))
}
