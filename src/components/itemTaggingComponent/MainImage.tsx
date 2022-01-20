import { useState } from "react";
import { ImageList } from "./components/ImageList";
import { useRecoilState, RecoilState } from "recoil";
import { Button } from "@mui/material";

interface MainImageProps {
    maxImageNum?: number;
    mainImageFilesRecoil: RecoilState<File[]>;
}

const MainImage: React.VFC<MainImageProps> = ({
    maxImageNum = 5,
    mainImageFilesRecoil,
}) => {
    const size = { width: 720, height: 720 * (3 / 5) };

    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [mainImageFiles, setMainImageFiles] =
        useRecoilState<File[]>(mainImageFilesRecoil);

    return (
        <div>
            <div style={{ marginTop: "10px" }}>
                <ImageList
                    originalFiles={mainImageFiles}
                    setOriginalFiles={setMainImageFiles}
                    currentImageIndex={currentImageIndex}
                    setCurrentImageIndex={setCurrentImageIndex}
                    imageMaxNum={maxImageNum}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
                {mainImageFiles.length > 0 && (
                    <Button
                        variant="contained"
                        onClick={() => {
                            if (
                                currentImageIndex ===
                                    mainImageFiles.length - 1 &&
                                currentImageIndex > 0
                            ) {
                                setCurrentImageIndex(currentImageIndex - 1);
                            }

                            setMainImageFiles(
                                mainImageFiles.filter(
                                    (_file: File, idx: number) =>
                                        idx !== currentImageIndex
                                )
                            );
                        }}
                    >
                        {currentImageIndex + 1}번 사진 삭제하기
                    </Button>
                )}
            </div>
        </div>
    );
};

export default MainImage;
