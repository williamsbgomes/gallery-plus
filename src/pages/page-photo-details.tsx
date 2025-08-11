import { useParams } from "react-router";
import { Text } from "../components/text";

export function PagePhotoDetails() {
	const { id } = useParams();

	return (
		<>
			<Text variant="heading-medium">Página de detalhes da foto</Text>
			<hr />
			<Text variant="heading-medium">ID da foto: {id}</Text>
		</>
	);
}
