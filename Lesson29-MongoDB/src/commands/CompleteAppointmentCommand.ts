import { Appointment } from "../domain/appointment";
import { BadRequest, NotFoundError } from "../domain/error";
import { AppointmentRepository } from "../ports/repositories/appointment";

type CompleteAppointmentCommandParams = {
    id: string;
};

export class CompleteAppointmentCommand {
    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute({ id }: CompleteAppointmentCommandParams): Promise<Appointment> {
        const appointment = await this.appointmentRepository.findOne(id);

        if (!appointment) {
            throw new NotFoundError();
        }

        if (appointment.completed === true) {
            throw new BadRequest();
        }
        appointment.update({ completed: true });
       
        return await this.appointmentRepository.update(appointment);
    }
}