import React from 'react';

const PlaceholderPage = ({ title, icon }: { title: string; icon: string }) => (
    <div className="flex flex-col items-center justify-center h-[50vh] text-white/50">
        <span className="material-symbols-outlined text-6xl mb-4 text-white/20">{icon}</span>
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-sm">Coming Soon</p>
    </div>
);

export const Product = () => <PlaceholderPage title="Product Development" icon="diamond" />;
export const Team = () => <PlaceholderPage title="Team Management" icon="groups" />;
export const Menus = () => <PlaceholderPage title="All Menus" icon="widgets" />;
export const Social = () => <PlaceholderPage title="Founders Feed" icon="public" />;
