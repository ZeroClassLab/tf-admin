import { useState } from "react";
import DropZone from "./components/DropZone";
import ItemTagger from "./components/ItemTagger";
import ImageList from "./components/ImageList";
import { CafeImage, ProductTag, CropInfo } from "./interfaces/types";
import {
    AiOutlinePlusCircle,
    AiOutlineDelete,
    AiOutlineSave,
} from "react-icons/ai";
import { MdCrop } from "react-icons/md";
import getCroppedImg from "./cropImage";
import { RecoilState, useRecoilState } from "recoil";
import { Grid, Box, Button, useTheme, useMediaQuery } from "@mui/material";

declare global {
    interface Array<T> {
        changeByIndex(newElem: any, index: number): any[];
        deleteByIndex(index: number): any[];
    }
}

Array.prototype.changeByIndex = function (newElem: any, index: number): any[] {
    return this.map((elem, i) => (i === index ? newElem : elem));
};

Array.prototype.deleteByIndex = function (index: number): any[] {
    return this.filter((_elem, i) => i !== index);
};

interface CroppableItemTaggerProps {
    imageMaxNum?: number;
    taggedImagesRecoil: RecoilState<CafeImage[]>;
    originalFilesRecoil: RecoilState<File[]>;
    cropInfosRecoil: RecoilState<CropInfo[]>;
}

const CroppableItemTagger = ({
    imageMaxNum = 5,
    taggedImagesRecoil,
    originalFilesRecoil,
    cropInfosRecoil,
}: CroppableItemTaggerProps) => {
    const IMG_RATIO = 3 / 4;
    const size = { width: 720, height: 720 * IMG_RATIO };

    const [taggedImages, setTaggedImages] =
        useRecoilState<CafeImage[]>(taggedImagesRecoil);
    const [originalFiles, setOriginalFiles] =
        useRecoilState<File[]>(originalFilesRecoil);
    const [cropInfos, setCropInfos] =
        useRecoilState<CropInfo[]>(cropInfosRecoil);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [readOnly, setReadOnly] = useState(true);
    const [isCropping, setIsCropping] = useState(false);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("mobile"));

    const getTags = (tags: ProductTag[]) => {
        setTaggedImages(
            taggedImages.changeByIndex(
                { ...taggedImages[currentImageIndex], productTags: tags },
                currentImageIndex
            )
        );
    };

    const getCropInfo = (cropInfo: CropInfo) => {
        setCropInfos(cropInfos.changeByIndex(cropInfo, currentImageIndex));
    };

    //저장 이전 cropping save 용

    const saveCroppedImages = async () => {
        setIsCropping(false);
        try {
            let newCroppedImages: File[] = [];
            let newCropInfos: CropInfo[] = [];
            let newTaggedImages: CafeImage[] = [];
            await Promise.all(
                cropInfos.map(async (cropInfo, i) => {
                    if (
                        cropInfo.croppedAreaPixels.width > 0 &&
                        cropInfo.croppedAreaPixels.height > 0
                    ) {
                        console.log(i);
                        const croppedImage = await getCroppedImg(
                            taggedImages[i].url,
                            cropInfo.croppedAreaPixels,
                            0,
                            originalFiles[i].name || "cropped_image.jpeg",
                            originalFiles[i].type || "image/jpeg"
                        );
                        if (croppedImage) newCroppedImages[i] = croppedImage;
                        newCropInfos[i] = {
                            crop: { x: 0, y: 0 },
                            croppedAreaPixels: {
                                x: 0,
                                y: 0,
                                height: 0,
                                width: 0,
                            },
                            zoom: 1,
                        };
                        newTaggedImages[i] = {
                            ...taggedImages[i],
                            url: croppedImage
                                ? URL.createObjectURL(croppedImage)
                                : "",
                        };
                    } else {
                        newCroppedImages[i] = originalFiles[i];
                        newCropInfos[i] = cropInfos[i];
                        newTaggedImages[i] = taggedImages[i];
                    }
                })
            );
            setCropInfos(newCropInfos);
            setOriginalFiles(newCroppedImages);
            setTaggedImages(newTaggedImages);
        } catch (e) {
            console.error(e);
        }
    };

    const deleteImage = (): void => {
        setTaggedImages(taggedImages.deleteByIndex(currentImageIndex));
        setOriginalFiles(originalFiles.deleteByIndex(currentImageIndex));
        setCropInfos(cropInfos.deleteByIndex(currentImageIndex));
        if (
            currentImageIndex === taggedImages.length - 1 &&
            currentImageIndex > 0
        ) {
            setCurrentImageIndex(currentImageIndex - 1);
        }
    };

    return (
        <div className="CroppableItemTagger">
            <div style={{ width: "100%", maxWidth: `${size.width}px` }}>
                {taggedImages.length === 0 ? (
                    <DropZone
                        setOriginalFiles={setOriginalFiles}
                        setCropInfos={setCropInfos}
                        taggedImages={taggedImages}
                        setTaggedImages={setTaggedImages}
                        imageMaxNum={imageMaxNum}
                    />
                ) : (
                    <div style={{ width: "100%" }}>
                        <ItemTagger
                            backgroundImage={
                                taggedImages[currentImageIndex].url
                            }
                            defaultTags={
                                taggedImages[currentImageIndex].productTags
                            }
                            getTags={getTags}
                            defaultCrop={cropInfos[currentImageIndex]}
                            getCropInfo={getCropInfo}
                            readOnly={readOnly}
                            isCropping={isCropping}
                            style={{ boxShadow: "none" }}
                            tagDataLabels={[
                                {
                                    label: "상품명",
                                    key: "productName",
                                    type: "short",
                                },
                                {
                                    label: "브랜드",
                                    key: "productBrand",
                                    type: "short",
                                },
                                {
                                    label: "상세정보",
                                    key: "productDescription",
                                    type: "long",
                                },
                                {
                                    label: "상품 링크",
                                    key: "productURL",
                                    type: "short",
                                },
                            ]}
                        />

                        <Grid
                            container
                            justifyContent={"flex-end"}
                            spacing={1}
                            sx={{ mt: 1, mb: 2 }}
                        >
                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    onClick={() => {
                                        setIsCropping(false);
                                        setReadOnly(!readOnly);
                                    }}
                                >
                                    <AiOutlinePlusCircle
                                        style={{ marginRight: "5px" }}
                                    />
                                    {readOnly ? "태그하기" : "저장하기"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    onClick={() => {
                                        setReadOnly(true);
                                        setIsCropping(!isCropping);
                                    }}
                                >
                                    <MdCrop style={{ marginRight: "5px" }} />
                                    {isCropping ? "저장하기" : "자르기"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    onClick={saveCroppedImages}
                                >
                                    <AiOutlineSave
                                        style={{ marginRight: "5px" }}
                                    />
                                    {"적용하기"}
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant={"contained"}
                                    onClick={deleteImage}
                                >
                                    <AiOutlineDelete
                                        style={{ marginRight: "5px" }}
                                    />
                                    삭제하기
                                </Button>
                            </Grid>
                        </Grid>

                        <ImageList
                            originalFiles={originalFiles}
                            setOriginalFiles={setOriginalFiles}
                            cropInfos={cropInfos}
                            setCropInfos={setCropInfos}
                            taggedImages={taggedImages}
                            setTaggedImages={setTaggedImages}
                            currentImageIndex={currentImageIndex}
                            setCurrentImageIndex={setCurrentImageIndex}
                            imageMaxNum={imageMaxNum}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CroppableItemTagger;
