import React from 'react';
import clsx from 'clsx';

interface MobileContainerProps {
    children: React.ReactNode;
    className?: string;
}

export const MobileContainer = ({ children, className }: MobileContainerProps) => {
    return (
        <div className={clsx(
            "relative flex h-screen w-full flex-col bg-background-dark overflow-y-auto overflow-x-hidden mx-auto border-x border-card-border shadow-2xl transition-all duration-300",
            "max-w-md md:max-w-full md:border-none md:shadow-none",
            className
        )}>
            {children}
        </div>
    );
};
