import { BrowserRouter, Route, Routes } from "react-router";
import { LayoutMain } from "./pages/layout-main";
import { PageComponents } from "./pages/page-components";
import { PageHome } from "./pages/page-home";
import { PagePhotoDetails } from "./pages/page-photo-details";

export function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route element={<LayoutMain />}>
					<Route index element={<PageHome />} />
					<Route path="/photos/:id" element={<PagePhotoDetails />} />
					<Route path="/components" element={<PageComponents />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}
