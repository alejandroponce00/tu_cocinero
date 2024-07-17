'use client';

import { useChat } from 'ai/react';
import Image from "next/image";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='text-center rounded-lg p-4 mx-2.5 '>
      <Image
          alt="fondo"
          src={"/imagenes/cocinando.webp"}
          className="imagen blur-sm"
          // width={"560"}
          //height={"200"}
          fill={true}
        />
      <h1 className='text-5xl text-center my-3 text-slate-800 font-bold mb-10'>Tu Cocinero Virtual</h1>
      <div className='mb-4 '>
        {messages.map((m) => (
          <div 
            key={m.id} 
            className={`p-2 my-2 rounded-md ${m.role === 'user' ? 'bg-blue-200 text-left opacity-60' : 'bg-green-200 text-right opacity-60'}`}
          >
            {m.role === 'user' ? 'YO: ' : 'ASISTENTE: '}
            {m.content}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className='flex'>
        <input
          value={input}
          placeholder="Pregúntame algo"
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </form>
    </div>
  );
}
