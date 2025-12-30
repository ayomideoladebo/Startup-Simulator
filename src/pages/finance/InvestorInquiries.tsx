import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const InvestorInquiries = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs = [
        { name: 'All', count: null },
        { name: 'New', count: 3 },
        { name: 'Negotiating', count: null },
        { name: 'Offers', count: null }
    ];

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white overflow-x-hidden min-h-screen relative pb-24">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* TopAppBar */}
            <div className="flex items-center justify-between p-4 pb-2 bg-background-light dark:bg-background-dark shrink-0 z-20 sticky top-0">
                <button
                    onClick={() => navigate(-1)}
                    className="text-slate-800 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">Investor Inquiries</h2>
                <button className="flex size-10 items-center justify-center rounded-full bg-transparent text-slate-800 dark:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined">filter_list</span>
                </button>
            </div>

            {/* SearchBar */}
            <div className="px-4 py-3 shrink-0 bg-background-light dark:bg-background-dark sticky top-[60px] z-20">
                <label className="flex flex-col w-full">
                    <div className="flex w-full flex-1 items-stretch rounded-lg h-12 relative group">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                            <span className="material-symbols-outlined">search</span>
                        </div>
                        <input
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white bg-white dark:bg-[#2f2839] focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-gray-200 dark:border-white/5 h-full placeholder:text-gray-400 px-4 pl-10 text-base font-normal leading-normal transition-shadow"
                            placeholder="Search investors..."
                        />
                    </div>
                </label>
            </div>

            {/* Tabs */}
            <div className="shrink-0 bg-background-light dark:bg-background-dark z-10 sticky top-[120px]">
                <div className="flex border-b border-gray-200 dark:border-[#453b54] px-4 gap-6 overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-2 min-w-[3rem] whitespace-nowrap transition-colors ${activeTab === tab.name ? 'border-b-primary text-primary' : 'border-b-transparent text-gray-500 dark:text-[#a89db9] hover:text-gray-700 dark:hover:text-gray-200'}`}
                        >
                            <p className="text-sm font-bold leading-normal tracking-[0.015em]">
                                {tab.name}
                                {tab.count && <span className="ml-1 text-[10px] bg-primary text-white px-1.5 py-0.5 rounded-full align-middle">{tab.count}</span>}
                            </p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Scrollable List Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-background-light dark:bg-background-dark pb-24">

                {/* Inquiry Card: New */}
                <div
                    onClick={() => navigate('/finance/chat')}
                    className="group relative flex gap-4 p-4 bg-white dark:bg-[#201a29] rounded-xl shadow-sm border border-primary/40 hover:bg-gray-50 dark:hover:bg-[#2a2236] transition-all cursor-pointer"
                >
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-gray-100 dark:border-white/10 bg-purple-100 flex items-center justify-center text-purple-600 font-bold">NV</div>
                    <div className="flex flex-1 flex-col justify-center min-w-0 pr-16">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate">Nebula Ventures</p>
                        </div>
                        <p className="text-gray-500 dark:text-[#a89db9] text-xs font-normal mb-1">10m ago</p>
                        <p className="text-gray-600 dark:text-gray-300 text-sm font-normal leading-relaxed line-clamp-2">We saw your latest user growth metrics and we are extremely impressed with the traction...</p>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 border border-primary/20 px-2 py-1 text-xs font-bold text-primary ring-1 ring-inset ring-primary/10">New</span>
                    </div>
                </div>

                {/* Inquiry Card: Offer (Gamified Glow) */}
                <div
                    onClick={() => navigate('/finance/offer')}
                    className="group relative flex gap-4 p-4 bg-gradient-to-br from-amber-50 to-white dark:from-[#2a2215] dark:to-[#181022] rounded-xl shadow-[0_0_15px_-3px_rgba(245,158,11,0.15)] border border-amber-500/50 hover:shadow-amber-500/20 transition-all cursor-pointer"
                >
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-amber-500/30 bg-amber-100 flex items-center justify-center text-amber-600 font-bold">TC</div>
                    <div className="flex flex-1 flex-col justify-center min-w-0 pr-16">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate">Titan Capital</p>
                        </div>
                        <p className="text-amber-600 dark:text-amber-500/90 text-xs font-normal mb-1">1d ago</p>
                        <p className="text-slate-700 dark:text-gray-300 text-sm font-normal leading-relaxed line-clamp-2">Term sheet attached. We are valuing the company at $15M post-money with a standard 20% option pool.</p>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-amber-500 text-white px-2 py-1 text-xs font-bold shadow-sm">Offer Made</span>
                    </div>
                </div>

                {/* Inquiry Card: Replied */}
                <div className="group relative flex gap-4 p-4 bg-white dark:bg-[#201a29] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2a2236] transition-all cursor-pointer">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-gray-100 dark:border-white/10 bg-blue-100 flex items-center justify-center text-blue-600 font-bold">AG</div>
                    <div className="flex flex-1 flex-col justify-center min-w-0 pr-16">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate">Angel Group Alpha</p>
                        </div>
                        <p className="text-gray-500 dark:text-[#a89db9] text-xs font-normal mb-1">2h ago</p>
                        <p className="text-gray-500 dark:text-[#a89db9] text-sm font-normal leading-relaxed line-clamp-2">Thanks for the pitch. Can you clarify your CAC vs LTV projections for next quarter?</p>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-200 dark:bg-white/10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">Replied</span>
                    </div>
                </div>

                {/* Inquiry Card: Negotiating */}
                <div className="group relative flex gap-4 p-4 bg-white dark:bg-[#201a29] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2a2236] transition-all cursor-pointer">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-gray-100 dark:border-white/10 bg-green-100 flex items-center justify-center text-green-600 font-bold">SS</div>
                    <div className="flex flex-1 flex-col justify-center min-w-0 pr-16">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate">Stellar Seed</p>
                        </div>
                        <p className="text-gray-500 dark:text-[#a89db9] text-xs font-normal mb-1">3d ago</p>
                        <p className="text-gray-500 dark:text-[#a89db9] text-sm font-normal leading-relaxed line-clamp-2">Let's schedule a follow-up meeting next Tuesday to go over the technical roadmap.</p>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-700 dark:text-blue-300 px-2 py-1 text-xs font-bold">Negotiating</span>
                    </div>
                </div>

                {/* Inquiry Card: Passed (Dimmed) */}
                <div className="group relative flex gap-4 p-4 bg-white dark:bg-[#201a29] rounded-xl shadow-sm border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-[#2a2236] transition-all cursor-pointer opacity-75 grayscale-[0.5]">
                    <div className="bg-center bg-no-repeat bg-cover rounded-full h-12 w-12 shrink-0 border border-gray-100 dark:border-white/10 bg-slate-100 flex items-center justify-center text-slate-600 font-bold">QA</div>
                    <div className="flex flex-1 flex-col justify-center min-w-0 pr-16">
                        <div className="flex justify-between items-baseline mb-0.5">
                            <p className="text-slate-900 dark:text-white text-base font-semibold leading-normal truncate">Quantum Angel</p>
                        </div>
                        <p className="text-gray-500 dark:text-[#a89db9] text-xs font-normal mb-1">5d ago</p>
                        <p className="text-gray-500 dark:text-[#a89db9] text-sm font-normal leading-relaxed line-clamp-2">Interesting concept, but not our sector at the moment. Best of luck!</p>
                    </div>
                    <div className="absolute top-4 right-4 flex flex-col items-end gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-white/5 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400">Passed</span>
                    </div>
                </div>
            </div>

            {/* Floating Action Button */}
            <div className="fixed bottom-6 right-6 z-30">
                <button
                    onClick={() => navigate('/finance/pitch')}
                    className="flex items-center justify-center h-14 w-14 rounded-full bg-primary text-white shadow-[0_4px_20px_rgba(109,19,236,0.4)] hover:scale-105 active:scale-95 transition-all group"
                >
                    <span className="material-symbols-outlined text-3xl group-hover:rotate-90 transition-transform">add</span>
                </button>
            </div>

            {/* Bottom Gradient Fade */}
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent pointer-events-none z-20 sticky"></div>
        </div>
    );
};
