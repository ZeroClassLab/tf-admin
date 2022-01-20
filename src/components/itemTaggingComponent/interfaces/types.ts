import { Area, Point } from "react-easy-crop/types";

export interface ProductTag {
    contents: { [key: string]: string };
    xPosition: number;
    yPosition: number;
}

export interface CafeImage {
    id?: string;
    url: string;
    description: string;
    productTags: ProductTag[];
}

export interface TagDataLabel {
    label: string;
    key: string;
    type: "short" | "long";
}

export interface Size {
    width: number;
    height: number;
}

export interface CropInfo {
    crop: Point;
    croppedAreaPixels: Area;
    zoom: number;
}
