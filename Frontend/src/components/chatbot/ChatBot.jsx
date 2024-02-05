import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';  

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const messagesContainerRef = useRef();
  const apiKey = 'TU_CLAVE_DE_API'; 

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, sender: 'user' };
      setMessages([...messages, userMessage]);

      try {
        const response = await axios.post(
          'https://api.openai.com/v1/engines/davinci-codex/completions',
          {
            prompt: input,
            max_tokens: 50 
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${apiKey}`
            }
          }
        );

        const chatbotMessage = { text: response.data.choices[0].text, sender: 'chatbot' };
        setMessages([...messages, chatbotMessage]);
      } catch (error) {
        console.error('Error:', error.message);
      }

      setInput('');
    }
  };

  useEffect(() => {
    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
  }, [messages]);

  const toggleChat = () => {
    setIsChatExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <div className={`chat-container ${isChatExpanded ? '' : 'minimized'}`}>
      <div className="chat-header mx-auto" style={{ marginLeft: '10px' }}>
        <p style={{ marginLeft: '30px', color: 'black', fontSize: '20px' }}>Anita Maxwynn - Soporte</p>
      </div>
      <div className="options-container"></div>
      <div className="chat-content" ref={messagesContainerRef}>
        <div className="chat-messages">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`} style={{ marginLeft: message.sender === 'chatbot' ? 0 : 'auto' }}>
              {message.text}
            </div>
          ))}
        </div>
      </div>
      <div className="chat-input text-center">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escribe un mensaje..."
          style={{ fontSize: '14px', width: '80%', height: '40px' }}
        />
        <button onClick={handleSendMessage} style={{ fontSize: '14px' }}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
