import { useQuery } from "@tanstack/react-query";
import { createSerializer, parseAsString, useQueryState } from "nuqs";
import { fetcher } from "../../../helpers/api";
import type { Photo } from "../models/photo";

const toSearchParams = createSerializer({
	albumId: parseAsString,
	q: parseAsString,
});

export function usePhotos() {
	const [albumId, setAlbumId] = useQueryState("albumId");
	const [q, setQ] = useQueryState("q");

	const { data, isLoading } = useQuery<Photo[]>({
		queryKey: ["photos", albumId, q],
		queryFn: () => fetcher(`/photos${toSearchParams({ albumId, q })}`),
	});

	return {
		photos: data || [],
		isLoadingPhotos: isLoading,
		filters: { albumId, setAlbumId, q, setQ },
	};
}
