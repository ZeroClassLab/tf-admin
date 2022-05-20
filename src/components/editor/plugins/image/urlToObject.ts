export const urlToObject = async (count: number, imageUrl: string) => {
    const response = await fetch(imageUrl);
    const blob = await response.blob();
    const imageUrlSplit = imageUrl.split(".");
    const ext = imageUrlSplit[imageUrlSplit.length - 1];
    const file = new File([blob], `image${count}.${ext}`, { type: blob.type });
    return file;
};

export default urlToObject;
