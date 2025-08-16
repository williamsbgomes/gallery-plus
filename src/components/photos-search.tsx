import type React from "react";
import { useRef, useState } from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import { debounce } from "../helpers/utils";
import { InputText } from "./input-text";

export function PhotosSearch() {
	const [inputValue, setInputValuee] = useState("");

	const debouncedSetValue = useRef(
		debounce((value: string) => {
			console.log("valor com debounce", value);
		}, 200),
	);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;

		setInputValuee(value);
		debouncedSetValue.current(value);
	}

	return (
		<InputText
			icon={SearchIcon}
			placeholder="Buscar fotos"
			className="flex-1"
			value={inputValue}
			onChange={handleInputChange}
		/>
	);
}
