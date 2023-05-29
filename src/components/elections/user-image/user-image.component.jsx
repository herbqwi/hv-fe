import './user-image.css'
import eren from './eren.webp'

const UserImage = ({img}) => {
    return <div className={`user-image-container`}>
        <img src={img} alt="" />
    </div >
}

export default UserImage