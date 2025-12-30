import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const Settings = () => {
    const navigate = useNavigate();
    const [volume, setVolume] = useState(80);
    const [simSpeed, setSimSpeed] = useState('1x');
    const [notifications, setNotifications] = useState({ alerts: true, mentions: true });
    const [audio, setAudio] = useState({ sound: true, haptic: false });

    return (
        <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white font-display antialiased h-[100dvh] flex flex-col relative overflow-hidden w-full max-w-md md:max-w-full mx-auto shadow-2xl">
            <style>{`.no-scrollbar::-webkit-scrollbar {
                display: none;
            }
            .no-scrollbar {
                -ms-overflow-style: none;
                scrollbar-width: none;
            }
            input[type=range] {
                -webkit-appearance: none;
                width: 100%;
                background: transparent;
            }
            input[type=range]::-webkit-slider-thumb {
                -webkit-appearance: none;
                height: 20px;
                width: 20px;
                border-radius: 50%;
                background: #6d13ec;
                cursor: pointer;
                box-shadow: 0 1px 3px rgba(0,0,0,0.3);
                margin-top: -8px; 
                border: 2px solid #fff;
            }
            .dark input[type=range]::-webkit-slider-thumb {
                border: 2px solid #231b2e;
            }
            input[type=range]::-webkit-slider-runnable-track {
                width: 100%;
                height: 4px;
                cursor: pointer;
                background: #e4e4e7;
                border-radius: 2px;
            }
            .dark input[type=range]::-webkit-slider-runnable-track {
                background: #3f3f46;
            }
            `}</style>

            <div className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md p-4 pb-2 justify-between border-b border-gray-200 dark:border-white/5 shrink-0">
                <button onClick={() => navigate(-1)} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                    <span className="material-symbols-outlined text-2xl">arrow_back</span>
                </button>
                <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Settings</h1>
                <div className="w-10 h-10"></div>
            </div>

            <main className="flex-1 px-4 py-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full overflow-y-auto no-scrollbar">
                <section className="flex items-center gap-4 bg-white dark:bg-card-dark p-4 rounded-2xl shadow-sm border border-gray-200 dark:border-white/5">
                    <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-400 p-0.5">
                            <img alt="Profile" className="w-full h-full rounded-full object-cover border-2 border-white dark:border-card-dark" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFOdFKRLuTvavaBs6GhsP_jwZy-5b97cuxDJ3YNMoOYZVjpkc9oimgD88-TLb7eYVF4cvLj6tBrjxvx3sDGQAfHjZvaOKXbkLygtbagkRkNIKuoyuRX1Y2pSnPzzwoCMxDHC1eQE9eDjyipkUW9R8erKnzEP-FPx2d2slDe9lWLk4N2uf8uymAgAqXUZAmqWtTR5QEI6hW5q8tDRqJQEdtRPUQO9sy7fxU2YQejTDrw29XelzFmNtBYPcRHR3Gvoqx6lRTH1uO59o" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white dark:border-card-dark"></div>
                    </div>
                    <div className="flex-1">
                        <h2 className="text-lg font-bold">Alex Founder</h2>
                        <p className="text-sm text-slate-500 dark:text-gray-400">Startup Level 14 • Pro Plan</p>
                    </div>
                    <button className="p-2 text-primary bg-primary/10 rounded-xl hover:bg-primary/20 transition-colors">
                        <span className="material-symbols-outlined">edit</span>
                    </button>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Game Preferences</h3>
                    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <span className="material-symbols-outlined text-lg">speed</span>
                                </div>
                                <span className="font-medium text-sm">Simulation Speed</span>
                            </div>
                            <div className="flex bg-slate-100 dark:bg-white/5 p-1 rounded-lg">
                                {['1x', '2x', '4x'].map((speed) => (
                                    <button
                                        key={speed}
                                        onClick={() => setSimSpeed(speed)}
                                        className={`px-3 py-1 text-xs font-medium transition-all rounded-md ${simSpeed === speed ? 'bg-white dark:bg-zinc-600 text-slate-900 dark:text-white shadow-sm font-bold' : 'text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'}`}
                                    >
                                        {speed}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-orange-400">
                                    <span className="material-symbols-outlined text-lg">hotel_class</span>
                                </div>
                                <span className="font-medium text-sm">Difficulty</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400 group-hover:text-slate-700 dark:group-hover:text-gray-200">
                                <span className="text-sm">Hardcore</span>
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Audio & Immersion</h3>
                    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
                        <div className="p-4 space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-primary">
                                        <span className="material-symbols-outlined text-lg">music_note</span>
                                    </div>
                                    <span className="font-medium text-sm">Music Volume</span>
                                </div>
                                <span className="text-xs font-mono text-slate-500">{volume}%</span>
                            </div>
                            <div className="px-1">
                                <input
                                    className="w-full"
                                    max="100"
                                    min="0"
                                    type="range"
                                    value={volume}
                                    onChange={(e) => setVolume(parseInt(e.target.value))}
                                />
                            </div>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-600 dark:text-pink-400">
                                    <span className="material-symbols-outlined text-lg">volume_up</span>
                                </div>
                                <span className="font-medium text-sm">Sound Effects</span>
                            </div>
                            <button
                                onClick={() => setAudio(prev => ({ ...prev, sound: !prev.sound }))}
                                className={`w-11 h-6 rounded-full relative transition-colors focus:outline-none ${audio.sound ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${audio.sound ? 'right-1' : 'left-1'}`}></span>
                            </button>
                        </div>

                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-500/10 flex items-center justify-center text-slate-600 dark:text-gray-400">
                                    <span className="material-symbols-outlined text-lg">vibration</span>
                                </div>
                                <span className="font-medium text-sm">Haptic Feedback</span>
                            </div>
                            <button
                                onClick={() => setAudio(prev => ({ ...prev, haptic: !prev.haptic }))}
                                className={`w-11 h-6 rounded-full relative transition-colors focus:outline-none ${audio.haptic ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${audio.haptic ? 'right-1' : 'left-1'}`}></span>
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Notifications</h3>
                    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                                    <span className="material-symbols-outlined text-lg">notifications_active</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-medium text-sm">In-Game Alerts</span>
                                    <span className="text-xs text-slate-500">Events, Crisis, Offers</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, alerts: !prev.alerts }))}
                                className={`w-11 h-6 rounded-full relative transition-colors ${notifications.alerts ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications.alerts ? 'right-1' : 'left-1'}`}></span>
                            </button>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-600 dark:text-cyan-400">
                                    <span className="material-symbols-outlined text-lg">alternate_email</span>
                                </div>
                                <span className="font-medium text-sm">Social Mentions</span>
                            </div>
                            <button
                                onClick={() => setNotifications(prev => ({ ...prev, mentions: !prev.mentions }))}
                                className={`w-11 h-6 rounded-full relative transition-colors ${notifications.mentions ? 'bg-primary' : 'bg-slate-200 dark:bg-zinc-700'}`}
                            >
                                <span className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${notifications.mentions ? 'right-1' : 'left-1'}`}></span>
                            </button>
                        </div>
                    </div>
                </section>

                <section>
                    <h3 className="text-xs font-bold text-slate-500 dark:text-gray-400 uppercase tracking-wider mb-3 px-1">Account</h3>
                    <div className="bg-white dark:bg-card-dark rounded-2xl shadow-sm border border-gray-200 dark:border-white/5 divide-y divide-gray-100 dark:divide-white/5 overflow-hidden">
                        <button className="w-full text-left p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400 text-xl group-hover:text-primary transition-colors">language</span>
                                <span className="font-medium text-sm">Language</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                                <span className="text-sm">English (US)</span>
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400 text-xl group-hover:text-primary transition-colors">link</span>
                                <span className="font-medium text-sm">Connected Accounts</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 dark:text-gray-400">
                                <span className="text-sm">Google, Apple</span>
                                <span className="material-symbols-outlined text-lg">chevron_right</span>
                            </div>
                        </button>
                        <button className="w-full text-left p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-gray-400 text-xl group-hover:text-primary transition-colors">lock</span>
                                <span className="font-medium text-sm">Privacy & Security</span>
                            </div>
                            <span className="material-symbols-outlined text-lg text-slate-500">chevron_right</span>
                        </button>
                    </div>
                </section>

                <div className="pt-4 flex flex-col items-center space-y-4 pb-8">
                    <button className="w-full py-3.5 bg-white dark:bg-card-dark text-red-500 font-semibold rounded-xl border border-gray-200 dark:border-white/5 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors flex items-center justify-center gap-2 active:scale-95 transform">
                        <span className="material-symbols-outlined text-xl">logout</span>
                        Log Out
                    </button>
                    <p className="text-xs text-slate-400 dark:text-gray-600">Startup Simulator v2.4.0 (Build 3094)</p>
                </div>
            </main>
        </div>
    );
};
