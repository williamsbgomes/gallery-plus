import type React from "react";
import { useRef, useState } from "react";
import SearchIcon from "../assets/icons/search.svg?react";
import { usePhotos } from "../contexts/photos/hooks/use-photos";
import { debounce } from "../helpers/utils";
import { InputText } from "./input-text";

export function PhotosSearch() {
	const [inputValue, setInputValue] = useState("");
	const { filters } = usePhotos();

	const debouncedSetValue = useRef(
		debounce((value: string) => filters.setQ(value), 200),
	);

	function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value;

		setInputValue(value);
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
