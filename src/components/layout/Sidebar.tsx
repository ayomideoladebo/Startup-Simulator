import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const SidebarItem = ({ to, icon, label, exact = false }: { to: string; icon: string; label: string; exact?: boolean }) => {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                    isActive
                        ? "bg-primary text-white shadow-md shadow-primary/25"
                        : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-slate-900 dark:hover:text-white"
                )
            }
        >
            {({ isActive }) => (
                <>
                    <span className={clsx("material-symbols-outlined text-xl transition-transform group-hover:scale-110")}>
                        {icon}
                    </span>
                    <span className="font-medium text-sm">
                        {label}
                    </span>
                    {isActive && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white/50" />
                    )}
                </>
            )}
        </NavLink>
    );
};

export const Sidebar = () => {
    return (
        <aside className="hidden md:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-card-dark border-r border-gray-200 dark:border-white/5 shrink-0 z-50">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light text-white shadow-lg shadow-primary/20">
                        <span className="material-symbols-outlined text-2xl">rocket_launch</span>
                    </div>
                    <div>
                        <h1 className="font-bold text-slate-900 dark:text-white leading-tight">Startup Sims</h1>
                        <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Beta v2.4</span>
                    </div>
                </div>

                <nav className="space-y-1">
                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2 mt-2">Main</div>
                    <SidebarItem to="/dashboard" icon="dashboard" label="Dashboard" />
                    <SidebarItem to="/product" icon="diamond" label="Product" />
                    <SidebarItem to="/team" icon="groups" label="Team" />

                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">Management</div>
                    <SidebarItem to="/finance" icon="payments" label="Finance" />
                    <SidebarItem to="/market/news" icon="newspaper" label="Market News" />
                    <SidebarItem to="/menu" icon="widgets" label="Command Menu" />

                    <div className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-4 mb-2 mt-6">Social</div>
                    <SidebarItem to="/social" icon="public" label="Social Feed" />
                    <SidebarItem to="/settings" icon="settings" label="Settings" />
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-gray-200 dark:border-white/5">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-gray-200 dark:border-white/5">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-purple-500 p-0.5">
                        <img
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBFOdFKRLuTvavaBs6GhsP_jwZy-5b97cuxDJ3YNMoOYZVjpkc9oimgD88-TLb7eYVF4cvLj6tBrjxvx3sDGQAfHjZvaOKXbkLygtbagkRkNIKuoyuRX1Y2pSnPzzwoCMxDHC1eQE9eDjyipkUW9R8erKnzEP-FPx2d2slDe9lWLk4N2uf8uymAgAqXUZAmqWtTR5QEI6hW5q8tDRqJQEdtRPUQO9sy7fxU2YQejTDrw29XelzFmNtBYPcRHR3Gvoqx6lRTH1uO59o"
                            alt="CEO"
                            className="w-full h-full rounded-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="text-sm font-bold text-slate-900 dark:text-white truncate">Alex Founder</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate">Level 5 CEO</div>
                    </div>
                </div>
            </div>
        </aside>
    );
};
