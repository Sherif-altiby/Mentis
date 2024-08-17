import YouTube from 'react-youtube';
import { useAppSelector } from '../../redux/reduxHook';

const VideoPlayerComponent = () => {
  const videoLink = useAppSelector((state) => state.videoId.videoId);

  let videoId: string | null = null;

  try {
    const urlObj = new URL(videoLink);
    videoId = urlObj.searchParams.get("v");
  } catch (error) {
    console.error("Invalid video link:", videoLink);
  }

  return (
    <div>
      {videoId ? (
        <YouTube
          videoId={videoId}
          opts={{
            height: '390',
            width: '640',
            playerVars: {
              autoplay: 1,
              controls: 1,
              showinfo: 0,
              // modestbranding: 1,
              rel: 0,
              // iv_load_policy: 3,
              fs: 0,
              cc_load_policy: 0,
            },
          }}
        />
      ) : (
        <p>Invalid or missing video ID.</p>
      )}
    </div>
  );
};

export default VideoPlayerComponent;
