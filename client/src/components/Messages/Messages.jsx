import React,{useEffect, useRef} from 'react'
import ScrollToBottom from 'react-scroll-to-bottom'
import Message from '../Message/Message.jsx'
import './Messages.css'

// const Messages = (props)=>(
//     <ScrollToBottom class='messages'>
//         {props.messages.map((message,index)=>
//         <div key={index}>
//             <Message name={props.name} message={message} />
//         </div>
//         )}
//     </ScrollToBottom>
// )

const Messages = ({ messages, name }) => {
    const messagesEndRef = useRef(null);
    const scrollToBottom = () => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    return (
        <div className="messages">
            {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default Messages