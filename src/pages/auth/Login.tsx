import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        try {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;

            // Check if user has a company setup already, otherwise go to niche selection
            // For now, simpler flow: go to dashboard. We can add a check later.
            navigate('/dashboard');
            
        } catch (err: any) {
            setError(err.message || "Invalid credentials");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display antialiased text-slate-900 dark:text-white transition-colors duration-200 min-h-screen flex flex-col">
            <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden">
                {/* Header */}
                <header className="flex items-center px-4 py-4 justify-between sticky top-0 z-10 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md">
                    <button onClick={() => navigate(-1)} className="flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors">
                        <span className="material-symbols-outlined text-slate-900 dark:text-white" style={{ fontSize: '24px' }}>arrow_back</span>
                    </button>
                    <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10">Log In</h2>
                </header>

                {/* Main Content */}
                <main className="flex-1 flex flex-col px-6 pt-4 pb-8 max-w-md mx-auto w-full justify-center">
                    {/* Hero Text */}
                    <div className="mb-8 text-center">
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight tracking-tight mb-2">Welcome Back, CEO</h1>
                        <p className="text-slate-500 dark:text-gray-400 text-base font-normal">Your empire is waiting.</p>
                    </div>

                    {/* Form */}
                    {error && (
                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-1.5">
                            <label className="sr-only" htmlFor="email">Email Address or Username</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 dark:text-gray-500 group-focus-within:text-primary transition-colors">mail</span>
                                </div>
                                <input name="email" required className="form-input w-full rounded-xl border-none bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 h-14 pl-12 pr-4 text-base focus:ring-2 focus:ring-primary shadow-sm dark:shadow-none transition-all" id="email" placeholder="Email Address or Username" type="text" />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="flex flex-col gap-1.5">
                            <label className="sr-only" htmlFor="password">Password</label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <span className="material-symbols-outlined text-slate-400 dark:text-gray-500 group-focus-within:text-primary transition-colors">lock</span>
                                </div>
                                <input name="password" required className="form-input w-full rounded-xl border-none bg-white dark:bg-surface-dark text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 h-14 pl-12 pr-12 text-base focus:ring-2 focus:ring-primary shadow-sm dark:shadow-none transition-all" id="password" placeholder="Password" type="password" />
                                <button className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300" type="button">
                                    <span className="material-symbols-outlined">visibility</span>
                                </button>
                            </div>
                            {/* Forgot Password Link */}
                            <div className="flex justify-end mt-1">
                                <a className="text-sm font-medium text-primary hover:text-primary/80 transition-colors" href="#">
                                    Forgot Password?
                                </a>
                            </div>
                        </div>

                        {/* Login Button */}
                        <button disabled={loading} className="w-full bg-primary hover:bg-primary/90 text-white font-bold h-14 rounded-xl text-base shadow-lg shadow-primary/25 active:scale-[0.98] transition-all mt-4 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                            {loading ? (
                                <span>Logging in...</span>
                            ) : (
                                <>
                                    <span>Log In</span>
                                    <span className="material-symbols-outlined text-[20px]">login</span>
                                </>
                            )}
                        </button>

                        {/* Biometric Login (Optional Decoration) */}
                        <div className="flex justify-center mt-4">
                            <button type="button" aria-label="Login with FaceID" className="p-3 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                <span className="material-symbols-outlined text-3xl text-slate-400 dark:text-gray-600">face</span>
                            </button>
                        </div>
                    </form>

                    {/* Footer */}
                    <div className="mt-auto pt-8 text-center">
                        <p className="text-slate-500 dark:text-gray-400 text-sm">
                            Don't have an account?
                            <button onClick={() => navigate('/create-account')} className="text-primary font-bold hover:underline ml-1">Sign Up</button>
                        </p>
                    </div>
                </main>
            </div>
        </div>
    );
};
