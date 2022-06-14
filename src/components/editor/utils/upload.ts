/**
 * 데이터 url string 을 파일로 바꿔주는 함수
 * @param dataurl
 * @param filename
 * @returns
 */
export const dataURLtoFile = (dataurl: string, filename: string) => {
    let arr = dataurl.split(",");
    let mimeBefore = arr[0]?.match(/:(.*?);/);
    if (mimeBefore) {
        let mime = mimeBefore && mimeBefore[1];
        let bstr = atob(arr[1]);
        let n = bstr.length;
        let u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, { type: mime });
    }
    throw new Error("whw");
};

/**
 * url string 을파일로 바꿔주는 비동기 함수
 *
 * @param url - url
 * @param filename - 파일명
 * @param mimeType - image/png
 * @returns
 */
export const urltoFile = (
    url: string,
    filename: string,
    mimeType: string
): Promise<File> => {
    const random = new Date().getTime();
    return fetch(`${url}?timestamp=${random}`)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, { type: mimeType });
        });
};
