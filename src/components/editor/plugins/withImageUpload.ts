import {
    getInjectedPlugins,
    pipeInsertDataQuery,
    WithOverride,
} from "@udecode/plate-core";
import { insertImage } from "./image/insertImage";
import { isImageUrl } from "./image/isImageUrl";
import urlToObject from "./image/urlToObject";
import { ImagePlugin } from "./types";

let imageCount = 1;

/**
 * Allows for pasting images from clipboard.
 * Not yet: dragging and dropping images, selecting them through a file system dialog.
 * @param options.type
 * @param options.uploadImage
 */
export const withImageUpload: WithOverride<{}, ImagePlugin> = (
    editor,
    plugin
) => {
    const {
        options: { uploadImage },
    } = plugin;
    const { insertData } = editor;

    editor.insertData = async (dataTransfer: DataTransfer) => {
        console.log(dataTransfer);

        const text = dataTransfer.getData("text/plain");
        let { files } = dataTransfer;
        const isTextImageUrl = isImageUrl(text);
        if ((files && files.length > 0) || isTextImageUrl) {
            // as a editor data format
            const injectedPlugins = getInjectedPlugins(editor, plugin);
            if (
                !pipeInsertDataQuery(injectedPlugins, {
                    data: text,
                    dataTransfer,
                })
            ) {
                console.log("first case runned!");
                return insertData(dataTransfer);
            }

            if (isTextImageUrl) {
                console.log("second case run!", text);
                const file = await urlToObject(imageCount++, text);
                const reader = new FileReader();
                const [mime] = file.type.split("/");

                if (mime === "image") {
                    reader.addEventListener("load", async () => {
                        if (!reader.result) {
                            return;
                        }
                        const uploadedUrl = uploadImage
                            ? await uploadImage(reader.result)
                            : reader.result;

                        insertImage(editor, uploadedUrl);
                    });

                    reader.readAsDataURL(file);
                }
            } else {
                console.log("the third case runnded");
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const reader = new FileReader();
                    const [mime] = file.type.split("/");

                    if (mime === "image") {
                        reader.addEventListener("load", async () => {
                            if (!reader.result) {
                                return;
                            }
                            const uploadedUrl = uploadImage
                                ? await uploadImage(reader.result)
                                : reader.result;

                            insertImage(editor, uploadedUrl);
                        });

                        reader.readAsDataURL(file);
                    }
                }
            }
        } else {
            console.log("the last case run!");
            insertData(dataTransfer);
        }
    };

    return editor;
};
