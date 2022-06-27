import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type UpdateAppointmentCommandParams = {
	id: string;
};

export class  UpdateAppointmentCommand {
	constructor(private readonly appointmentRepository: AppointmentRepository) {}

	async execute({ id }:UpdateAppointmentCommandParams): Promise<Appointment> {
		const appointment = await this.appointmentRepository.findOne(id);

		if (!appointment) {
			throw new NotFoundError();
		}
        appointment.update({completed: true});

        this.appointmentRepository.save(appointment);
     
		return appointment;
	}
}