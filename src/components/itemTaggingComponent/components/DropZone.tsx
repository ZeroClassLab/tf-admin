import { useDropzone } from "react-dropzone";
import React, { useRef, useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { DropZoneProps } from "../interfaces/props";
import { CafeImage, Size, CropInfo } from "../interfaces/types";

/**
 * DropZone component
 *
 * @param param0
 * @returns
 */

export const DropZone: React.VFC<DropZoneProps> = ({
    taggedImages,
    setTaggedImages,
    setOriginalFiles,
    setCropInfos,
    width,
    height,
    ratio = 3 / 4,
    imageMaxNum = 10,
}) => {
    const {
        getRootProps,
        getInputProps,
        isDragActive,
        isDragAccept,
        isDragReject,
        open,
    } = useDropzone({
        accept: "image/*",
        noClick: true,
        noKeyboard: true,
        onDrop: (acceptedFiles) => {
            let fileToTaggedImages: CafeImage[] = [];
            let fileToOriginalFiles: File[] = [];
            let fileToCropInfos: CropInfo[] = [];

            acceptedFiles
                .splice(0, imageMaxNum - taggedImages.length)
                .forEach((file) => {
                    fileToTaggedImages.push({
                        url: URL.createObjectURL(file),
                        description: "",
                        productTags: [],
                    });
                    fileToOriginalFiles.push(file);
                    fileToCropInfos.push({
                        crop: { x: 0, y: 0 },
                        croppedAreaPixels: { x: 0, y: 0, height: 0, width: 0 },
                        zoom: 1,
                    });
                });
            setTaggedImages(fileToTaggedImages);
            if (setOriginalFiles) setOriginalFiles(fileToOriginalFiles);
            if (setCropInfos) setCropInfos(fileToCropInfos);
        },
    });

    const layoutRef = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<Size>({
        width: width || 0,
        height: height || 0,
    });

    const getBoxSize = () => {
        const { current } = layoutRef;
        if (current !== null) {
            const newWidth = current.clientWidth;
            setSize({ width: newWidth, height: newWidth * ratio });
        }
    };

    useEffect(() => {
        if (!width || !height) {
            getBoxSize();
            window.addEventListener("resize", getBoxSize);
        }
    }, []);

    const baseStyle: React.CSSProperties = {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: width ? `${size.width}px` : "100%",
        height: height ? `${size.height}px` : size.width * ratio,
        border: "solid 3px",
        borderColor: "#bdbdbd",
        borderRadius: "5px",
        backgroundColor: "#fafafa",
        color: "#bdbdbd",
        outline: "none",
        transition: "all .15s ease-out",
        cursor: "pointer",
    };

    const activeStyle = {
        borderColor: "#1ECCA2",
        backgroundColor: "rgba(35, 196, 144,0.1)",
    };

    const acceptStyle = {
        borderColor: "#1ECCA2",
        backgroundColor: "rgba(35, 196, 144,0.1)",
    };

    const rejectStyle = {
        borderColor: "#ff1744",
        backgroundColor: "rgba(255, 23, 68,0.1)",
    };

    const style = {
        ...baseStyle,
        ...(isDragActive && activeStyle),
        ...(isDragAccept && acceptStyle),
        ...(isDragReject && rejectStyle),
    };

    return (
        <div>
            <div {...getRootProps({ style })} onClick={open} ref={layoutRef}>
                <input {...getInputProps()} />
                <p></p>
                <AiOutlinePlusCircle size={size.width / 8} color={"#bdbdbd"} />
                <p>
                    <b>{`사진을 선택해주세요 (최대 ${imageMaxNum}장)`}</b>
                </p>
            </div>
        </div>
    );
};

export default DropZone;
