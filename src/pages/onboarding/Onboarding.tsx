import React from 'react';
import { useNavigate } from 'react-router-dom';

export const Onboarding = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white antialiased min-h-screen flex flex-col items-center justify-center p-0">
            {/* Main Container */}
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark transition-colors duration-300">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-primary/10 to-transparent pointer-events-none"></div>
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl pointer-events-none"></div>

                {/* Content Wrapper */}
                <div className="flex-1 flex flex-col justify-between h-full relative z-10 safe-area-padding">
                    {/* Top Section: Image & Branding */}
                    <div className="flex flex-col items-center pt-8 @container">
                        {/* Hero Image Area */}
                        <div className="w-full px-4 mb-6">
                            <div className="w-full aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 group">
                                {/* Main Visual */}
                                <div className="absolute inset-0 bg-center bg-cover bg-no-repeat transform transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBPGlwV-naMazipHwXA0_MMIDRSj5mVpKgWU4QNcvfeQWGvn_XFB2_V61Y0h5CQaSjYMh7oz34Gswj09qgQsZRDal0mTAg0gapZHnVxKlR-AelF4EMryFEJ9wT09RMiwfip5N3HAA6sWlxlDv31xQjtUuDzyWLxLYVte6lEEpkuVwAiPPpiDibHoLlfc88gEVt3KCHYMW5tC0QEarudUREXCXUlhMoZ5SS3edksuMSCoW2vpkGrsPuT6J0CnK8TVyerb8HBjMiXo64")' }}>
                                </div>
                                {/* Gradient Overlay for Text Readability/Style */}
                                <div className="absolute inset-0 bg-gradient-to-t from-background-light dark:from-background-dark via-transparent to-transparent opacity-90"></div>
                                {/* Floating Badge */}
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md border border-white/10 rounded-full px-3 py-1 flex items-center gap-1">
                                    <span className="material-symbols-outlined text-primary text-sm">rocket_launch</span>
                                    <span className="text-white text-xs font-bold tracking-wide">V 2.0</span>
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="px-6 text-center space-y-3 max-w-md mx-auto">
                            {/* Icon/Logo Mark */}
                            <div className="mx-auto w-16 h-16 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/40 mb-2 rotate-3 hover:rotate-0 transition-transform duration-300">
                                <span className="material-symbols-outlined text-white text-4xl">domain</span>
                            </div>
                            {/* Headline */}
                            <h1 className="text-slate-900 dark:text-white tracking-tight text-[32px] md:text-[40px] font-extrabold leading-tight">
                                Startup Simulator
                            </h1>
                            {/* Subtext */}
                            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                                AI-Powered Business Strategy.<br />
                                <span className="text-primary font-bold">Build. Compete. Dominate.</span>
                            </p>
                        </div>
                    </div>

                    {/* Bottom Section: Actions */}
                    <div className="w-full pb-8 pt-4">
                        <div className="flex flex-col gap-3 px-6 max-w-md mx-auto w-full">
                            {/* Primary Button: Create Account */}
                            <button onClick={() => navigate('/create-account')} className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-primary/90 transition-all active:scale-[0.98] shadow-lg shadow-primary/25">
                                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
                                <span className="material-symbols-outlined text-white mr-2 text-[20px]">person_add</span>
                                <span className="relative text-white text-base font-bold leading-normal tracking-[0.015em]">Create Account</span>
                            </button>
                            {/* Secondary Button: Log In */}
                            <button onClick={() => navigate('/login')} className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary/10 hover:bg-primary/20 dark:bg-white/5 dark:hover:bg-white/10 text-primary dark:text-white transition-all active:scale-[0.98] border border-transparent dark:border-white/10">
                                <span className="material-symbols-outlined text-current mr-2 text-[20px]">login</span>
                                <span className="truncate text-base font-bold leading-normal tracking-[0.015em]">Log In</span>
                            </button>

                            {/* Footer Links */}
                            <div className="pt-4 flex items-center justify-center gap-4 text-xs text-slate-400 dark:text-slate-500 font-medium">
                                <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
                                <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
                                <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
                            </div>
                        </div>
                        {/* Safe Area Spacer for iOS Home Indicator */}
                        <div className="h-4 w-full"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};
