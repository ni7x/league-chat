
const AvatarUpload = (props) => {
    let handleAvatarChange = (e) => {
        props.setAvatar(e.target.files[0]);
    }
    return(
        <>
            <input onChange={handleAvatarChange} type="file" id="avatar" name="avtr" accept="image/*"></input>
        </>
    )
}

export default AvatarUpload;