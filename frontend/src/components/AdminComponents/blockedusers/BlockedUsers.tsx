import { useEffect, useState } from "react"
import { useAppSelector } from "../../../redux/reduxHook"
import { getAllBlockedUsers, unBlockUser } from "../../../utils/api"
import "../addteacher/AddTeacher.scss"
import { BlockedUsersProps } from "../../../types/index.types"
import Message from "../../message/Message"
import CustomLoading from "../../../pages/loading/CustomLoading"

const BlockedUsers = () => {

    const token = useAppSelector((s) => s.token.token)

    const [blockedUsers, setBlockedUsers] = useState<BlockedUsersProps[]>([]);
    const [filteredStudents, setFilteredStudents] = useState<BlockedUsersProps[]>([]);

    const [selectedUserName, setSelectedUserName] = useState("");
    const [selectedUserPhone, setSelectedUserPhone] = useState("");
    const [selectedUserEmail, setSelectedUserEmail] = useState("");
    const [selectedUserRole, setSelectedUserRole] = useState("");
    const [selectedUserId, setSelectedUserId] = useState(0);
    
    const [fetchLoading, setFetchLoading] = useState(false)
    const [showModal, setShowModal] = useState(false);
    const [showMsg, setShowMsg] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searchValue, setSearchValue] = useState("")

    const getBlockedUsers = async () => {
        setFetchLoading(true)
        const res = await getAllBlockedUsers(token)
        
        if(res.blocked_users){
            setBlockedUsers(res.blocked_users)
            setFetchLoading(false)
        }else{
           setBlockedUsers([])
           setFetchLoading(false)
       }
    }

    useEffect(() => {
        getBlockedUsers()
    }, [])

    useEffect(() => {
        if (blockedUsers.length > 0 && searchValue.length > 0) {
          console.log(blockedUsers);
          setFilteredStudents(
            blockedUsers.filter((student) =>
              student.user.name.toLowerCase().includes(searchValue?.toLowerCase())
            )
          );
        } else {
          setFilteredStudents(blockedUsers);
        }
      }, [searchValue, blockedUsers]);

      const adminUnblockUser = async (id: number) => {
        setLoading(true)
        const res = await unBlockUser(token, id);
        console.log(res)
        if(res.success){
            getBlockedUsers()
            setShowModal(false);
            setShowMsg(true);
            setLoading(false);
        }else{
            setShowModal(false);
            setLoading(false);
        }
      }

  return (
    <div className="admin-add-teacher">
    <div className="card">
      <h1>  قائمة المحظورين </h1>
      <div className={`card-add `}>
        {fetchLoading && <CustomLoading />}
        <Message
          closeMsg={setShowMsg}
          show={showMsg}
          message="تم فك الحظر"
        />
        <div className="input">
          <label htmlFor="name"> إسم المستخدم </label>
          <input
            type="text"
            id="name"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>

        <div className="filtered-teacher">
          {filteredStudents?.map((user) => (
            <p
              key={user.user_id}
              onClick={() => {
                setSelectedUserName(user.user.name);
                setSelectedUserId(user.user_id);
                setSelectedUserEmail(user.user.email);
                setSelectedUserRole(user.user.role);
                setSelectedUserPhone(user.user.phone_number);
                setShowModal(true);
              }}
            >
              {user.user.name}
            </p>
          ))}
        </div>
      </div>
    </div>
    <div className={`admin-controle-teacher ${showModal ? "show" : ""}`}>
      <div className="controle-card">
        {loading && <CustomLoading />}
        <div className="item">
          <div className="info">
            الاسم : <span> {selectedUserName} </span>
          </div>
          <div className="info">
            رقم التلفون : <span> {selectedUserPhone} </span>
          </div>
        </div>
        <div className="item">
          <div className="info">
            الصف : <span> {selectedUserRole} </span>
          </div>
          <div className="info">
            البريد : <span> {selectedUserEmail} </span>
          </div>
        </div>
        <div className="btn" onClick={() => adminUnblockUser(selectedUserId)} > فك الحظر </div>
        <div
          className="close-modal"
          onClick={() => {
            setShowModal(false);
          }}
        >
          X
        </div>
      </div>
    </div>
  </div>
  )
}

export default BlockedUsers