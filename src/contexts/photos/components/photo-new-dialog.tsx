import { DialogClose, DialogTrigger } from "@radix-ui/react-dialog";
import type React from "react";
import { useForm } from "react-hook-form";
import { Alert } from "../../../components/alert";
import { Button } from "../../../components/button";
import {
	Dialog,
	DialogBody,
	DialogContent,
	DialogFooter,
	DialogHeader,
} from "../../../components/dialog";
import { ImagePreview } from "../../../components/image-preview";
import { InputSingleFile } from "../../../components/input-single-file";
import { InputText } from "../../../components/input-text";
import { Skeleton } from "../../../components/skeleton";
import { Text } from "../../../components/text";
import { useAlbums } from "../../albums/hooks/use-albums";

interface PhotoNewDialogProps {
	trigger: React.ReactNode;
}

export function PhotoNewDialog({ trigger }: PhotoNewDialogProps) {
	const form = useForm();

	const { albums, isLoadingAlbums } = useAlbums();

	return (
		<Dialog>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent>
				<DialogHeader>Adicionar foto</DialogHeader>

				<DialogBody className="flex flex-col gap-5">
					<InputText placeholder="Adicione um título" maxLength={255} />

					<Alert>
						Tamanho máximo: 50MB
						<br />
						Você pode selecionar arquivo em PNG, JPG ou JPEG
					</Alert>

					<InputSingleFile
						form={form}
						allowedExtensions={["png", "jpg", "jpeg"]}
						maxFileSizeInMB={50}
						replaceBy={<ImagePreview className="w-full h-56" />}
					/>

					<div className="space-y-3">
						<Text variant="label-small">Selecionar álbuns</Text>

						<div className="flex flex-wrap gap-3">
							{!isLoadingAlbums &&
								albums.length > 0 &&
								albums.map((album) => (
									<Button
										key={album.id}
										variant="ghost"
										size="sm"
										className="truncate"
									>
										{album.title}
									</Button>
								))}

							{isLoadingAlbums &&
								Array.from({ length: 5 }).map((_, index) => (
									<Skeleton
										key={`album-loading-${index + 1}`}
										className="w-20 h-7"
									/>
								))}
						</div>
					</div>
				</DialogBody>

				<DialogFooter>
					<DialogClose asChild>
						<Button variant="secondary">Cancelar</Button>
					</DialogClose>
					<Button>Adicionar</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
