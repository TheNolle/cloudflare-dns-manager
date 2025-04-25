const GROUPS_KEY = 'cloudflarednsmanager_groups'

export class Group {
	constructor(label, { icon = null, color = null, description = null } = {}) {
		this.id = crypto.randomUUID()
		this.label = label
		this.icon = icon
		this.color = color
		this.description = description
		this.recordIds = new Set()
	}

	/** Add a record to the group by its UUID */
	addRecord(id) {
		this.recordIds.add(id)
	}

	/** Remove a record from the group by its UUID */
	removeRecord(id) {
		this.recordIds.delete(id)
	}

	/** Check if a group has a record by its UUID */
	hasRecord(id) {
		return this.recordIds.has(id)
	}
}

export class GroupManager {
	static #groups = new Map()
	static #openGroups = new Set()

	/** Create and register a new group */
	static create(label, options = {}) {
		const group = new Group(label, options)
		this.#groups.set(group.id, group)
		return group
	}

	/** Delete a group by its UUID */
	static delete(id) {
		this.#groups.delete(id)
		this.#openGroups.delete(id)
	}

	/** Toggle group open/collapse */
	static toggle(id) {
		this.#openGroups.has(id) ? this.#openGroups.delete(id) : this.#openGroups.add(id)
	}

	/** Check if group is expanded */
	static isOpen(id) {
		return this.#openGroups.has(id)
	}

	/** Get a group by UUID */
	static get(id) {
		return this.#groups.get(id) || null
	}

	/** Get all groups */
	static list() {
		return Array.from(this.#groups.values())
	}

	/** Reset everything */
	static clear() {
		this.#groups.clear()
		this.#openGroups.clear()
	}

	/** Save groups to local storage */
	static save() {
		localStorage.setItem(GROUPS_KEY, JSON.stringify({
			groups: Array.from(this.#groups.entries()).map(([id, group]) => [
				id,
				{ ...group, recordIds: Array.from(group.recordIds) }
			])
		}))
	}

	/** Load groups from local storage */
	static load() {
		const raw = localStorage.getItem(GROUPS_KEY)
		if (!raw) return
		try {
			const { groups, open } = JSON.parse(raw)
			this.#groups = new Map(groups.map(([id, g]) => {
				const group = Object.assign(new Group(g.label), g)
				group.recordIds = new Set(g.recordIds)
				return [id, group]
			}))
			this.#openGroups.clear()
			this.purgeEmpty()
		} catch (error) {
			console.warn('Failed to load saved groups', error)
		}
	}

	/** Check if a recordID is the last in its group */
	static isLastInGroup(id) {
		for (const group of this.#groups.values()) {
			if (group.hasRecord(id)) {
				const ids = Array.from(group.recordIds)
				return ids[ids.length - 1] === id
			}
		}
		return false
	}

	/** Purge all groups that have no records */
	static purgeEmpty() {
		let changed = false
		for (const [id, group] of this.#groups.entries()) {
			if (group.recordIds.size === 0) {
				this.delete(id)
				changed = true
			}
		}
		if (changed) this.save()
	}
}
