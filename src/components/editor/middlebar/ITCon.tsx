import React from "react";
import { CroppableItemTagger } from "@zclab/react-item-tagger";

/**
 * 아이템 태거 컨테이너
 *
 *  * 680 * 459, 328 * 264
 */
const ITCon = () => {
    return (
        <CroppableItemTagger
            // readOnly
            backgroundImage=""
            tagDataLabels={[{ label: "안녕", key: "hello", type: "short" }]}
        />
    );
};

export default ITCon;
