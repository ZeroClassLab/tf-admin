import React from "react";
import { AiOutlinePlusCircle, AiFillPlusCircle } from "react-icons/ai";
import Draggable from "react-draggable";
import { TagProps } from "../interfaces/props";

/**
 * Tag Component
 *
 * @param {@link TagProps}
 *
 */
const Tag: React.VFC<TagProps> = ({
    x,
    y,
    nodeRef,
    trackingDraggable,
    onMouseDown,
    onStop,
    color,
    disabled,
    onMouseOver,
    onMouseLeave,
}) => {
    const size = 24; // 중앙 아이콘 사이즈
    return (
        // Draggable 라이브러리 사용
        <Draggable
            position={{ x: x - size / 2, y: y - size / 2 }} // 클릭 좌표 및 중앙정렬
            bounds={"parent"}
            nodeRef={nodeRef}
            onDrag={trackingDraggable} // 드래그 중
            onMouseDown={onMouseDown} // 마우스 클릭
            onStop={onStop} // 마우스 땠을 때
            disabled={disabled}
        >
            <div
                style={{
                    position: "absolute",
                    cursor: disabled ? "pointer" : "move",
                    marginBottom: -3,
                }}
                ref={nodeRef}
            >
                <div
                    style={{
                        position: "absolute",
                        width: size - 6,
                        height: size - 6,
                        top: 3,
                        left: 3,
                        borderRadius: (size - 6) / 2,
                        boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.3)",
                    }}
                ></div>
                <AiFillPlusCircle
                    size={size}
                    color={color}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onMouseOver={onMouseOver}
                    onMouseLeave={onMouseLeave}
                    style={{
                        position: "absolute",
                    }}
                />
                <AiOutlinePlusCircle
                    size={size}
                    color={"white"}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                />
            </div>
        </Draggable>
    );
};

export default Tag;
