

interface CommentsProps {
    onClose: () => void;
}

export const Comments = ({ onClose }: CommentsProps) => {
    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-auto">
            <style>{`
                .pb-safe-bottom {
                    padding-bottom: env(safe-area-inset-bottom, 20px);
                }
            `}</style>
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity opacity-100" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-slate-900 dark:bg-[#1f162b] border-t border-white/10 sm:border sm:rounded-2xl sm:m-4 flex flex-col max-h-[85vh] shadow-2xl transform transition-all translate-y-0 opacity-100 z-10">
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/5">
                    <div className="flex items-center gap-2">
                        <h3 className="text-white font-bold text-lg">Comments</h3>
                        <span className="text-gray-500 text-sm">(12)</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-white/5 transition-colors"
                    >
                        <span className="material-symbols-outlined text-[24px]">close</span>
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {/* Comment 1 */}
                    <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                            <div className="bg-gray-700 rounded-full size-8 flex items-center justify-center text-xs font-bold text-white">
                                JD
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white text-sm font-semibold">Jane Doe</span>
                                    <span className="text-gray-500 text-xs">@janedoe • 1h</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                The burn rate is concerning, but if the pivot works, the ROI could be insane. 🚀
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span> 45
                                </button>
                                <button className="text-gray-500 hover:text-primary text-xs font-medium">Reply</button>
                            </div>
                        </div>
                    </div>

                    {/* Comment 2 */}
                    <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                            <div className="bg-indigo-600 rounded-full size-8 flex items-center justify-center text-xs font-bold text-white">
                                MK
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white text-sm font-semibold">Mark K.</span>
                                    <span className="text-gray-500 text-xs">@mark_vc • 45m</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                AI toasters? Really? Sounds like a feature, not a product. 🙄
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span> 12
                                </button>
                                <button className="text-gray-500 hover:text-primary text-xs font-medium">Reply</button>
                            </div>
                        </div>
                    </div>

                    {/* Comment 3 */}
                    <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                            <div className="bg-green-600 rounded-full size-8 flex items-center justify-center text-xs font-bold text-white">
                                S
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white text-sm font-semibold">SarahStartups</span>
                                    <span className="text-gray-500 text-xs">@sarah_s • 30m</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Waiting for the MVP before I judge. <span className="text-primary">@PlayerName</span> usually delivers.
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span> 8
                                </button>
                                <button className="text-gray-500 hover:text-primary text-xs font-medium">Reply</button>
                            </div>
                        </div>
                    </div>

                    {/* Comment 4 */}
                    <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                            <div className="bg-orange-600 rounded-full size-8 flex items-center justify-center text-xs font-bold text-white">
                                B
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white text-sm font-semibold">Bob Build</span>
                                    <span className="text-gray-500 text-xs">@bobby_b • 15m</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Can I invest in this? Asking for a friend.
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span> 3
                                </button>
                                <button className="text-gray-500 hover:text-primary text-xs font-medium">Reply</button>
                            </div>
                        </div>
                    </div>

                    {/* Comment 5 */}
                    <div className="flex gap-3">
                        <div className="shrink-0 mt-1">
                            <div className="bg-purple-600 rounded-full size-8 flex items-center justify-center text-xs font-bold text-white">
                                A
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                    <span className="text-white text-sm font-semibold">AnonDev</span>
                                    <span className="text-gray-500 text-xs">@anon_dev • 5m</span>
                                </div>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">
                                Lmao the memes coming out of this will be legendary.
                            </p>
                            <div className="flex items-center gap-4 mt-1">
                                <button className="text-gray-500 hover:text-red-500 text-xs flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[14px]">favorite</span> 1
                                </button>
                                <button className="text-gray-500 hover:text-primary text-xs font-medium">Reply</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 border-t border-white/5 bg-slate-900/50 dark:bg-[#1f162b]/50 backdrop-blur-md pb-safe-bottom">
                    <div className="flex items-center gap-3">
                        <div className="shrink-0">
                            <div className="bg-center bg-no-repeat bg-cover rounded-full size-8 border border-white/10" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAWt4-Rx7aIk4Ck0O6k17rbTK8NhZdzsUBAvGgZwMF2ARj6f2XxYArNpN7VslyZCcTMBFp91TF3OcQ0O5Ib-zL7iwY_PH9m8ueJqWLNxT_xFV7YVVT1T9oDLbp60xJlUxNvbvovb3dOyV8rDHWhYKFnf1Fn07hoGBR4yo1QGm0RZNQNQ4hqJixT36oxNu-fZmjkPQ_tpL5BIpotSRYmpxs_wh7W5T3HGY3aGQAnfhLAbRdFczkIpKyURqSzL4kBKvJ38c7Yd-7oB5c")' }}></div>
                        </div>
                        <div className="flex-1 relative">
                            <input className="w-full bg-white/5 border-transparent focus:border-primary focus:ring-1 focus:ring-primary rounded-full py-2 pl-4 pr-10 text-sm text-white placeholder-gray-500 transition-all" placeholder="Add a comment..." type="text" />
                            <button className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white transition-colors p-1">
                                <span className="material-symbols-outlined text-[20px]">send</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
