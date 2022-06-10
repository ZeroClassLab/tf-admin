import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useRecoilState, useRecoilValue } from "recoil";
import {
    currentHashtagsState,
    formBoardTypeState,
    formHashtagListState,
} from "../editor/recoils";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const HashtagChipSelect = () => {
    const curBoard = useRecoilValue(formBoardTypeState);
    const [hashtagList, setHashtagList] = useRecoilState(formHashtagListState);
    const [hashtags, setHashtags] = useRecoilState(currentHashtagsState);

    useEffect(() => {
        const fetchHashtagList = async () => {
            if (curBoard) {
                const hashtagList = await axios.get(
                    `${process.env.REACT_APP_MAIN_BACK}/board/${curBoard.name}/hashtag/all`
                );
                console.log(hashtagList);
                setHashtagList(hashtagList.data);
            }
        };
        setHashtags([]);
        fetchHashtagList();
    }, [curBoard]);

    const handleChange = (event: SelectChangeEvent<typeof hashtags>) => {
        const {
            target: { value },
        } = event;
        setHashtags(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
    };

    return (
        <Box sx={{ m: 2 }}>
            <FormControl fullWidth>
                <InputLabel id="hashtags-label">해시태그</InputLabel>
                <Select
                    labelId="hashtags-label"
                    id="hashtags"
                    multiple
                    value={hashtags}
                    onChange={handleChange}
                    input={
                        <OutlinedInput
                            id="select-multiple-chip"
                            label="해시태그"
                        />
                    }
                    renderValue={(selected) => (
                        <Box
                            sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}
                        >
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {hashtagList.map((hashtag) => (
                        <MenuItem key={hashtag._id} value={hashtag.name}>
                            {hashtag.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
};

export default HashtagChipSelect;
