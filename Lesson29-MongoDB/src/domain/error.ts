export class BadRequest extends Error {
	name = "BadRequest";
	message = "Ticket is already completed"
}

export class NotFoundError extends Error {
	constructor() {
		super("Not Found");
	}
}
