

interface CreatePostProps {
    onClose: () => void;
}

export const CreatePost = ({ onClose }: CreatePostProps) => {
    return (
        <div className="fixed inset-0 z-50 bg-background-light dark:bg-background-dark flex flex-col animate-in fade-in zoom-in-95 duration-200 md:items-center md:justify-center md:bg-slate-900/70 md:backdrop-blur-sm">
            <div className="w-full h-full md:h-auto md:max-h-[90vh] md:max-w-2xl md:rounded-2xl md:shadow-2xl md:overflow-hidden bg-background-light dark:bg-background-dark flex flex-col">
                <style>{`
                .safe-area-top {
                    padding-top: env(safe-area-inset-top, 20px);
                }
                .safe-area-bottom {
                    padding-bottom: env(safe-area-inset-bottom, 20px);
                }
                textarea:focus {
                    box-shadow: none !important;
                    outline: none !important;
                }
            `}</style>
                <div className="safe-area-top w-full bg-background-light dark:bg-background-dark"></div>
                <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-white/5">
                    <button
                        onClick={onClose}
                        className="text-slate-900 dark:text-white text-base font-medium hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                    >
                        Cancel
                    </button>
                    <button className="bg-primary hover:bg-primary/90 text-white text-sm font-bold px-5 py-1.5 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        Post
                    </button>
                </header>
                <main className="flex-1 flex flex-col p-4">
                    <div className="flex gap-3 h-full">
                        <div className="shrink-0 pt-1">
                            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border border-gray-200 dark:border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWt4-Rx7aIk4Ck0O6k17rbTK8NhZdzsUBAvGgZwMF2ARj6f2XxYArNpN7VslyZCcTMBFp91TF3OcQ0O5Ib-zL7iwY_PH9m8ueJqWLNxT_xFV7YVVT1T9oDLbp60xJlUxNvbvovb3dOyV8rDHWhYKFnf1Fn07hoGBR4yo1QGm0RZNQNQ4hqJixT36oxNu-fZmjkPQ_tpL5BIpotSRYmpxs_wh7W5T3HGY3aGQAnfhLAbRdFczkIpKyURqSzL4kBKvJ38c7Yd-7oB5c")' }}>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col h-full relative">
                            <button className="flex items-center gap-1 text-primary border border-primary/30 rounded-full px-3 py-1 w-max mb-3 text-xs font-semibold">
                                Public
                                <span className="material-symbols-outlined text-[16px]">expand_more</span>
                            </button>
                            <textarea autoFocus className="w-full bg-transparent text-slate-900 dark:text-white text-lg placeholder-slate-400 dark:placeholder-gray-500 border-0 p-0 resize-none flex-1 focus:ring-0" placeholder="What's happening in your startup?"></textarea>
                            <div className="mt-4 border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden hidden">
                            </div>
                        </div>
                    </div>
                </main>
                <div className="w-full border-t border-gray-200 dark:border-white/5 bg-slate-50 dark:bg-[#1f162b] pb-safe">
                    <div className="px-4 py-3">
                        <div className="flex gap-2 mb-4 overflow-x-auto no-scrollbar pb-1">
                            <button className="whitespace-nowrap rounded-md bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 px-2.5 py-1 text-xs text-primary font-medium hover:bg-white/80 dark:hover:bg-white/10">#StartupLife</button>
                            <button className="whitespace-nowrap rounded-md bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 px-2.5 py-1 text-xs text-primary font-medium hover:bg-white/80 dark:hover:bg-white/10">#Hiring</button>
                            <button className="whitespace-nowrap rounded-md bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 px-2.5 py-1 text-xs text-primary font-medium hover:bg-white/80 dark:hover:bg-white/10">#TechNews</button>
                            <button className="whitespace-nowrap rounded-md bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/5 px-2.5 py-1 text-xs text-primary font-medium hover:bg-white/80 dark:hover:bg-white/10">#Funding</button>
                        </div>
                        <div className="flex justify-between items-center text-primary safe-area-bottom">
                            <div className="flex gap-4">
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Add Image">
                                    <span className="material-symbols-outlined text-[24px]">image</span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Add Poll">
                                    <span className="material-symbols-outlined text-[24px]">poll</span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Tag Company">
                                    <span className="material-symbols-outlined text-[24px]">alternate_email</span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Add Hashtag">
                                    <span className="material-symbols-outlined text-[24px]">tag</span>
                                </button>
                                <button className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors" title="Location">
                                    <span className="material-symbols-outlined text-[24px] text-slate-400 dark:text-gray-500">location_on</span>
                                </button>
                            </div>
                            <div className="relative size-6 flex items-center justify-center">
                                <svg className="transform -rotate-90 size-full">
                                    <circle className="text-slate-300 dark:text-gray-700" cx="12" cy="12" fill="transparent" r="10" stroke="currentColor" strokeWidth="2"></circle>
                                    <circle className="text-primary" cx="12" cy="12" fill="transparent" r="10" stroke="currentColor" strokeDasharray="60 100" strokeWidth="2"></circle>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
