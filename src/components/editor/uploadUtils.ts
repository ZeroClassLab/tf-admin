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
    return fetch(url)
        .then(function (res) {
            return res.arrayBuffer();
        })
        .then(function (buf) {
            return new File([buf], filename, { type: mimeType });
        });
};
