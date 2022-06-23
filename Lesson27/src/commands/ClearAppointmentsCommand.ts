import { Appointment } from "../domain/appointment";
import { NotFoundError } from "../domain/error";
import { AppointmentRepository, FindManyFilter } from "../ports/repositories/appointment";


export class ClearAppointmentCommand {
    constructor(private readonly appointmentRepository: AppointmentRepository) { }

    async execute(filter: FindManyFilter): Promise<Appointment[]> {
        const appointments = await this.appointmentRepository.findMany(filter);

        if (!appointments) {
            throw new NotFoundError();
        }
        await this.appointmentRepository.removeAll();

        return appointments;

    }
}
