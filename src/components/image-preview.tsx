import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const imagePreviewVariants = tv({
	base: "rounded-lg overflow-hidden",
});

const imagePreviewImageVariants = tv({
	base: "w-full h-full object-cover",
});

interface ImagePreviewProps extends ComponentProps<"img"> {
	imageClassName?: string;
}

export function ImagePreview({
	className,
	imageClassName,
	...props
}: ImagePreviewProps) {
	return (
		<div className={imagePreviewVariants({ className })}>
			<img
				className={imagePreviewImageVariants({ className: imageClassName })}
				alt={props.alt ?? ""}
				{...props}
			/>
		</div>
	);
}
