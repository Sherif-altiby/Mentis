import "./Loading.scss";

import { motion } from "framer-motion";

const Loading = () => {

  return (
    <div className="loading-page">
      <div className="loading">
        <h3> Loading </h3>

        <motion.div className="pollet"
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{
            duration: 2,
            ease: "circInOut",
            repeat: Infinity,
            delay: 0
        }}
        ></motion.div>
        <motion.div className="pollet"
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{
            duration: 2,
            ease: "circInOut",
            repeat: Infinity,
            delay: 0.1
        }}
        ></motion.div>
        <motion.div className="pollet"
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{
            duration: 2,
            ease: "circInOut",
            repeat: Infinity,
            delay: 0.2
        }}
        ></motion.div>
        <motion.div className="pollet"
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{
            duration: 2,
            ease: "circInOut",
            repeat: Infinity,
            delay: 0.3
        }}
        ></motion.div>
        <motion.div className="pollet"
        initial={{rotate: 0}}
        animate={{rotate: 360}}
        transition={{
            duration: 2,
            ease: "circInOut",
            repeat: Infinity,
            delay: 0.4
        }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Loading;
