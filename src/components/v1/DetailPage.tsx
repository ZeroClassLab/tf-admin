import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

interface ProductTag {
    parentImage: string;
    xPosition: number;
    yPosition: number;
    productName: string;
    brand: string;
    description: string;
}

type ProductTags = ProductTag[];

interface DetailPageProps {
    curDatum: { [key: string]: any };
}

const KoreanMap: { [key: string]: string } = {
    // 1. 대표자 정보
    name: "성함",
    contact: "전화번호",
    email: "이메일",
    // 2. 카페 기본 정보
    cafeName: "카페명",
    cafeOpenDays: "카페 영업일",
    cafeClosedDays: "카페 휴무일",
    cafeStreetAddress: "카페 도로명 주소",
    cafeBuildingAddress: "카페 상세 주소",
    cafePhone: "카페 전화번호",
    cafeSignatureMenu: "카페 대표 메뉴",
    cafeMenuImages: "카페 메뉴 사진",
    cafeIsParkingAvailable: "주차 ",
    cafeIsDeliveryAvailable: "배달 ",
    cafeIsPetAllowed: "애견동반 ",
    cafeIsChildrenAllowed: "어린이동반 ",
    cafeInstagram: "인스타그램",
    cafeYoutube: "유투브",
    cafeFacebook: "페이스북",
    // 3. 카페 소개
    cafeIntroduction: "카페소개글",
    cafeStartupStory: "창업스토리",
    // 4. 창업 준비 과정
    cafeStartupPreparationTime: "준비기간",
    cafeStartupItemSearchTimeSpent: "집기류비교검색기간",
    cafeStartupMarketingMethod: "현재 마케팅 방법",
    cafeStartupExpense: "카페 창업 비용",
    cafeStartupInteriorMethod: "인테리어 진행 방법",
    cafeStartupDifficulty: "힘들었던 점",
    cafeStartupAdvice: "To. 예비창업가",
    // 5. 이미지 아이템 태거
    productTagImages: "상품이미지",
    productTagImageDescriptions: "이미지 설명",
    productTags: "태그정보",
};

const ownerInfoList = ["name", "contact", "email"];

const cafeInfoList = [
    "cafeName",
    "cafeOpenDays",
    "cafeClosedDays",
    "cafeStreetAddress",
    "cafeBuildingAddress",
    "cafePhone",
    "cafeSignatureMenu",
    "cafeMenuImages",
    "cafeIsParkingAvailable",
    "cafeIsDeliveryAvailable",
    "cafeIsPetAllowed",
    "cafeIsChildrenAllowed",
    "cafeInstagram",
    "cafeYoutube",
    "cafeFacebook",
];

const cafeIntroList = ["cafeIntroduction", "cafeStartupStory"];

const cafePreparingList = [
    "cafeStartupPreparationTime",
    "cafeStartupItemSearchTimeSpent",
    "cafeStartupMarketingMethod",
    "cafeStartupExpense",
    "cafeStartupInteriorMethod",
    "cafeStartupDifficulty",
    "cafeStartupAdvice",
];

const aboutItemTagger = [
    "productTagImages",
    "productTagImageDescriptions",
    "productTags",
];

const CafeInfos: React.VFC<DetailPageProps> = ({ curDatum }) => {
    return (
        <>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h4">
                카페 기본 정보
            </Typography>
            <Paper
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: 1000,
                    overflow: "auto",
                    p: 2,
                }}
            >
                <Grid item container spacing={3}>
                    {/* 칩들 */}
                    <Grid item sm={12}>
                        <Chip
                            sx={{ mr: 2, mt: 1 }}
                            label={`${KoreanMap[cafeInfoList[8]]}${
                                curDatum[cafeInfoList[8]]
                            }`}
                            color={
                                curDatum[cafeInfoList[8]] === "불가능"
                                    ? "error"
                                    : "primary"
                            }
                        />
                        <Chip
                            sx={{ mr: 2, mt: 1 }}
                            label={`${KoreanMap[cafeInfoList[9]]}${
                                curDatum[cafeInfoList[9]]
                            }`}
                            color={
                                curDatum[cafeInfoList[9]] === "불가능"
                                    ? "error"
                                    : "primary"
                            }
                        />
                        <Chip
                            sx={{ mr: 2, mt: 1 }}
                            label={`${KoreanMap[cafeInfoList[10]]}${
                                curDatum[cafeInfoList[10]]
                            }`}
                            color={
                                curDatum[cafeInfoList[10]] === "불가능"
                                    ? "error"
                                    : "primary"
                            }
                        />
                        <Chip
                            sx={{ mr: 2, mt: 1 }}
                            label={`${KoreanMap[cafeInfoList[11]]}${
                                curDatum[cafeInfoList[11]]
                            }`}
                            color={
                                curDatum[cafeInfoList[11]] === "불가능"
                                    ? "error"
                                    : "primary"
                            }
                        />
                    </Grid>
                    {/* 카페명 */}
                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[0]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[0]]}
                        />
                    </Grid>

                    {/* 카페전화번호 */}
                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[5]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[5]]}
                        />
                    </Grid>

                    {/* 카페 오픈 시간 */}
                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[1]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[1]]}
                        />
                    </Grid>

                    {/* 카페 클로즈 시간 */}
                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[2]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[2]]}
                        />
                    </Grid>

                    {/* 카페주소 */}
                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[3]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[3]]}
                        />
                    </Grid>

                    <Grid item sm={12} md={6}>
                        <Typography>{KoreanMap[cafeInfoList[4]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[4]]}
                        />
                    </Grid>

                    {/* 카페 대표메뉴 */}
                    <Grid item sm={12}>
                        <Typography>{KoreanMap[cafeInfoList[6]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[6]]}
                        />
                    </Grid>
                    {/* sns */}
                    <Grid item sm={4}>
                        <Typography>{KoreanMap[cafeInfoList[12]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[12]] || "없음"}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>{KoreanMap[cafeInfoList[13]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[13]] || "없음"}
                        />
                    </Grid>
                    <Grid item sm={4}>
                        <Typography>{KoreanMap[cafeInfoList[14]]}</Typography>
                        <TextField
                            fullWidth
                            disabled
                            value={curDatum[cafeInfoList[14]] || "없음"}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

const CafeMenuImages: React.VFC<DetailPageProps> = ({ curDatum }) => {
    return (
        <Grid item sm={12}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                {KoreanMap[cafeInfoList[7]]}
            </Typography>
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
                elevation={3}
            >
                {curDatum[cafeInfoList[7]].map((src: string, idx: number) => {
                    return (
                        <Paper
                            key={`menuimage-${idx}`}
                            sx={{
                                m: 2,
                                background: `url(${src})`,
                                backgroundRepeat: "no-repeat",
                                backgroundSize: "contain",
                                width: 200,
                                height: 150,
                                backgroundPosition: "center",
                            }}
                        />
                    );
                })}
            </Paper>
        </Grid>
    );
};

const CafeIntroduction: React.VFC<DetailPageProps> = ({ curDatum }) => {
    return (
        <>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h4">
                카페 기본 정보
            </Typography>
            <Paper
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: 650,
                    overflow: "auto",
                    p: 2,
                }}
            >
                <Grid item container spacing={3}>
                    <Grid item sm={12}>
                        <Typography>{KoreanMap[cafeIntroList[0]]}</Typography>
                        <TextField
                            multiline
                            fullWidth
                            disabled
                            value={curDatum[cafeIntroList[0]]}
                        />
                    </Grid>
                    <Grid item sm={12}>
                        <Typography>{KoreanMap[cafeIntroList[1]]}</Typography>
                        <TextField
                            multiline
                            fullWidth
                            disabled
                            value={curDatum[cafeIntroList[1]]}
                        />
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

const CafePreparation: React.VFC<DetailPageProps> = ({ curDatum }) => {
    return (
        <Grid item sm={12}>
            <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                창업 준비 과정
            </Typography>
            <Paper
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    p: 2,
                    maxHeight: 2000,
                }}
                elevation={3}
            >
                <Grid item container spacing={3}>
                    {cafePreparingList.map((info, idx) => {
                        return (
                            <Grid key={`cafe-preparing-${idx}`} item sm={12}>
                                <Typography>{KoreanMap[info]}</Typography>
                                <TextField
                                    multiline
                                    fullWidth
                                    disabled
                                    value={curDatum[info]}
                                />
                            </Grid>
                        );
                    })}
                </Grid>
            </Paper>
        </Grid>
    );
};

const ProductTagView: React.VFC<ProductTag> = ({
    parentImage,
    xPosition,
    yPosition,
    productName,
    brand,
    description,
}) => {
    return (
        <>
            <Typography variant="h6">{productName}</Typography>
            <Typography sx={{ fontStyle: "italic" }} variant="body1">
                {brand}
            </Typography>
            <Typography variant="body2">{description}</Typography>
        </>
    );
};

const AboutImageItemTagger: React.VFC<DetailPageProps> = ({ curDatum }) => {
    const [hasTags, setHasTags] = useState(false);
    return (
        <>
            <Typography sx={{ mt: 2, mb: 2 }} variant="h4">
                카페 상품 이미지들
            </Typography>
            <Paper
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    maxHeight: "100%",
                    overflow: "auto",
                    p: 2,
                }}
            >
                <Grid item container spacing={3}>
                    <Grid item sm={12}>
                        {curDatum[aboutItemTagger[0]].map(
                            (image: string, idx: number) => {
                                return (
                                    <Paper
                                        sx={{
                                            height: 200,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            m: 2,
                                        }}
                                        key={`tagimage-${idx}`}
                                    >
                                        <Box
                                            sx={{
                                                m: 2,
                                                background: `url(${image})`,
                                                backgroundRepeat: "no-repeat",
                                                backgroundSize: "contain",
                                                width: 200,
                                                height: 180,
                                                backgroundPosition: "center",
                                            }}
                                        />
                                        {/* 이미지 설명 */}
                                        <Box
                                            sx={{
                                                m: 2,
                                                width: 200,
                                                height: 180,
                                                overflow: "auto",
                                            }}
                                        >
                                            <Typography
                                                key={`imagedesc-${idx}`}
                                            >
                                                {curDatum[aboutItemTagger[1]][
                                                    idx
                                                ] || "설명이 없습니다."}
                                            </Typography>
                                        </Box>
                                        {/* tag 설명들 */}
                                        <Box
                                            sx={{
                                                m: 2,
                                                p: 2,
                                                width: 200,
                                                height: 150,
                                                overflow: "auto",
                                                boxShadow:
                                                    "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                                            }}
                                        >
                                            {curDatum[aboutItemTagger[2]].map(
                                                (
                                                    tag: ProductTag,
                                                    idx2: number
                                                ) => {
                                                    // console.log(
                                                    //     tag.parentImage
                                                    // );
                                                    // console.log(image);
                                                    if (
                                                        tag.parentImage ===
                                                        image
                                                    ) {
                                                        !hasTags &&
                                                            setHasTags(true);
                                                        return (
                                                            <ProductTagView
                                                                key={`pi-${tag.parentImage}-tag-${idx2}`}
                                                                parentImage={
                                                                    tag.parentImage
                                                                }
                                                                xPosition={
                                                                    tag.xPosition
                                                                }
                                                                yPosition={
                                                                    tag.yPosition
                                                                }
                                                                productName={
                                                                    tag.productName
                                                                }
                                                                brand={
                                                                    tag.brand
                                                                }
                                                                description={
                                                                    tag.description
                                                                }
                                                            />
                                                        );
                                                    }
                                                }
                                            )}
                                            {!hasTags && (
                                                <Typography>
                                                    태그가 없습니다.
                                                </Typography>
                                            )}
                                        </Box>
                                    </Paper>
                                );
                            }
                        )}
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

const DetailPage: React.VFC<DetailPageProps> = ({ curDatum }) => {
    useEffect(() => {
        const prevCs = JSON.parse(localStorage.getItem("checkeds") || "[]");
        let checkeds = [...prevCs, curDatum.contact];
        checkeds = checkeds.filter(function (item, pos) {
            return checkeds.indexOf(item) == pos;
        });
        console.log(curDatum.cafeMenuImages);
        localStorage.setItem("checkeds", JSON.stringify(checkeds));
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Typography sx={{ mt: 2, mb: 2 }} variant="h4">
                        대표님 정보
                    </Typography>
                    <Paper
                        sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            height: 100,
                            overflow: "auto",
                        }}
                    >
                        {/* 사장님 정보 */}
                        {ownerInfoList.map((info, idx) => {
                            return (
                                <Box key={`ownerinfo-${idx}`} sx={{ m: 2 }}>
                                    <Typography>{KoreanMap[info]}</Typography>
                                    <TextField
                                        disabled
                                        value={curDatum[info]}
                                    />
                                </Box>
                            );
                        })}
                    </Paper>
                </Grid>
                {/* 카페 기본 정보 */}
                <Grid container item xs={12}>
                    <CafeInfos curDatum={curDatum} />
                </Grid>
                <Grid container item xs={12}>
                    <CafeMenuImages curDatum={curDatum} />
                </Grid>
                <Grid container item xs={12}>
                    <CafeIntroduction curDatum={curDatum} />
                </Grid>
                <Grid container item xs={12}>
                    <CafePreparation curDatum={curDatum} />
                </Grid>
                <Grid container item xs={12}>
                    <AboutImageItemTagger curDatum={curDatum} />
                </Grid>
            </Grid>
            {/* {JSON.stringify(curDatum)} */}
        </Container>
    );
};

export default DetailPage;
