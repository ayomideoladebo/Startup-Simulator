import React from 'react';

interface TopHeaderProps {
    companyName: string;
    stage: string;
    energy?: number;
}

export const TopHeader = ({ companyName = "Neuromancer Inc.", stage = "Series A", energy = 100 }: TopHeaderProps) => {
    return (
        <header className="sticky top-0 z-50 glass-panel border-b border-card-border px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <button className="text-white/80 hover:text-white transition-colors">
                    <span className="material-symbols-outlined">menu</span>
                </button>
                <div className="flex flex-col">
                    <h1 className="text-white text-base font-bold leading-none tracking-tight">{companyName}</h1>
                    <span className="text-white/40 text-[10px] uppercase tracking-wider font-semibold mt-1">{stage}</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 bg-card-border/50 px-2 py-1 rounded-full border border-white/5">
                    <span className="material-symbols-outlined text-accent-green text-[16px]">bolt</span>
                    <span className="text-xs font-mono font-bold">{energy}%</span>
                </div>
                <button className="text-white/80 hover:text-primary transition-colors">
                    <span className="material-symbols-outlined">pause_circle</span>
                </button>
            </div>
        </header>
    );
};
