import { Container } from "../components/container";
import { PhotoWidget } from "../contexts/photos/components/photo-widget";
import type { Photo } from "../contexts/photos/models/photo";

export function PageHome() {
	return (
		<Container>
			<div className="grid grid-cols-5 gap-9">
				{Array.from({ length: 4 }).map((_, index) => {
					const photoId = String(index + 1);
					return (
						<PhotoWidget
							key={`photo-${index + 1}-${photoId}`}
							photo={{
								id: photoId,
								title: `Photo ${index + 1}`,
								imageId: `portrait-tower.png`,
								albums: [
									{ id: "1", title: "Album 1" },
									{ id: "2", title: "Album 2" },
								],
							}}
						/>
					);
				})}
				<PhotoWidget
					photo={
						{
							albums: [
								{ id: "1", title: "Album 1" },
								{ id: "2", title: "Album 2" },
							],
						} as Photo
					}
					loading
				/>
			</div>
		</Container>
	);
}
