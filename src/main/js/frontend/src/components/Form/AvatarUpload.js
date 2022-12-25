
const AvatarUpload = (props) => {
    let handleAvatarChange = (e) => {
        props.setAvatar(e.target.files[0]);
    }
    return(
         <div className="setting">
            <label>Avatar:</label>
            <label htmlFor="avatar" id="upload-avatar"><i class="fa-solid fa-upload"></i></label>
            <input onChange={handleAvatarChange} type="file" id="avatar" name="avtr" accept="image/*"></input>
            <p>{props.avatar.name}</p>
        </div>
    )
}

export default AvatarUpload;