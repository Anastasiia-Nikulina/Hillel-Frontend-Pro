import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";
import { Logger } from "../ports/logger";
import { CLIOutput } from "../adapters/logger";

type CompleteAppointmentCommandParams = {
	id: string;
};

export class CompleteAppointmentCommand {
    commandCliOutput: Logger;
	constructor( private readonly appointmentRepository: AppointmentRepository) {
            this.commandCliOutput = new CLIOutput();
        }

	async execute({ id }: CompleteAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);
       
		if (!appointment) {
			throw new NotFoundError();
		}

        const appointmentModel = Appointment.toModel(appointment);
        appointmentModel.completed = true;
        const updatedDate = new Date();
        appointmentModel.updated_at = updatedDate.toISOString();
        const updatedAppointment = await this.appointmentRepository.update(appointmentModel);

		return updatedAppointment;

	}
}