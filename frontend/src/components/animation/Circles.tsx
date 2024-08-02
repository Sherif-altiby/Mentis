import "./Circle.scss";
import { motion } from "framer-motion";

const Circles = () => {
  return (
    <div>
      <div className="wrpper">
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 1 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 2 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 1.5 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 2.5 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 4 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 5 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 6 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 10 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 3 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 4 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 2 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 4.5 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: 8 }}
        ></motion.div>
        <motion.div
          className="circle"
          initial={{bottom: -100}}
          animate={{ bottom: 700 }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "loop", delay: .25 }}
        ></motion.div>
      </div>
    </div>
  );
};

export default Circles;
