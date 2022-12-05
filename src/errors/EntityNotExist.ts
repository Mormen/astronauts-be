class EntityNotExist extends Error {
	constructor(message: string) {
		super()
		this.name = "EntityNotExistError"
		this.message = message
	}
}

export default EntityNotExist