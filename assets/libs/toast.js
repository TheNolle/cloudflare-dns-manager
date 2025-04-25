/**
 * ToastManager: Class to handle dynamic toasts (like react-toastify)
 * Self-contained — no external CSS or libraries required.
 * Designed for usage like:
 *
 * const toast = new Toast()
 * toast.success('Saved!', { position: 'top-right' })
 * toast.error('Oops...', { duration: 5000 })
 *
 * @author Nolly
 */
class Toast {
	/**
	 * Creates a new Toast instance
	 * @param {Partial<ToastOptions>} [options] - Optional default options
	 */
	constructor(options = {}) {
		/** @type {Record<string, HTMLElement>} - Holds active container nodes by position */
		this.containers = {}

		/** @type {ToastOptions} - Default global options */
		const defaultOptions = {
			position: 'top-right',
			duration: 3000,
			pauseOnHover: true,
			showCloseButton: true,
			icon: true,
			theme: 'dark',
		}

		this.defaultOptions = {
			...defaultOptions, ...Object.fromEntries(
				Object.entries(options).map(([key, value]) => [key, value ?? defaultOptions[key]])
			)
		}

		this._injectStyles()
	}

	/**
	 * Shows a toast of a given type
	 * @param {'info'|'success'|'error'|'warning'|'default'} type
	 * @param {string|ToastContent} content
	 * @param {Partial<ToastOptions>} [options]
	 */
	show(type, content, options = {}) {
		const config = { ...this.defaultOptions, ...options }
		const position = config.position
		const container = this._getContainer(position)

		const toast = document.createElement('div')
		toast.className = `toast toast-${type} toast-${config.theme}`
		toast.setAttribute('role', 'status')
		toast.setAttribute('aria-live', 'polite')

		// Icon
		if (config.icon) {
			const iconEl = document.createElement('div')
			iconEl.className = 'toast-icon'
			iconEl.innerHTML = typeof config.icon === 'string'
				? config.icon
				: this._getDefaultIcon(type)
			toast.appendChild(iconEl)
		}

		// Content
		const contentEl = document.createElement('div')
		contentEl.className = 'toast-content'
		if (typeof content === 'string') {
			contentEl.innerHTML = `<div class="toast-message">${content}</div>`
		} else {
			if (content.title)
				contentEl.innerHTML += `<div class="toast-title">${content.title}</div>`
			if (content.message)
				contentEl.innerHTML += `<div class="toast-message">${content.message}</div>`
		}
		toast.appendChild(contentEl)

		// Close button
		if (config.showCloseButton) {
			const close = document.createElement('button')
			close.className = 'toast-close'
			close.innerHTML = '&times;'
			close.onclick = () => container.removeChild(toast)
			toast.appendChild(close)
		}

		// Insert & animate
		container.appendChild(toast)
		requestAnimationFrame(() => toast.classList.add('visible'))

		// Auto-remove
		let autoRemove = setTimeout(() => {
			toast.classList.remove('visible')
			toast.addEventListener('transitionend', () => {
				if (toast.parentNode) toast.parentNode.removeChild(toast)
			})
		}, config.duration)

		if (config.pauseOnHover) {
			toast.addEventListener('mouseenter', () => clearTimeout(autoRemove))
			toast.addEventListener('mouseleave', () => {
				autoRemove = setTimeout(() => {
					toast.classList.remove('visible')
					toast.addEventListener('transitionend', () => {
						if (toast.parentNode) toast.parentNode.removeChild(toast)
					})
				}, config.duration)
			})
		}
	}

	/**
	 * Shortcut methods for common types
	 */
	info = (content, options) => this.show('info', content, options)
	success = (content, options) => this.show('success', content, options)
	error = (content, options) => this.show('error', content, options)
	warning = (content, options) => this.show('warning', content, options)
	default = (content, options) => this.show('default', content, options)

	/**
	 * Gets or creates a container element for a given position
	 * @param {ToastPosition} position
	 * @returns {HTMLElement}
	 */
	_getContainer(position) {
		if (this.containers[position]) return this.containers[position]

		const element = document.createElement('div')
		element.className = `toast-container toast-container-${position}`
		document.body.appendChild(element)
		this.containers[position] = element
		return element
	}

	/**
	 * Injects all needed CSS into <head> dynamically
	 */
	_injectStyles() {
		const style = document.createElement('style')
		style.innerHTML = `
			.toast-container {
				position: fixed;
				z-index: 9999;
				display: flex;
				flex-direction: column;
				gap: 10px;
				pointer-events: none;
			}
			.toast-container-top-left { top: 10px; left: 10px; align-items: flex-start }
			.toast-container-top-right { top: 10px; right: 10px; align-items: flex-end }
			.toast-container-top-center { top: 10px; left: 50%; transform: translateX(-50%) }
			.toast-container-bottom-left { bottom: 10px; left: 10px; align-items: flex-start }
			.toast-container-bottom-right { bottom: 10px; right: 10px; align-items: flex-end }
			.toast-container-bottom-center { bottom: 10px; left: 50%; transform: translateX(-50%) }

			.toast {
				min-width: 200px;
				max-width: 320px;
				background: #333;
				color: #fff;
				padding: 12px 16px;
				border-radius: 6px;
				display: flex;
				align-items: center;
				box-shadow: 0 4px 12px rgba(0,0,0,0.2);
				opacity: 0;
				transform: translateY(20px);
				transition: all 0.3s ease;
				pointer-events: auto;
				position: relative;
			}
			.toast.visible {
				opacity: 1;
				transform: translateY(0);
			}
			.toast-light {
				background: #f9f9f9;
				color: #222;
			}
			.toast-icon {
				margin-right: 12px;
				font-size: 20px;
			}
			.toast-title {
				font-weight: bold;
				margin-bottom: 4px;
			}
			.toast-message {
				font-size: 14px;
			}
			.toast-close {
				background: transparent;
				border: none;
				color: inherit;
				font-size: 20px;
				position: absolute;
				right: 8px;
				top: 6px;
				cursor: pointer;
			}
			.toast-success { border-left: 4px solid #4caf50 }
			.toast-error { border-left: 4px solid #f44336 }
			.toast-warning { border-left: 4px solid #ff9800 }
			.toast-info { border-left: 4px solid #2196f3 }
		`
		document.head.appendChild(style)
	}

	/**
	 * Returns a default icon for a given toast type
	 * @param {'info'|'success'|'error'|'warning'|'default'} type
	 * @returns {string}
	 */
	_getDefaultIcon(type) {
		const map = {
			info: 'ℹ️',
			success: '✅',
			error: '❌',
			warning: '⚠️',
			default: '🔔',
		}
		return map[type] || '🔔'
	}
}

/**
 * @typedef {'top-left'|'top-right'|'top-center'|'bottom-left'|'bottom-right'|'bottom-center'} ToastPosition
 */

/**
 * @typedef {Object} ToastContent
 * @property {string} [title] - Optional title in bold
 * @property {string} message - Required message body
 */

/**
 * @typedef {Object} ToastOptions
 * @property {ToastPosition} [position] - Where to show the toast
 * @property {number} [duration] - How long before auto-dismiss (ms)
 * @property {boolean} [pauseOnHover] - Whether to pause on hover
 * @property {boolean|string} [icon] - Use emoji/HTML string/icon
 * @property {boolean} [showCloseButton] - Show a close (×) button
 * @property {'dark'|'light'} [theme] - Color theme
 */

// Usage example:
// const toast = new Toast()
// toast.success('Everything went well!', { position: 'bottom-left' })

// Export the Toast class
export { Toast }
