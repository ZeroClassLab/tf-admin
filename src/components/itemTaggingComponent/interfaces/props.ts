import React from "react";
import { DraggableEventHandler } from "react-draggable";
import { CafeImage, TagDataLabel, ProductTag, CropInfo } from "./types";

export interface ItemTaggerProps {
    width?: number;
    height?: number;
    ratio?: number;
    defaultTags: ProductTag[];
    getTags?: (tags: ProductTag[]) => void;
    readOnly?: boolean;
    isCropping?: boolean;
    backgroundImage: string;
    style: React.CSSProperties;
    tagDataLabels: TagDataLabel[];
    defaultCrop?: CropInfo;
    getCropInfo?: (cropInfo: CropInfo) => void;
}

export interface TagProps {
    x: number;
    y: number;
    nodeRef: React.RefObject<HTMLDivElement>;
    trackingDraggable: DraggableEventHandler;
    onMouseDown?: (e: MouseEvent) => void;
    onStop: DraggableEventHandler;
    disabled: boolean;
    color: string;
    onMouseOver?: React.MouseEventHandler<SVGElement>;
    onMouseLeave?: React.MouseEventHandler<SVGElement>;
}

export interface ImageListProps {
    taggedImages?: CafeImage[];
    setTaggedImages?: React.Dispatch<React.SetStateAction<CafeImage[]>>;
    originalFiles: File[];
    setOriginalFiles: React.Dispatch<React.SetStateAction<File[]>>;
    cropInfos?: CropInfo[];
    setCropInfos?: React.Dispatch<React.SetStateAction<CropInfo[]>>;
    currentImageIndex: number;
    setCurrentImageIndex: React.Dispatch<React.SetStateAction<number>>;
    width?: number;
    height?: number;
    ratio?: number;
    imageMaxNum?: number;
}

export interface DropZoneProps {
    taggedImages: CafeImage[];
    setTaggedImages: React.Dispatch<React.SetStateAction<CafeImage[]>>;
    setOriginalFiles?: React.Dispatch<React.SetStateAction<File[]>>;
    setCropInfos?: React.Dispatch<React.SetStateAction<CropInfo[]>>;
    width?: number;
    height?: number;
    ratio?: number;
    imageMaxNum: number;
}

export interface StarsProps {
    index: number;
    rating: number;
    size: number;
    onSaveRating: (rating: number) => void;
}

export interface TooltipProps {
    x: number;
    y: number;
    width: number;
    height: number | string;
    onClick: (e: MouseEvent) => void;
    toggleModal: (e: any) => void;
    backgroundColor: string;
    children: React.ReactNode;
}
