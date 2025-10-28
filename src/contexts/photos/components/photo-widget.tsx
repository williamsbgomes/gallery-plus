import { Link } from "react-router";
import { Badge } from "../../../components/Badge";
import { buttonTextVariants, buttonVariants } from "../../../components/Button";
import { ImagePreview } from "../../../components/image-preview";
import { Skeleton } from "../../../components/Sskeleton";
import { Text } from "../../../components/Text";
import type { Photo } from "../models/photo";

interface PhotoWidgetProps {
	photo: Photo;
	loading?: boolean;
}

export function PhotoWidget({ photo, loading }: PhotoWidgetProps) {
	return (
		<div className="flex flex-col gap-4">
			{!loading ? (
				<ImagePreview
					src={`${import.meta.env.VITE_IMAGES_URL}/${photo.imageId}`}
					title={photo.title}
					imageClassName="w-[10.875rem] h-[10.875rem] rounded-lg"
				/>
			) : (
				<Skeleton className="w-full h-[10.875rem] rounded-lg" />
			)}
			<div className="flex flex-col gap-2">
				{!loading ? (
					<Text variant="paragraph-large" className="truncate">
						{photo.title}
					</Text>
				) : (
					<Skeleton className="w-full h-6" />
				)}
				<div className="flex gap-1 min-h-[1.375rem]">
					{!loading ? (
						<>
							{photo.albums?.slice(0, 1).map((album) => (
								<Badge className="truncate" size="xs" key={album.id}>
									{album.title}
								</Badge>
							))}
							{photo.albums?.length > 1 && (
								<Badge size="xs">+{photo.albums.length - 1}</Badge>
							)}
						</>
					) : (
						Array.from({ length: 2 }).map((_, index) => (
							<Skeleton
								className="w-full h-[1.375rem] rounded-sm"
								key={`album-loading-${index + 1}`}
							/>
						))
					)}
				</div>
			</div>
			{!loading ? (
				<Link
					className={buttonVariants({
						variant: "secondary",
						className: "px-2 py-2",
					})}
					to={`/photos/${photo.id}`}
				>
					<Text
						className={buttonTextVariants({
							variant: "secondary",
							size: "sm",
							className: "text-center",
						})}
					>
						Detalhes da Imagem
					</Text>
				</Link>
			) : (
				<Skeleton className="w-full h-10" />
			)}
		</div>
	);
}
