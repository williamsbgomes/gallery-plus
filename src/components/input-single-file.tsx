import { type ComponentProps, type ReactNode, useMemo } from "react";
import { useWatch } from "react-hook-form";
import { tv, type VariantProps } from "tailwind-variants";
import FileImageIcon from "../assets/icons/image.svg?react";
import UploadFileIcon from "../assets/icons/upload-file.svg?react";
import { Icon } from "./icon";
import { Text, textVariants } from "./text";

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
		Omit<ComponentProps<"input">, "size"> {
	form: any;
	error: ReactNode;
}

export function InputSingleFile({
	size,
	error,
	form,
	...props
}: InputSingleFileProps) {
	const formValues = useWatch({ control: form.control });
	const name = props.name || "";
	const formFile: File = useMemo(
		() => formValues[name]?.[0],
		[formValues, name],
	);

	return (
		<div>
			{!formFile ? (
				<>
					<div className="w-full relative group cursor-pointer">
						<input
							type="file"
							className="absolute top-0 right-0 w-full h-full opacity-0 cursor-pointer"
							{...props}
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
					{error && (
						<Text variant="label-small" className="text-accent-red">
							Erro no campo
						</Text>
					)}
				</>
			) : (
				<div
					className={`
						flex gap-3 items-center border border-solid border-border-primary
						rounded mt-5 p-3
					`}
				>
					<Icon svg={FileImageIcon} className="fill-white w-6 h-6" />
					<div className="flex flex-col">
						<div className="truncate max-w-80">
							<Text variant="label-medium" className="text-placeholder">
								{formFile.name}
							</Text>
						</div>
						<div className="flex">
							<button
								type="button"
								className={textVariants({
									variant: "label-small",
									className: "text-accent-red cursor-pointer hover:underline",
								})}
								onClick={() => {
									form.setValue(name, undefined);
								}}
							>
								Remover
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}
