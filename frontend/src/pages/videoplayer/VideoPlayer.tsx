    import Nav from "../../components/Navbar/Nav"
    import "./VideoPlayer.scss";
    import 'video.js/dist/video-js.css';

    import VideoPlayerComponent from './VideoPlayerComponent';  
    import { useAppSelector , useAppDispatch} from "../../redux/reduxHook";
    import { setVideoId } from "./videoSlice";

    const VideoPlayer = () => {   
 
        const allVideos = useAppSelector((state) => state.videoId.allVideos)
        const videoId = useAppSelector((state) => state.videoId.videoId);


        const dispatch = useAppDispatch()



    return (
        <div className="video__player__page" >
            <Nav />
            <div className="video__player__content">
                <div className="video__content">
                    <div className="video__container">
                       <VideoPlayerComponent />
                    </div>
                </div>
                <div className="video__list">
                    {allVideos.map((video, index) => (
                        <div className={`subject__video ${video.file_path === videoId ? 'active' : ''} `} 
                           id={video.title}
                           onClick={() => dispatch(setVideoId(video.file_path))}
                         > 
                            <h2> {video.title} </h2> 
                            <div className="num"> ({index + 1}) </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
    }

    export default VideoPlayer