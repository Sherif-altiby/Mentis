    import Nav from "../../components/Navbar/Nav"
    import "./VideoPlayer.scss";
    import 'video.js/dist/video-js.css';


    import VideoPlayerComponent from './VideoPlayerComponent'; // Adjust the import path as necessary

    const VideoPlayer = () => {
    
        // const videoJsOptions = {
        //     controls: true,
        //     responsive: true,
        //     fluid: true,
        //     sources: [
        //       {
        //         src: 'https://www.youtube.com/watch?v=2LRsO20nAFU', // YouTube URL
        //         type: 'video/youtube', // Correct type for YouTube videos
        //       },
        //     ],
        //   };

        //   const videoJsOptions = {
        //     controls: true,
        //     autoplay: false,
        //     preload: 'auto',
        //     sources: [
        //       {
        //         src: 'https://www.example.com/video.mp4', // Your video source URL
        //         type: 'video/youtube',
        //       },
        //     ],
        //   };
          

    return (
        <div className="video__player__page" >
            <Nav />
            <div className="video__player__content">
                <div className="video__content">
                    <div className="video">
                    <VideoPlayerComponent />
                    </div>
                </div>
                <div className="video__list">
                    <div className="subject__video"> <h2> العضوية </h2> </div>
                    <div className="subject__video"> <h2> العضوية </h2> </div>
                    <div className="subject__video"> <h2> العضوية </h2> </div>
                    <div className="subject__video"> <h2> العضوية </h2> </div>
                    <div className="subject__video"> <h2> العضوية </h2> </div>
                </div>
            </div>
        </div>
    )
    }

    export default VideoPlayer