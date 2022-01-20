import React, { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { ImageListProps } from "../interfaces/props";
import { CafeImage, Size, CropInfo } from "../interfaces/types";

export const ImageList: React.VFC<ImageListProps> = ({
    taggedImages,
    setTaggedImages,
    originalFiles = [],
    setOriginalFiles,
    cropInfos = [],
    setCropInfos,
    currentImageIndex,
    setCurrentImageIndex,
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
                .splice(0, imageMaxNum - originalFiles.length)
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
            if (setTaggedImages && taggedImages)
                setTaggedImages([...taggedImages, ...fileToTaggedImages]);
            if (setOriginalFiles)
                setOriginalFiles([...originalFiles, ...fileToOriginalFiles]);
            if (setCropInfos) setCropInfos([...cropInfos, ...fileToCropInfos]);
        },
    });

    const [COUNT_PER_LINE, setCOUNT_PER_LINE] = useState(3);

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
            setCOUNT_PER_LINE(newWidth < 600 ? 3 : 5);
        }
    };

    useEffect(() => {
        if (!width || !height) {
            getBoxSize();
            window.addEventListener("resize", getBoxSize);
        } else {
            setCOUNT_PER_LINE(width < 600 ? 3 : 5);
        }
    }, []);

    const baseStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: `${size.width / COUNT_PER_LINE - 9}px`,
        height: `${size.height / COUNT_PER_LINE - 4}px`,
        border: "solid 2px #bdbdbd",
        borderRadius: "5px",
        backgroundColor: "#fafafa",
        marginBottom: "10px",
        color: "#bdbdbd",
        outline: "none",
        // transition: "all .15s ease-out",
        cursor: "pointer",
    };

    const activeStyle = {
        backgroundColor: "rgba(35, 196, 144,0.1)",
    };

    const acceptStyle = {
        backgroundColor: "rgba(35, 196, 144,0.1)",
    };

    const rejectStyle = {
        backgroundColor: "rgba(255, 23, 68,0.1)",
    };

    const style = {
        ...baseStyle,
        ...(isDragActive && activeStyle),
        ...(isDragAccept && acceptStyle),
        ...(isDragReject && rejectStyle),
    };

    return (
        <>
            <div
                style={{
                    display: "flex",
                    width: width || "100%",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                }}
                ref={layoutRef}
            >
                {originalFiles.map((img, index) => (
                    <div
                        key={`taggedImage${index}`}
                        style={{
                            width: `${size.width / COUNT_PER_LINE - 5}px`,
                            height: `${size.height / COUNT_PER_LINE}px`,
                            borderRadius: "5px",
                            backgroundImage:
                                "url(" + URL.createObjectURL(img) + ")",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                            marginBottom: "10px",
                            cursor: "pointer",
                            outline:
                                index === currentImageIndex
                                    ? "3px solid #1ECCA2"
                                    : "3px solid transparent",
                            outlineOffset: "-3px",
                            transition: "all .1s ease-out",
                            alignContent: "flex-start",
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                    >
                        <div
                            style={{
                                width: "18px",
                                height: "18px",
                                textAlign: "center",
                                borderRadius: "3px",
                                backgroundColor: "white",
                                margin: "5px",
                                color: "black",
                                fontSize: "small",
                                fontWeight: 600,
                            }}
                        >
                            {index + 1}
                        </div>
                    </div>
                ))}
                {originalFiles.length < imageMaxNum && (
                    <div {...getRootProps({ style })} onClick={open}>
                        <input {...getInputProps()} />
                        <AiOutlinePlusCircle
                            size={size.height / 10}
                            color={"#bdbdbd"}
                        />
                    </div>
                )}
                {[
                    ...Array(
                        (originalFiles.length < imageMaxNum
                            ? COUNT_PER_LINE - 1
                            : COUNT_PER_LINE) -
                            (originalFiles.length === imageMaxNum &&
                            originalFiles.length % COUNT_PER_LINE === 0
                                ? COUNT_PER_LINE
                                : originalFiles.length % COUNT_PER_LINE)
                    ),
                ].map((v, i) => (
                    <div
                        key={`empty image${i}`}
                        style={{
                            width: `${size.width / COUNT_PER_LINE - 5}px`,
                            height: `${size.height / COUNT_PER_LINE}px`,
                            borderRadius: "5px",
                            backgroundColor: "transparent",
                            marginBottom: "10px",
                        }}
                    ></div>
                ))}
            </div>
        </>
    );
};

export default ImageList;
