import React from "react";
import { TooltipProps } from "../interfaces/props";

/**
 * Tooltip component
 *
 * @param x -
 * @returns
 */
const Tooltip: React.VFC<TooltipProps> = ({
    x,
    y,
    width = 250,
    height = 300,
    backgroundColor,
    children,
}) => {
    const size = { width: width, height: height };

    return (
        <div onClick={(e) => e.stopPropagation()}>
            <div
                style={{
                    position: "relative",
                    width: "min-content",
                    left: x - size.width / 2,
                    top: y,
                    zIndex: 300,
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div
                        style={{
                            borderBottom: `8px solid ${backgroundColor}`,
                            borderLeft: "7px solid transparent",
                            borderRight: "7px solid transparent",
                            bottom: "28px",
                            width: 0,
                            zIndex: 1,
                        }}
                    ></div>
                    <div
                        style={{
                            backgroundColor: backgroundColor,
                            borderRadius: "6px",
                            color: "black",
                            fontSize: "12px",
                            fontWeight: 500,
                            height: `${size.height}px`,
                            width: `${size.width}px`,

                            boxShadow: "-3px 3px 10px 3px rgba(0,0,0,0.2)",
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tooltip;
