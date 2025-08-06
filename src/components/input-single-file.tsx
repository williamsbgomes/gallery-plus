import type { ComponentProps } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import { Icon } from "./icon";
import { Text } from "./text";

const inputSingleFileVariants = tv({
	base: `
    flex flex-col items-center justify-center w-full
    border border-solid border-border-primary
    group-hover:border-border-active transition rounded-lg gap-1
  `,
	variants: {
		size: {
			md: "px-5 py-6",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

const inputSingleFileIconVariants = tv({
	base: `
    fill-placeholder
  `,
	variants: {
		size: {
			md: "w-8 h-8",
		},
	},
	defaultVariants: {
		size: "md",
	},
});

interface InputSingleFileProps
	extends VariantProps<typeof inputSingleFileVariants>,
		Omit<ComponentProps<"input">, "size"> {}

export function InputSingleFile({ size }: InputSingleFileProps) {
	return (
		<div>
			<div className="w-full relative group cursor-pointer">
				<input
					type="file"
					className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
				/>
				<div className={inputSingleFileVariants({ size })}>
					<Icon
						svg={UploadFileIcon}
						className={inputSingleFileIconVariants()}
					/>
					<Text className="text-placeholder text-center">
						Arraste o arquivo aqui
						<br />
						ou clique para selecionar
					</Text>
				</div>
			</div>
		</div>
	);
}
