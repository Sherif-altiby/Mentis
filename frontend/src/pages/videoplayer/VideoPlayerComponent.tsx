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
    <div className='course__video' >
      {videoId ? (
        <YouTube
          videoId={videoId}
          opts={{
            height: '500px',
            width: '100%',
            playerVars: {
              autoplay: 1,
              controls: 1,
              showinfo: 0,
              rel: 0,
               fs: 0,
              cc_load_policy: 0,
            },
          }}
        />
      ) : (
        <p> حدث خطا في تحيل الفديو </p>
      )}
    </div>
  );
};

export default VideoPlayerComponent;
