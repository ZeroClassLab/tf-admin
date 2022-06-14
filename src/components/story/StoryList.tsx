import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

import { useRecoilState, useRecoilValue } from "recoil";
import { formBoardTypeState } from "../editor/recoils";
import FormBoardSelect from "../form-tools/FormBoardSelect";
import {
    currentStoryListPageNumberState,
    currentStoryListState,
} from "./recoils";
import StoryEditPaper from "./StoryEditPaper";
import ArrowCircleLeftOutlinedIcon from "@mui/icons-material/ArrowCircleLeftOutlined";
import ArrowCircleRightOutlinedIcon from "@mui/icons-material/ArrowCircleRightOutlined";
import { PostDataInList } from "./interfaces";

const NUM_PER_PAGE = 12;

const StoryList = () => {
    const curBoard = useRecoilValue(formBoardTypeState);
    const [currentPageNumber, setCurrentPageNumber] = useRecoilState(
        currentStoryListPageNumberState
    );
    const [storyList, setStoryList] = useRecoilState(currentStoryListState);

    useEffect(() => {
        const fetchStories = async () => {
            if (curBoard) {
                const reqURL = `${
                    process.env.REACT_APP_MAIN_BACK
                }/story/list?lastIndex=${
                    currentPageNumber * NUM_PER_PAGE
                }&num=${NUM_PER_PAGE}&board=${curBoard.name}`;

                console.log("reqURL: ", reqURL);

                const stories = await axios.get<PostDataInList[]>(reqURL);
                const d = stories.data;
                console.log("nowStories:", d);
                setStoryList(d);
            }
        };
        fetchStories();
    }, [curBoard]);
    return (
        <Box>
            <Paper sx={{ m: 2 }}>
                <FormBoardSelect />
            </Paper>
            <Paper
                sx={{ m: 2, display: "flex", justifyContent: "space-between" }}
            >
                <IconButton
                    onClick={() => {
                        setCurrentPageNumber((prev) => prev - 1);
                    }}
                    disabled={currentPageNumber === 0}
                >
                    <ArrowCircleLeftOutlinedIcon />
                </IconButton>
                <IconButton
                    onClick={() => {
                        setCurrentPageNumber((prev) => prev + 1);
                    }}
                    disabled={storyList.length !== 12}
                >
                    <ArrowCircleRightOutlinedIcon />
                </IconButton>
            </Paper>
            <Grid container>
                <Grid item xs={12} flexWrap={"wrap"} display={"flex"}>
                    {storyList.map((story, idx) => {
                        return (
                            <StoryEditPaper
                                key={`story-paper-${idx}`}
                                title={story.title}
                                date={story.date}
                                views={story.views}
                                userID={story.userID}
                                postID={story.postID}
                                src={story.thumbnailImage}
                            />
                        );
                    })}
                </Grid>
            </Grid>
        </Box>
    );
};

export default StoryList;
