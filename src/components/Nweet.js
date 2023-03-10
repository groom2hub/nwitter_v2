import { deleteDoc, updateDoc, arrayUnion, arrayRemove, doc } from "firebase/firestore"
import { ref, deleteObject } from "firebase/storage";
import { dbService, storageService } from "../fbase.js";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt, faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as regular_faHeart } from "@fortawesome/free-regular-svg-icons";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.nweet_text);
    const [likeIt, setLikeIt] = useState(nweetObj.like_it);

    // Delete Nweet, attachment
    const onDeleteClick = async () => {
        const ok = window.confirm("삭제하시겠습니까?");
        if (ok) {
            await fetch(`http://localhost:8000/delnweet/${nweetObj.nweet_num}`);
        }
    };

    const toggleEditing = () => setEditing((prev) => !prev);

    //Edit Nweet 입력란
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewNweet(value);
    };

    //Edit Nweet 입력값 반영
    const onSubmit = async (event) => {
        event.preventDefault();
        await fetch(`http://localhost:8000/updatenweet/${nweetObj.nweet_num}/${newNweet}`);
        setEditing(false);
    };

    // 좋아요
    const onlikeItClick = async () => {
        if (nweetObj.user_id !== isOwner.uid) {
            // if (nweetObj.likeItuserId.includes(isOwner.uid)) {
            //     const likeItCancel = window.confirm("좋아요를 취소하겠습니까?");
            //     if (likeItCancel) {
            //         await updateDoc(doc(dbService, "nweets", nweetObj.id), { likeIt: nweetObj.likeIt - 1 });
            //         await updateDoc(doc(dbService, "nweets", nweetObj.id), { likeItuserId: arrayRemove(isOwner.uid) });
            //         window.alert("좋아요가 취소되었습니다.");
            //     }
            // } else {
            const likeItOk = window.confirm("좋아요를 누르시겠습니까?");
            if (likeItOk) {
                await fetch(`http://localhost:8000/likenweet/${nweetObj.nweet_num}`);
                window.alert("좋아요");
                window.location.reload();
            }
            // }
        } else {
            window.alert("자신의 트윗에 좋아요를 누를 수 없습니다.");
        }
    };

    return(
        <div className="nweet">
            {editing ? (
                <>  
                    {/*Update Nweet Button*/}
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input 
                            onChange={onChange} 
                            value={newNweet} 
                            required 
                            placeholder="Edit your nweet"
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">
                        Cancel
                    </button>
                </>
            ) : (
                <>
                    {/*Display Nweet, attachment*/}
                    <h1>{nweetObj.user_displayname}</h1>
                    <h4>{nweetObj.nweet_text}</h4>
                    { (nweetObj.user_id === isOwner.uid && (
                        <div className="nweet__actions">
                            <span onClick={onlikeItClick} >
                                {" "} {nweetObj.like_it}
                            </span>
                            <span onClick={onDeleteClick} >
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing} >
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    )) || (
                        <div className="nweet__actions">
                            <span onClick={onlikeItClick} >
                                {" "} {nweetObj.like_it}
                            </span>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Nweet;