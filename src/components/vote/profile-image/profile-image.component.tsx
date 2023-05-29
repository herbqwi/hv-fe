import './profile-image.css'

interface IProps {
    img: string,
}

const ProfileImage = ({ img }: IProps) => {

    return <div className={`profile-image`}>
        <div className="overlay"></div>
        <img src={img? img : `https://cdn-icons-png.flaticon.com/512/168/168871.png`} alt="Profile Image" />
    </div>
}

export default ProfileImage