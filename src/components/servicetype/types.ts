export interface ServiceType {
    _id: string;
    name: string;
    isValid: boolean;
}

export interface BoardType {
    _id: string;
    name: string;
    label: string;
    thumbnailWidth: number;
    thumbnailHeight: number;
    mobileThumbnailWidth: number;
    mobileThumbnailHeight: number;
}
