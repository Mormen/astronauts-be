class InvalidForm extends Error {
	errors = {}
	constructor(message: string, errors: any) {
		super()
		this.name = "InvalidFormError"
		this.message = message
		this.errors = errors
	}
}

export default InvalidForm