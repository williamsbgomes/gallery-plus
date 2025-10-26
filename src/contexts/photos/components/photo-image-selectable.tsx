import type React from "react";
import { useId, useState } from "react";
import { tv } from "tailwind-variants";
import { ImagePreview } from "../../../components/image-preview";
import { InputCheckbox } from "../../../components/input-checkbox";

export const photoImageSelectableVariants = tv({
	base: `
    cursor-pointer relative rounded-lg
  `,
	variants: {
		select: {
			true: "outline-2 outline-accent-brand",
		},
	},
});

interface PhotoImageSelectableProps
	extends React.ComponentProps<typeof ImagePreview> {
	selected?: boolean;
	onSelectImage?: (selected: boolean) => void;
}

export default function PhotoImageSelectable({
	className,
	selected,
	onSelectImage,
	...props
}: PhotoImageSelectableProps) {
	const [isSelected, setIsSelected] = useState(selected);
	const checkboxId = useId();

	function handleSelect() {
		const newValue = !isSelected;

		setIsSelected(newValue);
		onSelectImage?.(newValue);
	}

	return (
		<label
			htmlFor={checkboxId}
			className={photoImageSelectableVariants({
				className,
				select: isSelected,
			})}
		>
			<InputCheckbox
				id={checkboxId}
				size="sm"
				checked={isSelected}
				onChange={handleSelect}
				className="absolute top-1 left-1"
			/>
			<ImagePreview {...props} />
		</label>
	);
}
