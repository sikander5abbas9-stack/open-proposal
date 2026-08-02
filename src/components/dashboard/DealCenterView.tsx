import React, { useState } from 'react';

interface DealCenterViewProps {
  userName?: string;
}

export const DealCenterView: React.FC<DealCenterViewProps> = ({
  userName = 'Tahir Khan'
}) => {
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>('1');
  const [messageInput, setMessageInput] = useState('');

  const rooms = [
    {
      id: '1',
      type: 'DIRECT',
      title: 'Direct: Logo Design and Brand Identity',
      date: '2026-07-24',
      lastReply: userName,
      snippet: 'Hi, thanks for reaching out. I design clean, minimalist logos and brand identities, and I can definitely help with your business logo. To m...',
      messagesCount: 3,
      docsCount: 0,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '2',
      type: 'JOB',
      title: 'Open job in a new window Brand Design Studio Roster Posted 5 minutes ago Worldwide Summary',
      date: '2026-07-23',
      lastReply: userName,
      snippet: 'Thanks for laying out expectations clearly. Understood: every deliverable will match or exceed the quality bar from the work we shared, Lim...',
      messagesCount: 3,
      docsCount: 0,
      profile: 'Logo Design and Brand Identity'
    },
    {
      id: '3',
      type: 'JOB',
      title: 'Open job in a new window Photoshop Compositor and Logo Designer Needed - Pixel-Aligned Port...',
      date: '2026-07-18',
      lastReply: userName,
      snippet: 'Here is a short message you can send to the client, asking for the exact number of hours: --- I can deliver this today. Please tell me in ho...',
      messagesCount: 15,
      docsCount: 0,
      profile: 'Logo Design and Brand Identity'
    }
  ];

  const currentRoom = rooms.find(r => r.id === selectedRoomId) || rooms[0];

  return (
    <div className="space-y-6 font-sans text-slate-900 pb-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400">
            /DEAL-CENTER
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-1">
            SALMANZIACHATTHA107'S WORKSPACE · DEAL INBOX
          </div>
          <h1 className="text-3xl font-serif font-bold text-slate-900 tracking-tight mt-0.5">
            Deal Center
          </h1>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <button className="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold cursor-pointer transition-all">
            From proposal
          </button>
          <button className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-sm font-bold cursor-pointer transition-all">
            Direct message
          </button>
        </div>
      </div>

      {/* Main Deal Inbox Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Rooms List (4 cols) */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-sm p-4 space-y-3 shadow-2xs font-mono">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Rooms</h3>
              <span className="text-[10px] text-slate-400">{rooms.length} recent</span>
            </div>
            <input
              type="text"
              placeholder="Search rooms..."
              className="bg-slate-50 border border-slate-200 rounded-sm px-2.5 py-1 text-[11px] text-slate-900 placeholder-slate-400 focus:outline-none"
            />
          </div>

          <div className="space-y-2">
            {rooms.map(room => (
              <div
                key={room.id}
                onClick={() => setSelectedRoomId(room.id)}
                className={`p-3 rounded-sm border transition-all cursor-pointer space-y-1.5 ${
                  selectedRoomId === room.id
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-900'
                }`}
              >
                <div className="flex items-center justify-between text-[10px]">
                  <span className={`px-1.5 py-0.2 rounded-sm font-bold ${
                    selectedRoomId === room.id ? 'bg-emerald-500 text-slate-950' : 'bg-slate-200 text-slate-800'
                  }`}>
                    {room.type}
                  </span>
                  <span className={selectedRoomId === room.id ? 'text-slate-400' : 'text-slate-400'}>
                    {room.date}
                  </span>
                </div>

                <div className="font-sans font-bold text-xs truncate">
                  {room.title}
                </div>

                <p className={`text-[11px] font-sans line-clamp-2 ${
                  selectedRoomId === room.id ? 'text-slate-300' : 'text-slate-600'
                }`}>
                  {room.snippet}
                </p>

                <div className={`text-[10px] pt-1 flex items-center justify-between border-t ${
                  selectedRoomId === room.id ? 'border-slate-800 text-slate-400' : 'border-slate-200 text-slate-500'
                }`}>
                  <span>{room.messagesCount} messages</span>
                  <span>{room.profile}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Room Chat & Context Area (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-sm p-6 space-y-6 shadow-2xs font-mono">
          
          {/* Room Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase">/DEAL-CENTER / {currentRoom.id}</div>
              <h2 className="text-base font-bold font-serif text-slate-900">{currentRoom.title}</h2>
              <div className="text-[11px] text-slate-500 font-sans">BD, CTO, developer, and AI history</div>
            </div>

            <div className="flex items-center gap-2 text-xs">
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold">
                ⓘ CONTEXT
              </button>
              <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm font-semibold">
                📄 ARTIFACTS
              </button>
            </div>
          </div>

          {/* Messages Stream */}
          <div className="min-h-64 space-y-4 bg-slate-50 border border-slate-200 p-4 rounded-sm text-xs">
            
            {/* System banner */}
            <div className="bg-slate-200/60 border border-slate-300 p-3 rounded-sm text-center text-[11px] text-slate-700">
              <span className="font-bold text-slate-900">System</span> · 8/1/2026, 8:07:25 PM
              <div className="font-sans text-slate-800 font-medium mt-0.5">
                Direct message deal room opened.
              </div>
            </div>

            {/* Client message snippet */}
            <div className="bg-white border border-slate-200 p-3.5 rounded-sm space-y-1">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-slate-800">Client Inquiry</span>
                <span>8:08 PM</span>
              </div>
              <p className="font-sans text-slate-800 text-xs">
                Hi Tahir, we reviewed your proposal for our logo identity overhaul. Can you provide a fast 2-day timeline and deliver vector AI formats?
              </p>
            </div>

            {/* Tahir reply */}
            <div className="bg-slate-900 text-white p-3.5 rounded-sm space-y-1 ml-6">
              <div className="flex items-center justify-between text-[10px] text-slate-400">
                <span className="font-bold text-emerald-400">{userName}</span>
                <span>8:10 PM</span>
              </div>
              <p className="font-sans text-slate-100 text-xs">
                Yes, absolutely! I design clean minimalist logos and brand identities. I deliver AI, SVG, PNG, and full brand guideline PDFs. Let me know when you'd like to initiate the contract!
              </p>
            </div>

          </div>

          {/* Quick Prompt Action Pills */}
          <div className="flex flex-wrap gap-2 text-[11px]">
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm cursor-pointer">
              Client reply
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm cursor-pointer">
              Interview prep
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm cursor-pointer">
              Test task plan
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm cursor-pointer">
              CTO brief
            </button>
            <button className="px-3 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 rounded-sm cursor-pointer">
              Developer handoff
            </button>
          </div>

          {/* Input Box */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Paste client message or ask what to do next..."
              value={messageInput}
              onChange={e => setMessageInput(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-sm px-3.5 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-400"
            />
            <button className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-sm text-xs cursor-pointer">
              Send
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
