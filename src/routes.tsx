import { useState, useEffect } from 'react';
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { useGameState } from "./hooks/useGameState";    // Added import
import { MobileContainer } from "./components/layout/MobileContainer";
import { TopHeader } from "./components/layout/TopHeader";
import { BottomNav } from "./components/layout/BottomNav";
import { Sidebar } from "./components/layout/Sidebar";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { Onboarding } from "./pages/onboarding/Onboarding";
import { NicheSelection } from "./pages/onboarding/NicheSelection";
import { Product } from "./pages/product/Product";
import { ProductResults } from "./pages/product/ProductResults";
import { Team } from "./pages/team/Team";
import { Menu } from "./pages/menu/Menu";
import { Social } from "./pages/social/Social";
import { Profile } from "./pages/social/Profile";
import { Finance } from "./pages/finance/Finance";
import { Valuation } from "./pages/finance/Valuation";
import { Bank } from "./pages/finance/Bank";
import { LoanApplication } from "./pages/finance/LoanApplication";
import { EmergencyCutbacks } from "./pages/finance/EmergencyCutbacks";
import { Pricing } from "./pages/product/Pricing";
import { CreateTier } from "./pages/product/CreateTier";
import { InvestorRelations } from "./pages/finance/InvestorRelations";
import { UpdateStakeholders } from "./pages/finance/UpdateStakeholders";
import { ScheduleMeeting } from "./pages/finance/ScheduleMeeting";
import { InvestorInquiries } from "./pages/finance/InvestorInquiries";
import { InvestorChat } from "./pages/finance/InvestorChat";
import { CraftPitch } from "./pages/finance/CraftPitch";
import { InvestorOffer } from "./pages/finance/InvestorOffer";
import { MarketInsights } from "./pages/market/MarketInsights";
import { MarketNews } from "./pages/market/MarketNews";
import { UpcomingAwards } from "./pages/awards/UpcomingAwards";
import { MyAwards } from "./pages/awards/MyAwards";
import { Settings } from "./pages/settings/Settings";

// Helper type for the context
type GameLayoutContextType = {
    setBottomNavVisible: (visible: boolean) => void;
};

// Layout wrapper for authenticated game pages
const GameLayout = () => {
    const location = useLocation();
    const isDashboard = location.pathname === '/dashboard';
    const [isBottomNavVisible, setBottomNavVisible] = useState(true);
    
    // Fetch Global Game State for the Header (and eventually Sidebar)
    const { company, loading } = useGameState();

    // Reset bottom nav visibility on route change (in case a page forgets to reset it)
    useEffect(() => {
        setBottomNavVisible(true);
    }, [location.pathname]);

    return (
        <div className="flex h-screen w-full bg-background-light dark:bg-[#181022]">
            <Sidebar />
            <div className="flex-1 min-w-0">
                <MobileContainer>
                    {isDashboard && (
                        <div className="md:hidden">
                            <TopHeader 
                                companyName={loading ? "Loading..." : (company?.name || "My Startup")} 
                                stage={loading ? "..." : (company?.stage || "Pre-Seed")} 
                            />
                        </div>
                    )}
                    {isDashboard && <div className="hidden md:flex sticky top-0 z-20 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 py-4 border-b border-gray-200 dark:border-white/5 justify-between items-center">
                        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Dashboard</h2>
                        <div className="flex items-center gap-3">
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 font-bold text-xs flex items-center gap-1">
                                <span className="material-symbols-outlined text-sm">trending_up</span>
                                +12.5%
                            </div>
                        </div>
                    </div>}
                    <div className="flex-1 overflow-y-auto no-scrollbar relative z-0">
                        <Outlet context={{ setBottomNavVisible } satisfies GameLayoutContextType} />
                    </div>
                    {isBottomNavVisible && <BottomNav />}
                </MobileContainer>
            </div>
        </div>
    );
};

import { CreateAccount } from "./pages/auth/CreateAccount";
import { Login } from "./pages/auth/Login";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Onboarding />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/login" element={<Login />} />
            <Route path="/niche-selection" element={<NicheSelection />} />
            <Route path="/finance/inquiries" element={<InvestorInquiries />} />
            <Route path="/finance/chat" element={<InvestorChat />} />
            <Route path="/finance/pitch" element={<CraftPitch />} />
            <Route path="/finance/offer" element={<InvestorOffer />} />
            <Route path="/market/insights" element={<MarketInsights />} />
            <Route path="/market/news" element={<MarketNews />} />
            <Route path="/awards/upcoming" element={<UpcomingAwards />} />
            <Route path="/awards/my-awards" element={<MyAwards />} />
            <Route path="/settings" element={<Settings />} />

            {/* Game Routes wrapped in Layout */}
            <Route element={<GameLayout />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/product" element={<Product />} />
                <Route path="/product/pricing" element={<Pricing />} />
                <Route path="/product/pricing/new" element={<CreateTier />} />
                <Route path="/product/results/:featureId" element={<ProductResults />} /> 
                <Route path="/team" element={<Team />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/finance" element={<Finance />} />
                <Route path="/finance/valuation" element={<Valuation />} />
                <Route path="/finance/bank" element={<Bank />} />
                <Route path="/finance/loans/new" element={<LoanApplication />} />
                <Route path="/finance/cutbacks" element={<EmergencyCutbacks />} />
                <Route path="/finance/investors" element={<InvestorRelations />} />
                <Route path="/finance/investors/update" element={<UpdateStakeholders />} />
                <Route path="/finance/investors/schedule" element={<ScheduleMeeting />} />


                <Route path="/social" element={<Social />} />
                <Route path="/social/profile" element={<Profile />} />
            </Route>
        </Routes>
    );
};
