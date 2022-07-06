import React, { FunctionComponent } from "react";
import { Appointment } from "../../../shared/domain/appointment";
import { URL } from "../../../shared/api/request"
import { useNavigate } from "react-router-dom";
import { StyledButton } from "../form/form.styled";
// import { StyledButton } from "../form/form.styled";

export type CreateAppointmentOutputProps = {
	appointment: Appointment;
}



export const CreateAppointmentOutput: FunctionComponent<CreateAppointmentOutputProps> = ({ appointment }) => {
	const uri = `${URL}/${appointment.id}`;
	const navigate = useNavigate();


	const copyLink = (event: React.ChangeEvent<any>) => {
		if (appointment) {
			event.target.style.backgroundColor = "#85A1FF";
			event.target.innerText = "Copied";
			event.target.style.cursor = "no-drop";
			navigator.clipboard.writeText(String(uri));
		}
	}

	const navigateToLink = () => {
		if (appointment) {
			navigate(`../${appointment.id}`, {replace:true});
		}
	}


	return (

		<div style={{ "display": "flex", "border": "1px solid grey", "borderRadius": "10px", "padding": "10px", "marginTop": "20px", "width": "auto" }}>

			<StyledButton onClick={copyLink}>Copy</StyledButton>

			<StyledButton onClick={navigateToLink}>Navigate</StyledButton>

			<span>{uri}</span>

		</div>
	)
};
