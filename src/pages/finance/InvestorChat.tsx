import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InvestorChat = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'Sarah Jenkins',
            text: "I've reviewed your Q3 projections. The CAC seems unusually low for this niche. How do you justify that?",
            time: '9:41 AM',
            isMe: false,
            role: 'Venture Capitalist'
        },
        {
            id: 2,
            sender: 'You',
            text: "We've leveraged a new organic referral loop that cut ad spend by 40%.",
            time: '9:42 AM',
            isMe: true
        },
        {
            id: 3,
            sender: 'Sarah Jenkins',
            text: "Interesting. If that holds up, I might reconsider the valuation cap.",
            time: '9:45 AM',
            isMe: false,
            role: 'Venture Capitalist'
        }
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'You',
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        }]);
        setMessage('');
    };

    const handleQuickReply = (text: string) => {
        setMessages(prev => [...prev, {
            id: Date.now(),
            sender: 'You',
            text: text,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isMe: true
        }]);
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white flex flex-col h-screen overflow-hidden w-full max-w-md mx-auto shadow-2xl relative border-x border-white/5">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            ::-webkit-scrollbar {
                width: 6px;
            }
            ::-webkit-scrollbar-track {
                background: transparent;
            }
            ::-webkit-scrollbar-thumb {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 3px;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: rgba(255, 255, 255, 0.2);
            }
            input:focus {
                outline: none;
            }
            `}</style>

            {/* Top App Bar / Header */}
            <header className="flex items-center justify-between p-4 bg-background-dark/95 backdrop-blur-md sticky top-0 z-10 border-b border-white/5">
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                    <button
                        onClick={() => navigate(-1)}
                        className="text-white/70 hover:text-white transition-colors flex items-center justify-center p-2 -ml-2 rounded-full hover:bg-white/5"
                    >
                        <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                    </button>
                    <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-cover bg-center ring-2 ring-primary/30" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBKGB20ZU3fWi5RV6jfD6XMHsvavpk-A8HC__xnkwxU_j81kogddM_MZlm2C5Lj9saqdQQftgkkWkghEAnnjSFUtSCZFq8eiHOom3l3BtIrQtIR_LLbKype65Aq-f5oq-IG3tjzwCIAGUjasDlVUlKGYl2XBQPd2bJ3ZpVrdG-cgVY9cebf5-4PFdsvsjBIjF3jEZZvSWSC7Vx6atDu_oSwL7TqkcoY-R8uVm9JoN5AHNYDwTBQMShIwg82_ZdmLl9EGnnhPF4SkFY")' }}></div>
                        {/* Sentiment Indicator Dot */}
                        <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-500 rounded-full border-2 border-background-dark" title="Sentiment: Positive"></div>
                    </div>
                    <div className="flex flex-col justify-center min-w-0">
                        <h2 className="text-white text-base font-bold leading-tight truncate">Sarah Jenkins</h2>
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                            <span className="truncate">Venture Capitalist</span>
                            <span className="w-1 h-1 rounded-full bg-white/30"></span>
                            <span className="text-yellow-400 font-medium">Skeptical</span>
                        </div>
                    </div>
                </div>
                <button className="flex items-center justify-center h-10 w-10 rounded-full text-white/70 hover:text-white hover:bg-white/5 transition-colors">
                    <span className="material-symbols-outlined text-[24px]">info</span>
                </button>
            </header>

            {/* Message Stream */}
            <main className="flex-1 overflow-y-auto p-4 space-y-6 flex flex-col bg-background-dark" id="chat-container">
                {/* Timestamp */}
                <div className="flex justify-center my-2">
                    <span className="text-xs font-medium text-white/30 bg-white/5 px-3 py-1 rounded-full">Today 9:41 AM</span>
                </div>

                {messages.map((msg) => (
                    <div key={msg.id} className={`flex items-end gap-3 w-full group ${msg.isMe ? 'justify-end' : ''}`}>
                        {!msg.isMe && (
                            <div className="h-8 w-8 rounded-full bg-cover bg-center shrink-0 self-end mb-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCxDNMiVgjIxN-QHrwerwqimNtVyFxZmsUgbVJGoCILmDAHRqqaBQQVnIEmFNwYH8YQ-y8aU_33hjE2iaHUCqk6dxO8SaHsJ15Te9rXnpJ-fHzjKmTlvfGzpWvmGptv_GgFcmvc9YvX2JKi2aq-frXFE20EGqrGxctQRuzsvjE9eWpqow6ejkND_YthQdVShEusKYzHCtm4ryx7djIGIuJLCiCBjyGUoYkfTtWhlT68fDR2DwZtOTdtuwyFHQpCRAMNs2wydsPfUsI")' }}></div>
                        )}
                        <div className={`flex flex-col gap-1 max-w-[80%] ${msg.isMe ? 'items-end' : ''}`}>
                            <span className={`text-white/40 text-[11px] hidden group-hover:block ${msg.isMe ? 'mr-3' : 'ml-3'}`}>{msg.sender}</span>
                            <div className={`p-4 rounded-2xl text-[15px] leading-relaxed shadow-lg ${msg.isMe ? 'rounded-br-none bg-primary text-white shadow-primary/10' : 'rounded-bl-none bg-surface-dark text-white shadow-sm'}`}>
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}

                {/* System Notification */}
                <div className="flex justify-center w-full py-2">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium px-3 py-1.5 rounded-lg bg-primary/10 border border-primary/20">
                        <span className="material-symbols-outlined text-[14px]">handshake</span>
                        Sarah updated the term sheet
                    </div>
                </div>

                {/* Typing Indicator */}
                <div className="flex items-end gap-3 w-full animate-pulse">
                    <div className="h-8 w-8 rounded-full bg-cover bg-center shrink-0 self-end mb-1" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDsfFm9f3WtlvZewraBh-fLgAQf0J3Atc9VuzlHoxj-y4tL9udK2m9QkkVrAtepUlZxFUnNnu665AFredbLOkdbH4cD7DWkm0ok6RAwiyErxlzOj9hmgQeG8Gs5PntTL1DLjbSLipq2D6vu3LZrUBPRhSOd6p6Uf_iWRpz9uZ4SaJepNN1rzcMaNWfboKuZBEN6-xSXwiz4zx6ypnjQ43RFkXHV03pWKCIictgmQE3RuFtNXaKGjtMV3JLJiWB0FpvDYQdTD2wwaeA")' }}></div>
                    <div className="p-4 py-3 rounded-2xl rounded-bl-none bg-surface-dark w-16 flex items-center justify-center gap-1">
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                </div>

                {/* Spacer for scrolling */}
                <div className="h-2"></div>
            </main>

            {/* Bottom Input Area */}
            <div className="bg-background-dark border-t border-white/5 flex flex-col w-full z-20">
                {/* Quick Reply Chips */}
                <div className="w-full overflow-x-auto no-scrollbar px-4 py-3 flex gap-2">
                    {['Defend Metrics', 'Accept Offer', 'Bluff', 'Ask for extension'].map((chip) => (
                        <button
                            key={chip}
                            onClick={() => handleQuickReply(chip)}
                            className="shrink-0 px-4 py-1.5 rounded-full bg-surface-dark hover:bg-white/10 border border-white/10 text-white/90 text-sm font-medium transition-colors whitespace-nowrap"
                        >
                            {chip}
                        </button>
                    ))}
                </div>
                {/* Input Field & Actions */}
                <div className="flex items-end gap-2 px-4 pb-4 pt-1">
                    <button className="shrink-0 h-10 w-10 flex items-center justify-center rounded-full text-white/50 hover:text-white hover:bg-white/5 transition-colors">
                        <span className="material-symbols-outlined text-[24px]">add_circle</span>
                    </button>
                    <div className="flex-1 min-h-[44px] bg-surface-dark hover:bg-surface-dark/80 transition-colors rounded-[22px] px-4 py-2.5 flex items-center">
                        <input
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="w-full bg-transparent border-none p-0 text-white placeholder-white/40 text-[16px] focus:ring-0 leading-normal"
                            placeholder="Pitch your strategy..."
                            type="text"
                        />
                    </div>
                    <button
                        onClick={handleSend}
                        className="shrink-0 h-11 w-11 flex items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/25 hover:bg-primary/90 transition-transform active:scale-95"
                    >
                        <span className="material-symbols-outlined text-[20px] ml-0.5">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};
