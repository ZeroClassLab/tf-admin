/**
 * 서비스에서의 유저 롤
 */
export enum USER_ROLE {
    PRE = "예비 창업자",
    OWN = "창업자",
    EDI = "에디터",
    DEV = "개발자",
    ADM = "관리자",
}

/**
 * 에디터로 넘어오는 유저의 타입
 */
export interface EditorUser {
    _id: string;
    userID: number;
    nickname: string;
    businessName?: string;
}
