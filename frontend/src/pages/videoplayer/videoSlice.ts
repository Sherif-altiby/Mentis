import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type VideoProps = {
    file_path: string;
    course_id: number;
    level: string;
    title: string;
    id: number;
}

export interface VideoIdProps {
   videoId: string;
   allVideos: VideoProps[];
}

const initialState: VideoIdProps = {
    videoId: localStorage.getItem("videoId") || '',
    allVideos: JSON.parse(localStorage.getItem("allVideos") || '[]'),  
};

const VideoSlice = createSlice({
    name: "videoId",
    initialState,
    reducers: {
        setVideoId: (state, action: PayloadAction<string>) => {
            state.videoId = action.payload;
            localStorage.setItem('videoId', action.payload);
        },

        setAllVideos: (state, action: PayloadAction<VideoProps[]>) => {
            state.allVideos = action.payload;
            localStorage.setItem('allVideos', JSON.stringify(state.allVideos));
        }
    }
});

export const { setVideoId, setAllVideos } = VideoSlice.actions;  
export default VideoSlice.reducer;
