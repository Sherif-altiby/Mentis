import { useEffect, useRef, useState } from 'react';
import ReactConfetti from 'react-confetti';
import sound from '../../assets/clap.mp3';

const QuizzesView = () => {
  const [windowDimension, setDimension] = useState({ width: window.innerWidth, height: window.innerHeight,});
  const [showFireworks, setShowFireworks] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState(100); 
  const audioRef = useRef<HTMLAudioElement | null>(null);


  const detectSize = () => {
    setDimension({ width: window.innerWidth, height: window.innerHeight });
  };

  useEffect(() => {
    window.addEventListener('resize', detectSize);
    return () => {
      window.removeEventListener('resize', detectSize);
    };  
  }, [windowDimension]);

  useEffect(() => {
    if (showFireworks) {

      audioRef.current?.play();
      
      const interval = setInterval(() => {
        setConfettiPieces((pieces) => Math.max(0, pieces - 100)); 
      }, 3000); 
      

      setTimeout(() => {
        clearInterval(interval);
        setShowFireworks(false);
        setConfettiPieces(200); 
      }, 10000); 
    }
  }, [showFireworks]);

  return (
    <div>
      <button onClick={() => setShowFireworks(true)}>FIREWORKS</button>
      {showFireworks && (
        <ReactConfetti
          width={windowDimension.width}
          height={windowDimension.height}
          numberOfPieces={confettiPieces}
          tweenDuration={1000}
        />
      )}
      <audio ref={audioRef} src={sound} />
    </div>
  );
};

export default QuizzesView;
