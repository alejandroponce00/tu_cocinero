'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import Fondo from './components/fondo/fondo';
import { FlipWords } from "../app/components/ui/flip-words";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageContainerRef = useRef<HTMLDivElement>(null);
  const previousMessagesCount = useRef(messages.length); // Mantiene un conteo previo de los mensajes

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const messageContainer = messageContainerRef.current;
    const isAddingNewMessage = messages.length > previousMessagesCount.current;

    if (isAddingNewMessage) {
      scrollToBottom();
    } else if (messageContainer) {
      // Mantener la posición de scroll cuando se cargan mensajes anteriores
      messageContainer.scrollTop = messageContainer.scrollHeight - messageContainer.clientHeight;
    }

    previousMessagesCount.current = messages.length;
  }, [messages]);

  return (
    <div className='text-center rounded-lg p-4 mx-2.5 '>
      <Fondo />
      <h1 className='text-5xl text-center my-3 text-slate-800 font-bold mb-10'>Tu Cocinero Virtual</h1>
      <h4 className='text-4xl font-mono '><FlipWords words={["Pastas", "Ensaladas", "Postres"]} /><br /></h4> 
      <h6 className=' text-2xl text-center my-3 text-black mb-10'>Dime qué ingredientes tienes y te diré qué puedes cocinar...</h6>

      <div 
        ref={messageContainerRef} 
        className='mb-4 max-h-96 h-full overflow-y-scroll'
      >
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`p-2 my-2 rounded-md ${m.role === 'user' ? 'bg-blue-200 text-left opacity-60' : 'bg-green-200 text-right opacity-60'}`}
          >
            {m.role === 'user' ? 'YO: ' : 'ASISTENTE: '}
            {m.content}
          </div>
        ))}
        <div ref={messagesEndRef} /> {/* Referencia al final de los mensajes */}
      </div>

      <form onSubmit={handleSubmit} className='flex'>
        <input
          value={input}
          placeholder="A cocinar!"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button className='bg-amber-400 text-white px-3 py-2 rounded-md'>
          enviar
        </button>
      </form>
      <footer className='mt-20 text-slate-600'>creado por Alejandro Ponce</footer>
   
    </div>
  );
}
