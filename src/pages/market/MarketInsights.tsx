
import { useNavigate } from 'react-router-dom';

export const MarketInsights = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased h-[100dvh] flex flex-col relative overflow-hidden text-slate-900 dark:text-white w-full max-w-md md:max-w-full mx-auto border-x border-white/5 shadow-2xl transition-colors duration-300">
            <style>{`.hide-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .hide-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            `}</style>

            {/* TopAppBar */}
            <div className="flex items-center bg-background-light dark:bg-background-dark p-4 pb-2 justify-between border-b border-gray-200 dark:border-gray-800 shrink-0 z-20">
                <button
                    onClick={() => navigate(-1)}
                    className="flex size-12 shrink-0 items-center justify-center cursor-pointer rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors"
                >
                    <span className="material-symbols-outlined text-slate-900 dark:text-white">arrow_back</span>
                </button>
                <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center">Global Market Watch</h2>
                <div className="flex w-12 items-center justify-end">
                    <button className="flex size-12 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white">search</span>
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto hide-scrollbar relative z-10 w-full pb-24">
                {/* HeadlineText: Market Pulse */}
                <div className="pt-6 px-4 flex justify-between items-end">
                    <div>
                        <h3 className="text-slate-900 dark:text-white tracking-tight text-2xl font-bold leading-tight">Market Pulse</h3>
                        <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">Daily briefing • Q3 2024</p>
                    </div>
                    <button className="text-primary text-sm font-semibold hover:underline">View All</button>
                </div>

                {/* Carousel: News/Trends */}
                <div className="flex overflow-x-auto pb-4 pt-4 px-4 gap-4 hide-scrollbar snap-x snap-mandatory">
                    {/* Card 1 */}
                    <div className="snap-center flex flex-col gap-3 shrink-0 w-64 md:w-80 group cursor-pointer">
                        <div className="w-full h-36 bg-center bg-cover rounded-xl relative overflow-hidden shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDttfdm339Nnr_VERMy2oCP2oZhMNFml1-FKrR7CMjpNmcGZ_C1VhB98I4ujXtvQOa0EwJaMrnfvxnFjg4Ze--6Kod8a9o0XneQrjDm4RW6g5aGXrCV-YPgJQcbhHhN6-t3kvBGZg74tgc68f86cKx7jqCf-_oe-_Lecw4n7LRZdbTid7_JTgYVNkpyA11hOLXMd46rN8TWq-Ji96W-JcnQvjCV_U-X0AFW3yx-SGGuatAVWf-j_y3gu9ZSuNbqTVKtwTxiIFU9bIw")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                                <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-400 text-xs font-bold border border-green-500/30">Bullish</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-base font-bold leading-snug group-hover:text-primary transition-colors">Tech Sector Surge</p>
                            <p className="text-slate-500 dark:text-gray-400 text-sm leading-normal mt-1">+5% growth in AI niche as adoption skyrockets.</p>
                        </div>
                    </div>
                    {/* Card 2 */}
                    <div className="snap-center flex flex-col gap-3 shrink-0 w-64 md:w-80 group cursor-pointer">
                        <div className="w-full h-36 bg-center bg-cover rounded-xl relative overflow-hidden shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAfUqVJfEqSLydu0vVMr6D1Ks0lAKMWMhIdMgDFKQc75_pg_DtNxVI0Z6oYB6xlQx4UcLJv1uo7zE8ra7bnw3lhs6hJ3LK4qGdc-tbkdaHsn1jpXKzMHqal3ZSLaHAxSBwKqvoW5o7E_ozIpt6IEUYRijPWkfSuYVoeV_Z08T1Ypj514alDafznKAvDvI5QFTKB1u0XNdod2zp1XGOhBEnKM985FKEpSs1DLCstN0sOmuDgSHO6CL-vjTDaxjv2Nms4VpKMyfKvgE4")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                                <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-400 text-xs font-bold border border-yellow-500/30">Stabilizing</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-base font-bold leading-snug group-hover:text-primary transition-colors">Retail Confidence</p>
                            <p className="text-slate-500 dark:text-gray-400 text-sm leading-normal mt-1">Consumer spending steadies after volatile Q2.</p>
                        </div>
                    </div>
                    {/* Card 3 */}
                    <div className="snap-center flex flex-col gap-3 shrink-0 w-64 md:w-80 group cursor-pointer">
                        <div className="w-full h-36 bg-center bg-cover rounded-xl relative overflow-hidden shadow-lg" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBm4iHNHjDw0Zc0HJF_YFHu0tIN9JjbPCIKdAT5ulcAdooRz9dtvzLYU6YDFAEfRQlAMEGs5A6JSWmkdgZj34PPSQ-mcWyF91DMyujtHEnQ5t-KOX4T-aCgiw9DPfQHM6AXVmSyZMYJSVX1sSrcgy_mmQUN1L-0qPxEf0Mm5LQOkz4X1U6Lrg-gV_WB0eG-52mNuNoWGl_yyIQbRBOsf7STXCIjInXllu2P6P-JmiH5GS8yK8X1KfaT2V104vBO0vuD-YxTkHHsW2E")' }}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            <div className="absolute bottom-3 left-3 right-3">
                                <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-xs font-bold border border-red-500/30">Volatile</span>
                            </div>
                        </div>
                        <div>
                            <p className="text-slate-900 dark:text-white text-base font-bold leading-snug group-hover:text-primary transition-colors">Energy Fluctuations</p>
                            <p className="text-slate-500 dark:text-gray-400 text-sm leading-normal mt-1">Oil prices shift rapidly due to new regulations.</p>
                        </div>
                    </div>
                </div>

                <div className="h-4 bg-transparent"></div>

                {/* SectionHeader: The Global 500 */}
                <div className="flex items-center justify-between px-4 pb-2">
                    <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight tracking-tight">The Global 500</h3>
                    <span className="text-xs font-medium text-slate-400 dark:text-gray-500 bg-slate-100 dark:bg-white/5 px-2 py-1 rounded">Live Updates</span>
                </div>

                {/* Chips: Filters */}
                <div className="flex gap-2 px-4 py-2 overflow-x-auto hide-scrollbar">
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-primary pl-5 pr-5 shadow-lg shadow-primary/20 transition-transform active:scale-95">
                        <p className="text-white text-sm font-semibold leading-normal">Valuation</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-card-border pl-5 pr-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-normal">Growth</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-card-border pl-5 pr-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-normal">Innovation</p>
                    </button>
                    <button className="flex h-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-card-dark border border-gray-200 dark:border-card-border pl-5 pr-5 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                        <p className="text-slate-600 dark:text-gray-400 text-sm font-medium leading-normal">Morale</p>
                    </button>
                </div>

                {/* Rankings List */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 pt-4 gap-3">
                    {/* Header Row for Columns */}
                    <div className="flex px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div className="w-10 text-center">#</div>
                        <div className="flex-1 pl-4">Company</div>
                        <div className="text-right">Valuation</div>
                    </div>

                    {/* Rank 1 */}
                    <div className="group relative flex items-center p-3 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-card-border shadow-sm hover:border-primary/50 transition-all">
                        <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-yellow-400 rounded-r-full"></div>
                        <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                            <span className="material-symbols-outlined text-yellow-500 text-xl">trophy</span>
                            <span className="text-[10px] font-bold text-yellow-500 mt-[-2px]">1st</span>
                        </div>
                        <div className="ml-2 size-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <img alt="Nexus AI Logo" className="rounded-lg size-10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyWvSfT8Iw0F73eCIEMpZSpb925eGMTcND2RiWsNc08OttRC66e5seL83AGnlTQkUzZGtagcImqBMRmrl6P5nofLwPcInJU1uqgpHynSuhA8gzspCTf26RlEBSwOxIr4Ft03clZMZyhjsMCllaliVVFBqVVmS48s8-6puQMk1uyebBDVecfdxeTScWACS1tvPjTS3a9-2udYrUDw2AlEgirITBzXzBzbp3tKuhq9h6JONVIc9h8uawKnn2bJQQjxWMeEUI_YMHC3w" />
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <p className="text-slate-900 dark:text-white font-bold truncate">Nexus AI</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate">Artificial Intelligence</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-slate-900 dark:text-white font-bold tracking-tight">$45.2B</p>
                            <div className="flex items-center justify-end gap-0.5 text-green-500 text-xs font-medium">
                                <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_up</span>
                                <span>2.4%</span>
                            </div>
                        </div>
                    </div>

                    {/* Rank 2 */}
                    <div className="group relative flex items-center p-3 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-card-border shadow-sm hover:border-primary/50 transition-all">
                        <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                            <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">2</span>
                        </div>
                        <div className="ml-2 size-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <img alt="Solaris Corp Logo" className="rounded-lg size-10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDvIlmeypUx8Dm2R9AG84w-S77ObyyjVdBhMcJZPwnuCrrRR5McCZ6duv23RWH665I59BZiMaSaBz40SXwVRl6BX8jIY9R9m70YkL8plh5O80SbdpjrdYtAQQaCHf8SFgwmTWOyMrrKqXLpFV3bCsvluPDi8E-GepFkpOTIMXuYNDS8Px3-qMDZMe8HvhUxwdpMUKg5TL_oeprjhZmGL8tzcQ7uU9AsKT7EEfckiXXwXirQ3-MUTC3QcAXEIxsKIeMp1ZJ0G7WOu6E" />
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <p className="text-slate-900 dark:text-white font-bold truncate">Solaris Corp</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate">Renewable Energy</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-slate-900 dark:text-white font-bold tracking-tight">$41.0B</p>
                            <div className="flex items-center justify-end gap-0.5 text-red-500 text-xs font-medium">
                                <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_down</span>
                                <span>1.2%</span>
                            </div>
                        </div>
                    </div>

                    {/* Rank 3 */}
                    <div className="group relative flex items-center p-3 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-card-border shadow-sm hover:border-primary/50 transition-all">
                        <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                            <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">3</span>
                        </div>
                        <div className="ml-2 size-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <img alt="Quantum Leap Logo" className="rounded-lg size-10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCkz_wdw8mSSfaOKDQQfxuRFH2cWtxIuxgNKqAwkAHVvIq6OGdVc6XL6nWTY1v-n5qlP4YrHFlDx0orUXCK9E2puJPgdeZ56tQVlhv0spg9j50LRchc4uIdk0fYzIvCZbwFOVHA-NvZqr2MbVRELRN1mbS5FhwHNbNvb9QQC3p2omXaQL1DYPoC0hyXiXNsEu_jTiCuED0dGV_yyHS_vYqhmsnEGFoxeKPEAQ71-UZSPowq0bcA1JGwadirtw3mL2WwDUdp9c7aewE" />
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <p className="text-slate-900 dark:text-white font-bold truncate">Quantum Leap</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate">Research & Dev</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-slate-900 dark:text-white font-bold tracking-tight">$38.5B</p>
                            <div className="flex items-center justify-end gap-0.5 text-gray-500 text-xs font-medium">
                                <span className="material-symbols-outlined text-[16px] leading-none">remove</span>
                                <span>0.0%</span>
                            </div>
                        </div>
                    </div>

                    {/* Rank 4 (Player) - Highlighted */}
                    <div className="relative mt-2 mb-2">
                        <div className="absolute inset-0 bg-primary/20 blur-md rounded-xl"></div>
                        <div className="relative flex items-center p-3 rounded-xl bg-[#1a2333] border border-primary ring-1 ring-primary/50 shadow-lg">
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-r-full"></div>
                            <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                                <span className="text-white font-bold text-lg">4</span>
                            </div>
                            <div className="ml-2 size-10 rounded-lg bg-primary flex items-center justify-center shrink-0 text-white shadow-inner">
                                <span className="material-symbols-outlined">rocket_launch</span>
                            </div>
                            <div className="flex-1 min-w-0 ml-3">
                                <div className="flex items-center gap-2">
                                    <p className="text-white font-bold truncate">OmniGrid</p>
                                    <span className="bg-primary/30 text-primary-100 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold tracking-wider border border-primary/20">You</span>
                                </div>
                                <p className="text-primary/60 text-xs truncate">Infrastructure</p>
                            </div>
                            <div className="text-right ml-2">
                                <p className="text-white font-bold tracking-tight">$32.1B</p>
                                <div className="flex items-center justify-end gap-0.5 text-green-400 text-xs font-medium">
                                    <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_up</span>
                                    <span>5.8%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Rank 5 */}
                    <div className="group relative flex items-center p-3 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-card-border shadow-sm hover:border-primary/50 transition-all opacity-80">
                        <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                            <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">5</span>
                        </div>
                        <div className="ml-2 size-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <img alt="Starlight Media Logo" className="rounded-lg size-10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDUWPLLH1x90dZJ0l2RZUkDtsp9sC6rUthZRElf8C8cdUUW8Pyd4957u62dj1Q6GLhegy-GoTAWnd6uyt6Dl51zgvpAksVe_CUftm_Chp1UvjT6HDagy3gliLGtIDC5hh-zmGV4rLuFWUbbWYHL9dy0SaPd2eXED5-c0ntzAWx4oeDbzZygcgFXwEr7yo6I4wqRkq1uDpsnaYF3QmMcfIYb74Xk22pVvJuihCetVzH9gzF2TtepTYl-3wfC9pNhBP9RO8oGlI0hmN8" />
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <p className="text-slate-900 dark:text-white font-bold truncate">Starlight Media</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate">Entertainment</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-slate-900 dark:text-white font-bold tracking-tight">$28.9B</p>
                            <div className="flex items-center justify-end gap-0.5 text-green-500 text-xs font-medium">
                                <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_up</span>
                                <span>1.1%</span>
                            </div>
                        </div>
                    </div>

                    {/* Rank 6 */}
                    <div className="group relative flex items-center p-3 rounded-xl bg-white dark:bg-card-dark border border-gray-100 dark:border-card-border shadow-sm hover:border-primary/50 transition-all opacity-80">
                        <div className="w-10 flex shrink-0 items-center justify-center flex-col">
                            <span className="text-gray-400 dark:text-gray-500 font-bold text-lg">6</span>
                        </div>
                        <div className="ml-2 size-10 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                            <img alt="FinCore Logo" className="rounded-lg size-10 object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAc7Q-iF8OZ8v7ZuHZBvG2Hgz9_rr88SCbBv0SFYwjlTMfrj-9pnTyxcH36pFWcDVdz99PuXF-_9dyrF2R5bjOX-HUnN0zNla2I67fPE36FHO82y0ZLbK6hAHPi_7Lf6_ZBY3aD5ODzDEjfcnvKOjnyrh7UcJEwyCYVL44nG94AjmqvGxHw3on19zwDw-1V_Vu6nYTh8nNEZgvXUCDWETav7mPOimoziCRWeZxtoiEbbY68U3d-TGuMkd5uHbuCTw_HWYRK8pDJjKM" />
                        </div>
                        <div className="flex-1 min-w-0 ml-3">
                            <p className="text-slate-900 dark:text-white font-bold truncate">FinCore</p>
                            <p className="text-slate-500 dark:text-gray-400 text-xs truncate">FinTech</p>
                        </div>
                        <div className="text-right ml-2">
                            <p className="text-slate-900 dark:text-white font-bold tracking-tight">$26.4B</p>
                            <div className="flex items-center justify-end gap-0.5 text-red-500 text-xs font-medium">
                                <span className="material-symbols-outlined text-[16px] leading-none">arrow_drop_down</span>
                                <span>0.8%</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center py-4">
                        <button className="text-slate-500 dark:text-gray-400 text-sm font-medium flex items-center gap-1 hover:text-primary transition-colors">
                            View Full Rankings <span className="material-symbols-outlined text-sm">arrow_forward</span>
                        </button>
                    </div>
                </div>
            </main>


        </div>
    );
};
