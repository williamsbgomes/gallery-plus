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
	base: "fill-placeholder",
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
	// biome-ignore lint/suspicious/noExplicitAny: form comes from react-hook-form and can be any
	form: any;
	error?: ReactNode;
	allowedExtensions: string[];
	maxFileSizeInMB: number;
	replaceBy: ReactNode;
}

export function InputSingleFile({
	size,
	error,
	form,
	allowedExtensions,
	maxFileSizeInMB,
	replaceBy,
	...props
}: InputSingleFileProps) {
	const formValues = useWatch({ control: form.control });
	const name = props.name || "";
	const formFile: File = useMemo(
		() => formValues[name]?.[0],
		[formValues, name],
	);

	const { fileExtension, fileSize } = useMemo(
		() => ({
			fileExtension: formFile?.name?.split(".")?.pop()?.toLowerCase() || "",
			fileSize: formFile?.size || 0,
		}),
		[formFile],
	);

	const isValidExtension = allowedExtensions.includes(fileExtension);
	const isValidSize = fileSize <= maxFileSizeInMB * 1024 * 1024;

	const isValidFile = isValidExtension && isValidSize;

	return (
		<div>
			{!formFile || !isValidFile ? (
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
							<Text
								variant="label-medium"
								className="text-placeholder text-center"
							>
								Arraste o arquivo aqui
								<br />
								ou clique para selecionar
							</Text>
						</div>
					</div>
					<div className="flex flex-col gap-1 mt-1">
						{formFile && !isValidExtension && (
							<Text variant="label-small" className="text-accent-red">
								Tipo de arquivo inválido
							</Text>
						)}
						{formFile && !isValidSize && (
							<Text variant="label-small" className="text-accent-red">
								Tamanho do arquivo ultrapassa o máximo
							</Text>
						)}
						{error && (
							<Text variant="label-small" className="text-accent-red">
								Erro no campo
							</Text>
						)}
					</div>
				</>
			) : (
				<>
					{replaceBy}
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
				</>
			)}
		</div>
	);
}
