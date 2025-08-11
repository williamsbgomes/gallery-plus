import { Outlet } from "react-router";
import { Text } from "../components/text";

export function LayoutMain() {
	return (
		<>
			<Text>Layout main!</Text>
			<hr />
			<Outlet />
		</>
	);
}
