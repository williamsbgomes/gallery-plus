import type { ComponentProps } from "react";
import { tv } from "tailwind-variants";

const imageFilePreviewVariants = tv({
	base: "rounded-lg overflow-hidden",
});

const imageFilePreviewImageVariants = tv({
	base: "w-full h-full object-cover",
});

interface ImageFilePreviewProps extends ComponentProps<"img"> {
	imageClassName?: string;
}

export function ImageFilePreview({
	className,
	imageClassName,
	...props
}: ImageFilePreviewProps) {
	return (
		<div className={imageFilePreviewVariants({ className })}>
			<img
				className={imageFilePreviewImageVariants({ className: imageClassName })}
				alt={props.alt ?? ""}
				{...props}
			/>
		</div>
	);
}
