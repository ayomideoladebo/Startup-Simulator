import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreatePost } from './CreatePost';
import { Comments } from './Comments';

export const Social = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('For You');
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [showComments, setShowComments] = useState(false);

    // Hide bottom nav when creating post
    useEffect(() => {
        const bottomNav = document.querySelector('nav.fixed.bottom-0');
        if (bottomNav) {
            if (isCreatingPost) {
                bottomNav.classList.add('hidden');
            } else {
                bottomNav.classList.remove('hidden');
            }
        }
        return () => {
            if (bottomNav) bottomNav.classList.remove('hidden');
        };
    }, [isCreatingPost]);

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display overflow-hidden h-full flex flex-col relative w-full">
            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                .shadow-glow {
                    box-shadow: 0 0 15px -3px rgba(109, 19, 236, 0.3);
                }
            `}</style>

            {isCreatingPost && <CreatePost onClose={() => setIsCreatingPost(false)} />}
            {showComments && <Comments onClose={() => setShowComments(false)} />}

            {/* Header Area (Sticky) */}
            <header className="w-full z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-gray-200 dark:border-white/5 sticky top-0">
                {/* Top App Bar */}
                <div className="flex items-center px-4 py-3 justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/social/profile')}
                            className="relative focus:outline-none"
                        >
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWt4-Rx7aIk4Ck0O6k17rbTK8NhZdzsUBAvGgZwMF2ARj6f2XxYArNpN7VslyZCcTMBFp91TF3OcQ0O5Ib-zL7iwY_PH9m8ueJqWLNxT_xFV7YVVT1T9oDLbp60xJlUxNvbvovb3dOyV8rDHWhYKFnf1Fn07hoGBR4yo1QGm0RZNQNQ4hqJixT36oxNu-fZmjkPQ_tpL5BIpotSRYmpxs_wh7W5T3HGY3aGQAnfhLAbRdFczkIpKyURqSzL4kBKvJ38c7Yd-7oB5c")' }}>
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-background-light dark:bg-background-dark rounded-full p-0.5">
                                <div className="bg-primary size-3 rounded-full border border-background-light dark:border-background-dark"></div>
                            </div>
                        </button>
                    </div>
                    <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">FoundersFeed</h2>
                    <button className="relative flex items-center justify-center rounded-full size-10 hover:bg-black/5 dark:hover:bg-white/5 transition-colors text-slate-900 dark:text-white">
                        <span className="material-symbols-outlined">notifications</span>
                        <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
                        </span>
                    </button>
                </div>
                {/* Tabs */}
                <div className="px-4">
                    <div className="flex gap-6 overflow-x-auto no-scrollbar">
                        {['For You', 'Competitors', 'Market News'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex flex-col items-center justify-center border-b-[3px] pb-3 pt-1 px-1 transition-colors ${activeTab === tab ? 'border-primary text-slate-900 dark:text-white' : 'border-transparent text-slate-500 dark:text-gray-400 hover:text-slate-700 dark:hover:text-gray-200'}`}
                            >
                                <p className="text-sm font-bold whitespace-nowrap">{tab}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </header>

            {/* Main Feed Content (Scrollable) */}
            <main className="flex-1 overflow-y-auto w-full relative pb-24 no-scrollbar">
                <div className="max-w-2xl mx-auto w-full">
                    {/* Post 1: Rival Trash Talk */}
                    <article className="border-b border-gray-100 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <div className="flex gap-3 p-4">
                            <div className="shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCWVEnO3V7GO0u2Yu-bBnDxuSYT-psNhKThtEJ-Y9sia_IlYQtdlU6D5ZUmphL7B1IVnWSaJuFjPHAWh5kJ-nqJmIoQ77ai8Oel8I62cSHeo4R8nGHVbK3HmhbrdqDRP4Pjn9e6sFjCnOrsSjHpF-KVfPcF8eeWAH-g_PT5OVz-N3bB0F8lqjQXPNMDdO7zsajKvrdHcjKXjoccSKhLSW29EXqIcZku4FpOUcalOq4MsplbiJg7S4cYU4FMInHChAH8h861JtC48WY")' }}>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-1.5">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-slate-900 dark:text-white text-[15px] font-bold">TechDisruptor</span>
                                        <span className="material-symbols-outlined text-primary text-[16px] leading-none" title="Unicorn Status">verified</span>
                                        <span className="text-slate-500 text-sm">@tech_disruptor</span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 text-sm">2h</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_horiz</span>
                                </div>
                                {/* Body */}
                                <div>
                                    <p className="text-slate-900 dark:text-white text-[15px] leading-normal font-normal">
                                        Just heard <span className="text-primary font-medium">@PlayerName</span> is pivoting to AI toasters. Good luck with that burn rate. 🔥 <span className="text-primary">#StartupLife</span> <span className="text-primary">#PivotOrPerish</span>
                                    </p>
                                </div>
                                {/* Context Badge */}
                                <div className="mt-1">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/10 px-2 py-0.5 text-xs font-medium text-orange-500 dark:text-orange-400 border border-orange-500/20">
                                        <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                                        Drama
                                    </span>
                                </div>
                                {/* Action Bar */}
                                <div className="flex justify-between mt-2 max-w-[85%] pr-4">
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="group flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                        <span className="text-xs group-hover:text-primary">12</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-green-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">cached</span>
                                        <span className="text-xs group-hover:text-green-500">4</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        <span className="text-xs group-hover:text-red-500">89</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                                        <span className="text-xs group-hover:text-blue-400">1.2k</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Post 2: Market Event (High Importance) */}
                    <article className="border-b border-gray-100 dark:border-white/5 bg-primary/[0.03] relative">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
                        <div className="flex gap-3 p-4">
                            <div className="shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuC9tgpUnpx_lPMcRBvvuLx5rySsVt-XxQPW_biOoGbhFzxNNVS23Fy80tQr7rxCm_CssXSIhkCEKwHGfVkk99SaX7H0k4HUtd9sT-Wmi0fX7EAcWXETrOvCr_E-i80crxwID2Slq8-t8YUR0grlwCD2dBFfP6cTIBBhVY-vFhLQH59WDdtwSE8Vu0xZ4t4LTpFXPTETzoRSxpKOrpwOeKeXa-1XDW2hB2sAK5_zuKITsU_Or1wYEN57ZEuzX_EQ6-c3mRhiAA-cqhM")' }}>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-1.5">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-slate-900 dark:text-white text-[15px] font-bold">Market Watch</span>
                                        <span className="material-symbols-outlined text-blue-500 dark:text-blue-400 text-[16px] leading-none">verified</span>
                                        <span className="text-slate-500 text-sm">@market_watch</span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 text-sm">3h</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_horiz</span>
                                </div>
                                {/* Body */}
                                <div>
                                    <p className="text-slate-900 dark:text-white text-[15px] leading-normal font-normal">
                                        <span className="font-bold text-red-500 dark:text-red-400">BREAKING:</span> Tech sector crashes by 15% following new AI regulations. Investors are fleeing to commodities. 📉 <span className="text-primary">#MarketCrash</span> <span className="text-primary">#Regulation</span>
                                    </p>
                                </div>
                                {/* Embedded Media */}
                                <div className="mt-2 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 relative group">
                                    <div className="bg-center bg-no-repeat bg-cover aspect-video w-full" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBzK9OYdCdphqDcWfDxO9mFZoOcEwFZCAPKZELHSSTJdGhbzMD_OD3N1Eikw6Y0Rdnc3YBeq6FmAqopP1rlUz6-gNDdxEbE53ox2qt5xPAfJdbc7PVcpuUVCKrxWH8Dr29Q8PPNX9s6_P7v6DBfQWryo-bB6RJ3n7ZypTwo3TX1WLNS9DOnpV90UbesplrXH0WJ3mx_eCRRBqRMcjK2hoS6mBqaAxlPNQJrUrBDVCEfUTnwPl1gTdqSOYafiby38PL14eyb6pNWFFE")' }}>
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-3">
                                        <p className="text-white text-xs font-medium">NASDAQ Composite -15.4%</p>
                                    </div>
                                </div>
                                {/* Context Badge */}
                                <div className="mt-2">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-0.5 text-xs font-medium text-red-500 dark:text-red-400 border border-red-500/20">
                                        <span className="material-symbols-outlined text-[14px]">trending_down</span>
                                        Market Event
                                    </span>
                                </div>
                                {/* Action Bar */}
                                <div className="flex justify-between mt-2 max-w-[85%] pr-4">
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="group flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                        <span className="text-xs group-hover:text-primary">2.4k</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-green-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">cached</span>
                                        <span className="text-xs group-hover:text-green-500">10k</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        <span className="text-xs group-hover:text-red-500">5.1k</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                                        <span className="text-xs group-hover:text-blue-400">1M</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Post 3: Competitor Update */}
                    <article className="border-b border-gray-100 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <div className="flex gap-3 p-4">
                            <div className="shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD9dvMg3EDVYhH6csGSUsGGC5C7UZGNk6t5O_novuKU_uDR9x6PK4v3v5Y2PAV-NBa6SkFjg5VJiNGAZtmfraqg-Ec--yMh-xeKYvGkcTyrS-Fz4R3HUKV1QvAK0T_M9bxhbPoecoO9f1Dw4Psy-mbPCFbUYkxmKFmTXNR2N0AFYIKrEOrOu0ja1ija0NFbVohbyI2QL8w_NoAuPztT9LKzWBMJ11dv0SAUlySX0LPL67qk8igHoRS79X_tXqY-crklf8_-l-3FOAM")' }}>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-1.5">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-slate-900 dark:text-white text-[15px] font-bold">Unicorn Inc.</span>
                                        <span className="text-slate-500 text-sm">@unicorn_inc</span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 text-sm">5h</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_horiz</span>
                                </div>
                                {/* Body */}
                                <div>
                                    <p className="text-slate-900 dark:text-white text-[15px] leading-normal font-normal">
                                        Our Series B is closed! $50M in the bank. We are coming for the throne. 🚀 First hire? A Chief Vibes Officer. <span className="text-primary">#FundingSecured</span> <span className="text-primary">#Hiring</span>
                                    </p>
                                </div>
                                {/* Context Badge */}
                                <div className="mt-1">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-medium text-green-500 dark:text-green-400 border border-green-500/20">
                                        <span className="material-symbols-outlined text-[14px]">monetization_on</span>
                                        Funding News
                                    </span>
                                </div>
                                {/* Action Bar */}
                                <div className="flex justify-between mt-2 max-w-[85%] pr-4">
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="group flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                        <span className="text-xs group-hover:text-primary">342</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-green-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">cached</span>
                                        <span className="text-xs group-hover:text-green-500">89</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        <span className="text-xs group-hover:text-red-500">1.5k</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                                        <span className="text-xs group-hover:text-blue-400">15k</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Post 4: Player Interaction Prompt */}
                    <article className="border-b border-gray-100 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors cursor-pointer">
                        <div className="flex gap-3 p-4">
                            <div className="shrink-0">
                                <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-11 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCpGtVB3AOFPlebCl4Xg0o_kByYOOCQNokLgo5Hr_MEmBb5IzALhaFAMoDVsVF_jAIDNhRNnCOB3vcSULFUFJ0wbzQp-WC7KFKS1O0HyvkbjiXaC5peYMYZnMUq4ZYbUDiXpNjLGhaHwsZZjEla1h-6S9aaIlI47mI1zcMoi8OABMhAa6evEiYLkXPAIcpe31Xfrgw15lsZ4bPVPbhlUPjzwXfZilCHyvvwWFqw_R8unBSbb-wjXR-AMsRFxnUxUMZev7VX6gZ2bXc")' }}>
                                </div>
                            </div>
                            <div className="flex flex-1 flex-col gap-1.5">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                        <span className="text-slate-900 dark:text-white text-[15px] font-bold">VC_Vulture</span>
                                        <span className="material-symbols-outlined text-primary text-[16px] leading-none">verified</span>
                                        <span className="text-slate-500 text-sm">@vulture_capital</span>
                                        <span className="text-slate-400 text-xs">•</span>
                                        <span className="text-slate-500 text-sm">6h</span>
                                    </div>
                                    <span className="material-symbols-outlined text-slate-400 text-[20px]">more_horiz</span>
                                </div>
                                {/* Body */}
                                <div>
                                    <p className="text-slate-900 dark:text-white text-[15px] leading-normal font-normal">
                                        Honestly not sure what <span className="text-primary font-medium">@PlayerName</span> is thinking with their latest product launch. Feels derivative. Prove me wrong. ☕️
                                    </p>
                                </div>
                                {/* CTA for Player */}
                                <div className="mt-3 bg-slate-100 dark:bg-[#1f162b] border border-gray-200 dark:border-white/5 rounded-lg p-3 flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-xs text-slate-400 uppercase tracking-wider font-bold">Reputation at risk</span>
                                        <span className="text-sm text-slate-900 dark:text-white font-medium">Respond to defend stock price?</span>
                                    </div>
                                    <button className="bg-primary hover:bg-primary/90 text-white text-xs font-bold py-2 px-4 rounded-full transition-colors shadow-glow">
                                        Reply
                                    </button>
                                </div>
                                {/* Action Bar */}
                                <div className="flex justify-between mt-2 max-w-[85%] pr-4">
                                    <button
                                        onClick={() => setShowComments(true)}
                                        className="group flex items-center gap-1.5 text-slate-400 hover:text-primary transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
                                        <span className="text-xs group-hover:text-primary">89</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-green-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">cached</span>
                                        <span className="text-xs group-hover:text-green-500">12</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-red-500 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">favorite</span>
                                        <span className="text-xs group-hover:text-red-500">230</span>
                                    </button>
                                    <button className="group flex items-center gap-1.5 text-slate-400 hover:text-blue-400 transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">bar_chart</span>
                                        <span className="text-xs group-hover:text-blue-400">5k</span>
                                    </button>
                                    <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                                        <span className="material-symbols-outlined text-[18px]">share</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    <div className="h-24"></div>
                </div>
            </main>

            {/* Floating Action Button */}
            <button
                onClick={() => setIsCreatingPost(true)}
                className="fixed bottom-24 right-5 z-40 bg-primary hover:bg-primary/90 text-white p-4 rounded-full shadow-[0_8px_30px_rgb(109,19,236,0.5)] transition-transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
                <span className="material-symbols-outlined text-[28px]">edit_square</span>
            </button>
        </div>
    );
};
