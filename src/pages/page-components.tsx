import { useForm } from "react-hook-form";
import ChevronLeftIcon from "../assets/icons/chevron-left.svg?react";
import ChevronRightIcon from "../assets/icons/chevron-right.svg?react";
import SearchIcon from "../assets/icons/search.svg?react";
import { Alert } from "../components/Alert";
import { Badge } from "../components/Badge";
import { Button } from "../components/Button";
import { ButtonIcon } from "../components/button-icon";
import { Divider } from "../components/Divider";
import {
	Dialog,
	DialogBody,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTrigger,
} from "../components/dialog";
import { ImagePreview } from "../components/image-preview";
import { InputCheckbox } from "../components/input-checkbox";
import { InputSingleFile } from "../components/input-single-file";
import { InputText } from "../components/input-text";
import { Text } from "../components/Text";

export function PageComponents() {
	const form = useForm();
	const file = form.watch("file");
	const fileSrc = file?.[0] ? URL.createObjectURL(file[0]) : undefined;

	return (
		<div className="grid gap-7 p-6">
			<div className="flex gap-3">
				<Button>Button</Button>
				<Button variant="secondary">Button</Button>
				<Button disabled>Button</Button>
				<Button handling>Loading</Button>
				<Button icon={ChevronRightIcon}>Próxima Imagem</Button>
				<Button variant="ghost" size="sm">
					Button
				</Button>
				<Button variant="primary" size="sm">
					Button
				</Button>
			</div>

			<div className="flex gap-3">
				<ButtonIcon icon={ChevronLeftIcon} />
				<ButtonIcon icon={ChevronRightIcon} variant="secondary" />
			</div>

			<div className="flex gap-3">
				<Badge>Todos</Badge>
				<Badge>Natureza</Badge>
				<Badge>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
				<Badge loading>Viagem</Badge>
			</div>

			<div>
				<Alert>
					Tamanho máximo: 50MB
					<br />
					Você pode selecionar arquivos em PNG, JPG, JPEG ou WEBP
				</Alert>
			</div>

			<div>
				<Divider />
			</div>

			<div>
				<InputText placeholder="Digite algo..." icon={SearchIcon} />
			</div>

			<div>
				<InputCheckbox />
			</div>

			<div>
				<InputSingleFile
					allowedExtensions={["png", "jpg", "jpeg", "webp"]}
					maxFileSizeInMB={50}
					form={form}
					replaceBy={<ImagePreview src={fileSrc} alt="Image preview" />}
					{...form.register("file")}
				/>
			</div>

			<div>
				<Dialog>
					<DialogTrigger asChild>
						<Button>Abir Modal</Button>
					</DialogTrigger>
					<DialogContent>
						<DialogHeader>Test Dialog</DialogHeader>
						<DialogBody>
							<Text className="mb-4" as="div">
								Test conteúdo do Dialog
							</Text>

							<InputSingleFile
								allowedExtensions={["png", "jpg", "jpeg", "webp"]}
								maxFileSizeInMB={50}
								form={form}
								replaceBy={<ImagePreview src={fileSrc} alt="Image preview" />}
								{...form.register("file")}
							/>
						</DialogBody>
						<DialogFooter>
							<DialogClose asChild>
								<Button variant="secondary">Cancelar</Button>
							</DialogClose>
							<Button>Adicionar</Button>
						</DialogFooter>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	);
}
