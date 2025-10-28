import cx from "classnames";
import type { ComponentProps } from "react";
import { useNavigate } from "react-router";
import ArrowLeftIcon from "../../../assets/icons/chevron-left.svg?react";
import ArrowRightIcon from "../../../assets/icons/chevron-right.svg?react";
import { Button } from "../../../components/button";
import { ButtonIcon } from "../../../components/button-icon";
import { Skeleton } from "../../../components/skeleton";

interface PhotosNavigatorProps extends ComponentProps<"div"> {
	previusPhotoId?: string;
	nextPhotoId?: string;
	loading?: boolean;
}

export function PhotosNavigator({
	previusPhotoId,
	nextPhotoId,
	loading,
	className,
	...props
}: PhotosNavigatorProps) {
	const navigate = useNavigate();

	return (
		<div className={cx("flex gap-2", className)} {...props}>
			{!loading ? (
				<>
					<ButtonIcon
						icon={ArrowLeftIcon}
						variant="secondary"
						disabled={!previusPhotoId}
						onClick={() => {
							navigate(`/photos/${previusPhotoId}`);
						}}
					/>
					<Button
						icon={ArrowRightIcon}
						variant="secondary"
						disabled={!nextPhotoId}
						onClick={() => {
							navigate(`/photos/${nextPhotoId}`);
						}}
					>
						Próxima Imagem
					</Button>
				</>
			) : (
				<>
					<Skeleton className="w-10 h-10" />
					<Skeleton className="w-20 h-10" />
				</>
			)}
		</div>
	);
}
