import React, { useState, useRef, useCallback, useEffect } from "react";
import { INBOX_PADDING } from "../consts";
import { ItemTaggerProps } from "../interfaces/props";
import { ProductTag } from "../interfaces/types";
import {
    DraggableData,
    DraggableEvent,
    DraggableEventHandler,
} from "react-draggable";
import Tag from "./Tag";
import Tooltip from "./Tooltip";
import Cropper from "react-easy-crop";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import { Point, Area } from "react-easy-crop/types";
import { Size } from "../interfaces/types";
import { mobileMaxWidthMediaQuery } from "@zclab/mui-utils";

import {
    Grid,
    TextField,
    Button,
    Fade,
    useTheme,
    useMediaQuery,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Link,
} from "@mui/material";
/**
 * ItemTagger Component
 *
 * @param props - {@link ItemTaggerProps}
 */

export const ItemTagger: React.VFC<ItemTaggerProps> = ({
    width,
    height,
    defaultTags = [],
    getTags = () => {},
    backgroundImage = "",
    readOnly = false,
    isCropping = false,
    style = {},
    ratio = 3 / 4,
    tagDataLabels = [{ label: "Tag name", key: "name", type: "short" }],
    defaultCrop = {
        crop: { x: 0, y: 0 },
        croppedAreaPixels: { x: 0, y: 0, height: 0, width: 0 },
        zoom: 1,
    },
    getCropInfo = () => {},
}) => {
    const layoutRef = useRef<HTMLDivElement>(null);
    const nodeRef = useRef<HTMLDivElement>(null);
    const newNodeRef = useRef<HTMLDivElement>(null);

    const [size, setSize] = useState<Size>({
        width: width || 0,
        height: height || 0,
    });

    const isMobile = useMediaQuery(mobileMaxWidthMediaQuery);
    /**
     * States for tags
     */
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [tagData, setTagData] = useState<{ [key: string]: string }>({});
    const [tags, setTags] = useState<ProductTag[]>([]);
    const [currentTagIndex, setCurrentTagIndex] = useState<number>(-1);
    const [newTag, setNewTag] = useState<ProductTag[]>([]);
    const [isDragging, setIsDragging] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    /**
     * States for cropper
     */
    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(1);
    useState<Area | null>(null);
    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        getCropInfo({
            crop: crop,
            croppedAreaPixels: croppedAreaPixels,
            zoom: zoom,
        });
    };

    /**
     * clear the now position, data.
     */
    const clear = useCallback(() => {
        let nullTagData: { [key: string]: string } = {};
        tagDataLabels.forEach((tagDataLabel) => {
            nullTagData[tagDataLabel.key] = "";
        });
        setX(0);
        setY(0);
        setTagData(nullTagData);
        setCurrentTagIndex(-1);
        setIsOpen(false);
    }, [tagDataLabels]);

    /**
     * Clicked mouse pointer's position tracking when Dragging
     *
     * @param e - mouse drag event
     * @param data -
     */
    const trackingDraggable: DraggableEventHandler = (
        e: DraggableEvent,
        data: DraggableData
    ) => {
        if (Math.abs(data.deltaX + data.deltaY) >= 1) {
            setIsDragging(true);
        }

        setX((x * size.width + data.deltaX) / size.width);
        setY((y * size.height + data.deltaY) / size.height);
    };

    /**
     * Delete the tagInfo (which is currentTagIndex).
     */
    const deleteTag = () => {
        let newTags = tags.filter((_elem, idx) => idx !== currentTagIndex);
        setTags(newTags);
        getTags(newTags);
        clear();
    };

    /**
     * Update tagInfo
     */
    const updateTag = () => {
        let newTags = tags.map((tag, idx) =>
            idx === currentTagIndex
                ? { xPosition: x, yPosition: y, contents: tagData }
                : tag
        );
        setTags(newTags);
        getTags(newTags);
        clear();
    };

    /**
     * Update NewTag Info
     */
    const updateNewTag = () => {
        setNewTag([{ xPosition: x, yPosition: y, contents: tagData }]);
    };

    /**
     * Select Clicked tag.
     *
     * @param index - index of the tag in TagInfos
     */
    const selectTag = (index: number) => {
        setIsDragging(false);
        setNewTag([]);
        setCurrentTagIndex(index);
        setX(tags[index].xPosition);
        setY(tags[index].yPosition);

        let loadedTagData: { [key: string]: string } = {};
        tagDataLabels.forEach((tagDataLabel) => {
            loadedTagData[tagDataLabel.key] =
                tags[index].contents[tagDataLabel.key];
        });

        setTagData(loadedTagData);
    };

    /**
     * Force to place the tags in the container.
     *
     * @internal
     */
    const inBoxRange = (offset: {
        xPosition: number;
        yPosition: number;
    }): ProductTag => {
        let x = offset.xPosition;
        let y = offset.yPosition;

        x = x < INBOX_PADDING ? INBOX_PADDING : x;
        x = x > size.width - INBOX_PADDING ? size.width - INBOX_PADDING : x;

        y = y < INBOX_PADDING ? INBOX_PADDING : y;
        y = y > size.height - INBOX_PADDING ? size.height - INBOX_PADDING : y;
        return { xPosition: x, yPosition: y, contents: tagData };
    };

    /**
     * create a new tag
     *
     * @param e - mouseclick event
     */
    const addTag = (e: React.MouseEvent) => {
        setCurrentTagIndex(-1);
        let offset = inBoxRange({
            xPosition: e.nativeEvent.offsetX,
            yPosition: e.nativeEvent.offsetY,
        });
        setX(offset.xPosition / size.width);
        setY(offset.yPosition / size.height);
        offset = {
            ...offset,
            xPosition: offset.xPosition / size.width,
            yPosition: offset.yPosition / size.height,
        };
        setNewTag([offset]);
        setIsOpen(true);
    };

    /**
     * blur tag (focus off)
     */
    const cancel = useCallback(() => {
        setNewTag([]);
        clear();
    }, [clear]);

    /**
     * save newTag into tags
     */
    const saveTag = () => {
        let newTags = [
            ...tags,
            { xPosition: x, yPosition: y, contents: tagData },
        ];
        setTags(newTags);
        getTags(newTags);
        setNewTag([]);
        clear();
    };

    /**
     * when enter the keyboard
     *
     * @param e - Keyboard Event
     * @param func - callback
     */
    const enter = (e: React.KeyboardEvent, func: Function) => {
        if (e.key === "Enter") {
            func();
        }
    };

    /**
     * Get the width of container in pixel
     *
     * @internal
     */
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

    useEffect(() => {
        setTags(defaultTags || []);
        cancel();
    }, [defaultTags]);

    useEffect(() => {
        cancel();
    }, [readOnly]);

    useEffect(() => {
        setCrop(defaultCrop.crop);
        setZoom(defaultCrop.zoom);
    }, [defaultCrop]);

    return (
        <>
            <div
                style={{
                    position: "relative",

                    width: width ? `${size.width}px` : "100%",
                    height: height || `${size.height}px`,
                    borderRadius: "5px",

                    ...style,
                }}
                onClick={readOnly ? () => {} : isOpen ? cancel : addTag}
                ref={layoutRef}
            >
                <Cropper
                    image={backgroundImage}
                    crop={crop}
                    zoom={zoom}
                    aspect={1 / ratio}
                    onCropChange={isCropping ? setCrop : () => {}}
                    onCropComplete={isCropping ? onCropComplete : () => {}}
                    onZoomChange={isCropping ? setZoom : () => {}}
                    objectFit="horizontal-cover"
                    showGrid={isCropping}
                    style={{
                        containerStyle: {
                            borderRadius: "5px",
                            ...(isCropping ? {} : { cursor: "default" }),
                        },
                    }}
                />

                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        marginTop: "5%",
                        textAlign: "center",
                        color: "white",
                        textShadow: "2px 2px 5px black",
                        pointerEvents: "none",
                        alignContent: "flex-end",
                        justifyContent: "flex-end",
                    }}
                >
                    {isCropping
                        ? "드래그하여 이미지의 원하는 부분을 잘라주세요"
                        : readOnly
                        ? ""
                        : "이미지를 클릭하여 태그를 추가해주세요"}
                </div>

                {tags.map((tag, idx) => (
                    <Tag
                        key={`tag${idx}`}
                        x={tag.xPosition * size.width}
                        y={tag.yPosition * size.height}
                        nodeRef={nodeRef}
                        trackingDraggable={trackingDraggable}
                        onMouseDown={() => {
                            if (readOnly) {
                                if (isMobile) {
                                    selectTag(idx);
                                    setIsOpen(true);
                                } else {
                                    window.open(tag.contents.productURL);
                                }
                            } else {
                                selectTag(idx);
                            }
                        }}
                        onStop={() =>
                            isDragging ? updateTag() : setIsOpen(true)
                        }
                        color={"#1ECCA2"}
                        disabled={readOnly}
                        onMouseOver={() => {
                            if (readOnly && !isMobile) {
                                selectTag(idx);
                                setIsOpen(true);
                            }
                        }}
                        onMouseLeave={readOnly && !isMobile ? cancel : () => {}}
                    />
                ))}
                {newTag.map((tag, idx) => (
                    <Tag
                        key={"new"}
                        x={tag.xPosition * size.width}
                        y={tag.yPosition * size.height}
                        nodeRef={newNodeRef}
                        trackingDraggable={trackingDraggable}
                        onStop={() => updateNewTag()}
                        color={"#bdbdbd"}
                        disabled={readOnly}
                    />
                ))}
                {isMobile ? (
                    <Dialog
                        fullWidth
                        open={isOpen}
                        onClose={() => setIsOpen(false)}
                    >
                        {/* <DialogTitle>Subscribe</DialogTitle> */}
                        <DialogContent onClick={(e) => e.stopPropagation()}>
                            <div style={{ padding: isMobile ? 0 : "10px" }}>
                                {readOnly ? (
                                    <>
                                        <div
                                            style={{
                                                // color: "white",
                                                // fontSize: "larger",
                                                cursor: "pointer",
                                                overflowWrap: "anywhere",
                                                textAlign: "start",
                                            }}
                                        >
                                            {tagDataLabels.map(
                                                (tagDataLabel) => (
                                                    <div
                                                        style={{
                                                            margin: "3px",
                                                        }}
                                                        key={`label-${tagDataLabel.label}`}
                                                    >
                                                        <b>{`${tagDataLabel.label}: `}</b>

                                                        {tagDataLabel.key ==
                                                        "productURL" ? (
                                                            <Link
                                                                href={
                                                                    tagData[
                                                                        tagDataLabel
                                                                            .key
                                                                    ]
                                                                }
                                                            >
                                                                {
                                                                    tagData[
                                                                        tagDataLabel
                                                                            .key
                                                                    ]
                                                                }
                                                            </Link>
                                                        ) : (
                                                            tagData[
                                                                tagDataLabel.key
                                                            ]
                                                        )}
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {tagDataLabels.map((tagDataLabel) =>
                                            tagDataLabel.type === "short" ? (
                                                <input
                                                    key={`label-${tagDataLabel.label}`}
                                                    type="text"
                                                    placeholder={
                                                        tagDataLabel.label
                                                    }
                                                    autoFocus={!readOnly}
                                                    onFocus={(e) =>
                                                        e.currentTarget.select()
                                                    }
                                                    onChange={(e) => {
                                                        setTagData({
                                                            ...tagData,
                                                            [tagDataLabel.key]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    onKeyPress={(e) =>
                                                        enter(
                                                            e,
                                                            currentTagIndex < 0
                                                                ? saveTag
                                                                : updateTag
                                                        )
                                                    }
                                                    style={{
                                                        width: "calc(100% - 18px)",
                                                        outlineColor: "#1ECCA2",
                                                        border: "solid 1px rgba(0,0,0,0.4)",
                                                        borderRadius: "5px",
                                                        height: "33px",
                                                        display: "flex",
                                                        // fontSize: "larger",
                                                        cursor: "pointer",
                                                        marginBottom: "10px",
                                                        paddingLeft: "8px",
                                                        paddingRight: "8px",
                                                    }}
                                                    value={
                                                        tagData[
                                                            tagDataLabel.key
                                                        ] || ""
                                                    }
                                                    readOnly={readOnly}
                                                />
                                            ) : (
                                                <textarea
                                                    key={`label-${tagDataLabel.label}`}
                                                    placeholder={
                                                        tagDataLabel.label
                                                    }
                                                    onChange={(e) => {
                                                        setTagData({
                                                            ...tagData,
                                                            [tagDataLabel.key]:
                                                                e.target.value,
                                                        });
                                                    }}
                                                    onKeyPress={(e) =>
                                                        enter(
                                                            e,
                                                            currentTagIndex < 0
                                                                ? saveTag
                                                                : updateTag
                                                        )
                                                    }
                                                    style={{
                                                        width: "calc(100% - 18px)",
                                                        outlineColor: "#1ECCA2",
                                                        border: "solid 1px rgba(0,0,0,0.4)",
                                                        borderRadius: "5px",
                                                        display: "flex",
                                                        // fontSize: "larger",
                                                        cursor: "pointer",
                                                        padding: "8px",
                                                        marginBottom: "10px",
                                                        resize: "none",
                                                        height: "5rem",
                                                    }}
                                                    value={
                                                        tagData[
                                                            tagDataLabel.key
                                                        ] || ""
                                                    }
                                                    readOnly={readOnly}
                                                />
                                            )
                                        )}
                                    </>
                                )}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            {!readOnly && (
                                <Button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        currentTagIndex < 0
                                            ? cancel()
                                            : deleteTag();
                                    }}
                                >
                                    {currentTagIndex < 0 ? "취 소" : "삭 제"}
                                </Button>
                            )}
                            <Button
                                variant="contained"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    readOnly
                                        ? cancel()
                                        : currentTagIndex < 0
                                        ? saveTag()
                                        : updateTag();
                                }}
                            >
                                {currentTagIndex < 0 ? "저 장" : "확 인"}
                            </Button>
                        </DialogActions>
                    </Dialog>
                ) : (
                    <Fade in={isOpen} timeout={{ enter: 200, exit: 0 }}>
                        <div>
                            <Tooltip
                                x={x * size.width}
                                y={y * size.height + 12}
                                width={readOnly ? 200 : 250}
                                height={"auto"}
                                onClick={(e) => e.stopPropagation()}
                                toggleModal={() => setIsOpen(false)}
                                backgroundColor={
                                    readOnly ? "rgba(0,0,0,0.7)" : "white"
                                }
                            >
                                <div style={{ padding: "10px" }}>
                                    {readOnly ? (
                                        <div
                                            style={{
                                                color: "white",
                                                fontSize: "larger",
                                                cursor: "pointer",
                                                overflowWrap: "anywhere",
                                                textAlign: "start",
                                            }}
                                        >
                                            {tagDataLabels.map(
                                                (tagDataLabel) => (
                                                    <div
                                                        style={{
                                                            margin: "3px",
                                                        }}
                                                        key={`label-${tagDataLabel.label}`}
                                                    >
                                                        <b>{`${tagDataLabel.label}: `}</b>
                                                        {
                                                            tagData[
                                                                tagDataLabel.key
                                                            ]
                                                        }
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    ) : (
                                        <>
                                            {tagDataLabels.map((tagDataLabel) =>
                                                tagDataLabel.type ===
                                                "short" ? (
                                                    <input
                                                        key={`label-${tagDataLabel.label}`}
                                                        type="text"
                                                        placeholder={
                                                            tagDataLabel.label
                                                        }
                                                        autoFocus={!readOnly}
                                                        onFocus={(e) =>
                                                            e.currentTarget.select()
                                                        }
                                                        onChange={(e) => {
                                                            setTagData({
                                                                ...tagData,
                                                                [tagDataLabel.key]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                        onKeyPress={(e) =>
                                                            enter(
                                                                e,
                                                                currentTagIndex <
                                                                    0
                                                                    ? saveTag
                                                                    : updateTag
                                                            )
                                                        }
                                                        style={{
                                                            width: "calc(100% - 18px)",
                                                            outlineColor:
                                                                "#1ECCA2",
                                                            border: "solid 1px rgba(0,0,0,0.4)",
                                                            borderRadius: "5px",
                                                            height: "33px",
                                                            display: "flex",
                                                            fontSize: "larger",
                                                            cursor: "pointer",
                                                            marginBottom:
                                                                "10px",
                                                            paddingLeft: "8px",
                                                            paddingRight: "8px",
                                                        }}
                                                        value={
                                                            tagData[
                                                                tagDataLabel.key
                                                            ] || ""
                                                        }
                                                        readOnly={readOnly}
                                                    />
                                                ) : (
                                                    <textarea
                                                        key={`label-${tagDataLabel.label}`}
                                                        placeholder={
                                                            tagDataLabel.label
                                                        }
                                                        onChange={(e) => {
                                                            setTagData({
                                                                ...tagData,
                                                                [tagDataLabel.key]:
                                                                    e.target
                                                                        .value,
                                                            });
                                                        }}
                                                        onKeyPress={(e) =>
                                                            enter(
                                                                e,
                                                                currentTagIndex <
                                                                    0
                                                                    ? saveTag
                                                                    : updateTag
                                                            )
                                                        }
                                                        style={{
                                                            width: "calc(100% - 18px)",
                                                            outlineColor:
                                                                "#1ECCA2",
                                                            border: "solid 1px rgba(0,0,0,0.4)",
                                                            borderRadius: "5px",
                                                            display: "flex",
                                                            fontSize: "larger",
                                                            cursor: "pointer",
                                                            padding: "8px",
                                                            marginBottom:
                                                                "10px",
                                                            resize: "none",
                                                            height: "5rem",
                                                        }}
                                                        value={
                                                            tagData[
                                                                tagDataLabel.key
                                                            ] || ""
                                                        }
                                                        readOnly={readOnly}
                                                    />
                                                )
                                            )}
                                        </>
                                    )}
                                    {!readOnly && (
                                        <Grid
                                            container
                                            justifyContent={"flex-end"}
                                        >
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    currentTagIndex < 0
                                                        ? cancel()
                                                        : deleteTag();
                                                }}
                                            >
                                                {currentTagIndex < 0
                                                    ? "취 소"
                                                    : "삭 제"}
                                            </Button>

                                            <Button
                                                variant="contained"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    currentTagIndex < 0
                                                        ? saveTag()
                                                        : updateTag();
                                                }}
                                            >
                                                {currentTagIndex < 0
                                                    ? "저 장"
                                                    : "확 인"}
                                            </Button>
                                        </Grid>
                                    )}
                                </div>
                            </Tooltip>
                        </div>
                    </Fade>
                )}
            </div>
            {isCropping && (
                <Slider
                    style={{ marginTop: "10px" }}
                    min={1}
                    max={3}
                    step={0.01}
                    value={zoom}
                    onChange={(value) => setZoom(value)}
                    trackStyle={{ backgroundColor: "#1ECCA2" }}
                    handleStyle={{ borderColor: "#1ECCA2" }}
                />
            )}
        </>
    );
};

export default ItemTagger;
