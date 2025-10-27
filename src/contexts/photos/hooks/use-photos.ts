import { useQuery } from "@tanstack/react-query";
import { createSerializer, parseAsString, useQueryState } from "nuqs";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

const toSearchParams = createSerializer({
	albumId: parseAsString,
});

export default function usePhotos() {
	const [albumId, setAlbumId] = useQueryState("albumId");
	const { data, isLoading } = useQuery<Photo[]>({
		queryKey: ["photos", albumId],
		queryFn: () => fetcher(`/photos${toSearchParams({ albumId })}`),
	});

	return {
		photos: data || [],
		isLoadingPhotos: isLoading,
		filters: { albumId, setAlbumId },
	};
}
