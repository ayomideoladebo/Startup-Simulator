import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';

export const CreateAccount = () => {
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
        const confirmPassword = formData.get('confirm-password') as string;

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            // 1. Sign Up
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;

            if (authData.user) {
                // 2. Create Profile
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                        id: authData.user.id,
                        username: email.split('@')[0], // Default username
                        avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${authData.user.id}`, // Random avatar
                    });

                if (profileError) {
                    console.error("Profile creation failed:", profileError);
                    // Continue anyway, we can retry later or let the trigger handle it if we had one
                }
                
                // 3. Navigate to Niche Selection
                navigate('/niche-selection');
            }
        } catch (err: any) {
            setError(err.message || "An error occurred during signup");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col items-center justify-center p-0 sm:p-4">
            {/* Main Container */}
            <div className="relative flex h-full w-full max-w-[480px] flex-col bg-background-light dark:bg-background-dark sm:rounded-xl overflow-hidden shadow-2xl">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 left-0 w-full h-64 bg-primary/20 blur-[100px] rounded-full pointer-events-none -translate-y-1/2"></div>

                {/* Header Section */}
                <div className="relative z-10 px-6 pt-10 pb-2">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-white shadow-lg shadow-primary/30">
                            <span className="material-symbols-outlined text-[24px]">rocket_launch</span>
                        </div>
                        <span className="text-sm font-bold tracking-widest uppercase text-primary">Startup Simulator</span>
                    </div>
                    <h1 className="text-3xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white">Begin Your Empire</h1>
                    <p className="mt-2 text-base font-normal text-slate-500 dark:text-slate-400">Initialize your startup simulation journey.</p>
                </div>

                {/* Form Section */}
                {error && (
                    <div className="mx-6 mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm text-center">
                        {error}
                    </div>
                )}
                <form className="relative z-10 flex flex-col gap-5 px-6 py-6" onSubmit={handleSubmit}>
                    {/* Email Field */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</span>
                        <input name="email" required className="w-full h-12 px-4 rounded-lg bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#453b54] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#a89db9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="founder@example.com" type="email" />
                    </label>

                    {/* Password Field */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Password</span>
                        <div className="relative flex items-center">
                            <input name="password" required className="w-full h-12 px-4 pr-12 rounded-lg bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#453b54] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#a89db9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Choose a secure password" type="password" />
                            <button className="absolute right-0 flex items-center justify-center h-full px-4 text-slate-400 hover:text-slate-600 dark:text-[#a89db9] dark:hover:text-white transition-colors" type="button">
                                <span className="material-symbols-outlined text-[20px]">visibility</span>
                            </button>
                        </div>
                    </label>

                    {/* Confirm Password Field */}
                    <label className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</span>
                        <input name="confirm-password" required className="w-full h-12 px-4 rounded-lg bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#453b54] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#a89db9] focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" placeholder="Re-enter password" type="password" />
                    </label>

                    {/* Divider */}
                    <div className="h-px w-full bg-slate-200 dark:bg-[#2a2435] my-2"></div>

                    {/* Terms & Conditions */}
                    <label className="flex items-start gap-3 mt-2 cursor-pointer group">
                        <div className="relative flex items-center">
                            <input className="w-5 h-5 rounded border-slate-300 dark:border-[#453b54] text-primary bg-white dark:bg-[#201c27] focus:ring-primary/50 focus:ring-offset-0 focus:ring-offset-transparent cursor-pointer" type="checkbox" />
                        </div>
                        <span className="text-sm text-slate-500 dark:text-[#a89db9] leading-tight group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                            I agree to the <a className="text-primary hover:underline" href="#">Terms of Service</a> and <a className="text-primary hover:underline" href="#">Privacy Policy</a>.
                        </span>
                    </label>

                    {/* Submit Button */}
                    <button disabled={loading} className="w-full h-14 mt-4 bg-primary hover:bg-primary/90 text-white font-bold text-lg rounded-lg shadow-lg shadow-primary/25 transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? (
                            <span>Initializing Empire...</span>
                        ) : (
                            <>
                                <span>Initialize Account</span>
                                <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </>
                        )}
                    </button>

                    {/* Social Login */}
                    <div className="flex flex-col gap-3 mt-4">
                        <div className="relative flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-200 dark:border-[#2a2435]"></div>
                            </div>
                            <span className="relative px-3 bg-background-light dark:bg-background-dark text-xs text-slate-400 dark:text-[#6b607a] uppercase tracking-wider">Or continue with</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-lg bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#453b54] hover:bg-slate-50 dark:hover:bg-[#2a2435] transition-colors">
                                <span className="material-symbols-outlined text-[20px]">ios</span>
                                <span className="text-sm font-medium">Apple</span>
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 h-12 rounded-lg bg-white dark:bg-[#201c27] border border-slate-200 dark:border-[#453b54] hover:bg-slate-50 dark:hover:bg-[#2a2435] transition-colors">
                                <img alt="Google Logo" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIdtna234Ofz3YgKZtiEDU-MIynJSXFXe1E1Rd_33OPAMkMfpQbXlj3MeD9ya1NU3wsQHmp1mUJSI83mlvgl6pGbmPCZ3s3mcmtXltH4aFBCY-UEyk9b4LRkHP2IFap2PWigXOGslVnptDS2FQn9aMcTbBFop5kWLgjl2HCfidHgt25nvEO__3GiJGvVGT9kEu05SskRdwo9HT6cSBbHaxy9dCF20xav_fB7Khlskx5TfwGdN3msPurnwq7C990jr5oIfbaSoBKes" />
                                <span className="text-sm font-medium">Google</span>
                            </button>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="text-center mt-4 pb-4">
                        <p className="text-sm text-slate-500 dark:text-[#a89db9]">
                            Already a Founder?
                            <button type="button" onClick={() => navigate('/login')} className="text-primary font-medium hover:text-primary/80 transition-colors ml-1">Log In</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
};
