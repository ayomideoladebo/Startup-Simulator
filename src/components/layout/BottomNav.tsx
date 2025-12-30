import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const NavItem = ({ to, icon, label, exact = false }: { to: string; icon: string; label: string; exact?: boolean }) => {
    return (
        <NavLink
            to={to}
            end={exact}
            className={({ isActive }) =>
                clsx(
                    "flex flex-col items-center gap-1 group w-1/5",
                    isActive ? "text-primary" : "text-white/40 hover:text-white"
                )
            }
        >
            {({ isActive }) => (
                <>
                    <span
                        className={clsx(
                            "material-symbols-outlined text-2xl transition-all group-hover:scale-110",
                            isActive ? "fill-1" : "fill-0"
                        )}
                    >
                        {icon}
                    </span>
                    <span className="text-[10px] font-medium transition-colors">
                        {label}
                    </span>
                </>
            )}
        </NavLink>
    );
};

export const BottomNav = () => {
    return (
        <nav className="fixed bottom-0 w-full max-w-md md:hidden bg-card-dark/95 backdrop-blur border-t border-card-border z-40">
            <div className="flex justify-between items-center px-2 py-3">
                <NavItem to="/dashboard" icon="dashboard" label="Dashboard" />
                <NavItem to="/product" icon="diamond" label="Product" />
                <NavItem to="/team" icon="groups" label="Team" />
                <NavItem to="/menu" icon="widgets" label="Menus" />
                <NavItem to="/social" icon="public" label="Social" />
            </div>
            <div className="h-4 w-full"></div>
        </nav>
    );
};
