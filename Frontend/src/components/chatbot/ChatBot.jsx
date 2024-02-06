import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isChatExpanded, setIsChatExpanded] = useState(false);
  const messagesContainerRef = useRef();
  const apiKey = import.meta.env.VITE_OPENAI_API_KEY; //mustbedeleted

  const getCompletion = async (prompt) => {
    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant.'
            },
            {
              role: 'user',
              content: prompt
            }
          ]
        })
      });

      const data = await response.json();

      console.log(data);

      return data.choices[0].text;
    } catch (error) {
      console.error('Error:', error.message);
      return '';
    }
  };

  const handleSendMessage = async () => {
    if (input.trim() !== '') {
      const userMessage = { text: input, sender: 'user' };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await getCompletion(input);

        const chatbotMessage = { text: response, sender: 'chatbot' };
        setMessages((prevMessages) => [...prevMessages, chatbotMessage]);
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
