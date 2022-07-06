import React, { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAppointment } from "../shared/api/appointment";
import { StyledContainer } from "../components/layout.styled";
import { Appointment } from "../shared/domain/appointment";

type PageParams = {
	appointmentId: string;
}

export const ViewAppointmentPage: FunctionComponent = () => {
	const [appointment, setAppointment] = useState<Appointment | null>(null);

	const { appointmentId } = useParams<PageParams>();

	useEffect(() => {
		const fetchAppointment = async (id: string) => {
			const appointment = await getAppointment({ id });

			setAppointment(appointment);
		};

		if (appointmentId) {
			fetchAppointment(appointmentId);
		}
	}, [appointmentId]);

	return (
		<StyledContainer>
			{appointment && (
				
				<div style={{"display":"flex", "flexDirection":"column", "padding": "20px", "caretColor":"transparent"}}>								
					<span style={{"fontSize": "12px", "color": "#636363", "marginBottom":"5px"}}>Your ticket:</span>
					<span style={{"fontSize": "40px", "color": "#636363", "textAlign":"center", "backgroundColor":"#D2EBFF", "padding": "10px", "borderRadius": "10px"}}>{appointment.ticket}</span>
				</div>
			)}
		</StyledContainer>
	);
};