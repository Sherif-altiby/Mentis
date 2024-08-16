import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface VideoIdProps {
   videoId: string;
}

const initialState: VideoIdProps = {
    videoId: localStorage.getItem("videoId") || '',
};

const VideoSlice = createSlice({
    name: "videoId",
    initialState,
    reducers: {
        setVideoId: (state, action: PayloadAction<string>) => {
            state.videoId = action.payload;

            localStorage.setItem('videoId', action.payload);
        }
    }
});

export const { setVideoId } = VideoSlice.actions;
export default VideoSlice.reducer;
