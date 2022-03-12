import react from 'react'
import onlineIcon from '../../icons/onlineIcon.png';
import closeIcon from '../../icons/closeIcon.png';
import './InfoBar.css';

const InfoBar = (props)=>(
    <div className='infoBar'>
        <div className='leftInnerContainer'>
            <img className='onlineIcon' src={onlineIcon} alt='online image'/>
            <h3>{props.room}</h3>
        </div>
        <div className='RightInnerContainer'>
            <a href='/'><img src={closeIcon} alt='close icon'/></a>
        </div>
    </div>
)

export default InfoBar