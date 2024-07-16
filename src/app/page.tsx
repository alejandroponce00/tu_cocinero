// app/chat/page.tsx

'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className='text-center rounded-lg '>
      <h1 className='text-5xl text-center my-3'>Tu Asistente</h1>
      {messages.map((m) => (
        <div key={m.id} className='text-blue-600'>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} >
        <input
          value={input}
          placeholder="Preguntame Algo"
          onChange={handleInputChange}className="bg-white my-5"
        />
      </form>
    </div>
  );
}
