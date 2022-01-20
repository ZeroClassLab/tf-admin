export enum InputFieldType {
    BASIC = "basic",
    LONG = "long",
    IMAGE = "image",
    PHONE = "phone",
    MONEY = "money",
    KAKAO_ADDRESS = "kakaoaddress",
    RADIO = "radio",
    ITEMTAGGER = "itemtagger",
    NEU = "neu",
}

export const inputFieldTypeLabelMap = {
    basic: "기본",
    long: "긴",
    image: "이미지",
    money: "돈",
    phone: "전화번호",
    kakaoaddress: "주소",
    radio: "선택",
    itemtagger: "아이템태거",
    neu: "개발중...",
};

export const inputFieldTypeLabelList = [
    InputFieldType.BASIC,
    InputFieldType.LONG,
    InputFieldType.IMAGE,
    InputFieldType.MONEY,
    InputFieldType.PHONE,
    InputFieldType.KAKAO_ADDRESS,
    InputFieldType.RADIO,
    InputFieldType.ITEMTAGGER,
    InputFieldType.NEU,
];
