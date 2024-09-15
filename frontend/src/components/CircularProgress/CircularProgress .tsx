import React, { useState, useEffect } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps {
  initialTime: number; // Time in seconds
}

const CircularProgress: React.FC<CircularProgressProps> = ({ initialTime }) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [progress, setProgress] = useState(100); // Start at 100%

  useEffect(() => {
    const totalDuration = initialTime * 1000; // Total duration in milliseconds

    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(interval); // Stop when it reaches 0
          return 0;
        }
        return prevTime - 1; // Decrease by 1 second
      });

      // Update progress based on time remaining
      setProgress((timeRemaining - 1) / initialTime * 100);
    }, 1000); // Update every second

    // Clear the interval on component unmount
    return () => clearInterval(interval);
  }, [initialTime, timeRemaining]);

  // Helper function to format the time into HH:MM:SS
  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div style={{ width: 200, height: 200 }}>
      <CircularProgressbar
        value={progress}
        text={formatTime(timeRemaining)} // Display the real-time HH:MM:SS format
        styles={buildStyles({
          textSize: '16px',
          pathColor: `rgba(62, 152, 199, ${progress / 100})`,
          textColor: '#000',
          trailColor: '#d6d6d6',
        })}
      />
    </div>
  );
};

export default CircularProgress;
