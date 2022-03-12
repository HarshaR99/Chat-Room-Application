import React,{useState} from 'react'
import {Link} from 'react-router-dom' 
import './Join.css'

const Join = ()=>{
    const [name,setName] = useState('')
    const [room,setRoom] = useState('')
    const handleName = (event)=>{
        setName(event.target.value)
    } 
    const handleRoom = (event)=>{
        setRoom(event.target.value)
    }
    const handleClick = (event)=>{
        if(!room || !name){
            event.preventDefault()
        }
    }
    return (
        <div className="joinOuterContainer">
            <div className="joinInnerConatiner">
                <h1 className="heading">Join</h1>
                <div><input placeholder="Name" className="joinInput" type="text" onChange={handleName}/></div>
                <div><input placeholder="Room" className="joinInput mt-20" type="text" onChange={handleRoom}/></div>
            <Link onClick={handleClick} to={`/chat?name=${name}&room=${room}`}>
            <button className="button mt-20" type="submit">Sign In</button>
            </Link>
            </div>
        </div>
    )
}

export default Join