import './Message.scss'

const Message = ( {message, closeMsg, show}: {message: string, closeMsg: React.Dispatch<React.SetStateAction<boolean>> , show: boolean }) => {
  return (
    <div className= {show ? "action-message show" : "action-message"} >
        <div className="close" onClick={() => closeMsg(false)} > X </div>
        <h2> {message} </h2>
    </div>
  )
}

export default Message