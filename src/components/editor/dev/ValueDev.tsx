import React from "react";
import { TNode, AnyObject } from "@udecode/plate-core";

interface ValueDevProps {
    debugValue: TNode<AnyObject>[] | undefined;
}

const ValueDev: React.VFC<ValueDevProps> = ({ debugValue }) => {
    return (
        <div
            style={{
                width: 400,
                position: "absolute",
                bottom: 10,
                right: 0,
            }}
        >
            {JSON.stringify(debugValue)}
        </div>
    );
};

export default ValueDev;
