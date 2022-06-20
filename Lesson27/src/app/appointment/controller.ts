import { Appointment } from "../../domain/appointment";
import { CLI, CLICommand } from "../../ports/cli";
import { Logger } from "../../ports/logger";
import { CreateAppointmentCommand } from "../../commands/CreateAppointmentCommand";
import { GetAppointmentCommand } from "../../commands/GetAppointmentCommand";
import { CompleteAppointmentCommand } from "../../commands/CompleteAppointmentCommand";
import { AppointmentRepository } from "../../ports/repositories/appointment";
import { DeleteAppointmentCommand } from "../../commands/DeleteAppointmentCommand";
import { ListAppointmentCommand } from "../../commands/ListAppointmentCommand";
import { ClearAppointmentCommand } from "../../commands/ClearAppointmentsCommand";

export class AppointmentController {
	constructor(
		private readonly nodeCliOutput: Logger,
		private readonly nodeCli: CLI,
		private readonly appointmentRepository: AppointmentRepository
	) { }

	async process() {
		const command = this.nodeCli.getCommand();
		const { id } = this.nodeCli.getQuery();


		switch (command) {
			case CLICommand.CREATE:

				const appointment = await new CreateAppointmentCommand(
					this.appointmentRepository
				).execute();

				const record = Appointment.toRecord(appointment);

				this.nodeCliOutput.print(`[${record.id}] has been created`);
				break;

			case CLICommand.GET:

				const getAppointment = await new GetAppointmentCommand(this.appointmentRepository).execute({
					id,
				});

				const getRecord = Appointment.toRecord(getAppointment);

				this.nodeCliOutput.print(`[${getRecord.id}] has been found`);
				break;

			case CLICommand.COMPLETE:

				const completeAppointment = await new CompleteAppointmentCommand(this.appointmentRepository).execute({
					id,
				});

				const completeRecord = Appointment.toRecord(completeAppointment);

				this.nodeCliOutput.print(`[${completeRecord.id}] has been completed [${completeRecord.completed}] `);

				break;

			case CLICommand.DELETE:

				const deleteAppointment = await new DeleteAppointmentCommand(this.appointmentRepository).execute({
					id,
				});

				const deleteRecord = Appointment.toRecord(deleteAppointment);

				this.nodeCliOutput.print(`[${deleteRecord.id}] has been deleted `);
				break;

			case CLICommand.LIST:
				const { status, limit } = this.nodeCli.getQuery();

				const listAppointments = await new ListAppointmentCommand(this.appointmentRepository).execute({
					completed: Boolean(status), limit: Number(limit)
				});

				listAppointments.forEach(row => this.nodeCliOutput.print(`[${Appointment.toRecord(row).id}] has been read `));

				break;

			case CLICommand.CLEAR:
				const clearAppointment = await new ClearAppointmentCommand(this.appointmentRepository).execute({});

				this.nodeCliOutput.print(`Storage has been cleaned, ${clearAppointment.length}`);

				break;
		}
	}
}
