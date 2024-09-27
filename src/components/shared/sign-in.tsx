"use client"
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect, Suspense } from 'react';
import { ClientSafeProvider, LiteralUnion } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import { FcGoogle } from 'react-icons/fc';
import { Label } from '@/components/ui/label';
import { BuiltInProviderType } from 'next-auth/providers/index';

interface SignInProps {
    providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | null;
};

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [providers, setProviders] = useState<SignInProps['providers']>(null);

    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get('callbackUrl') || '/';

    useEffect(() => {
        const fetchProviders = async () => {
            const res = await getProviders();
            setProviders(res);
        };

        fetchProviders();
    }, []);

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl,
        });

        if (result?.error) {
            setError(result.error);
        } else {
            window.location.href = callbackUrl;
        }
    };

    return (
        <Suspense>


            <div className="signin-container h-[calc(100dvh-64px-80px)] flex flex-col gap-4 items-center">
                <div className="w-fit h-fit mt-24">
                    <h1 className='text-3xl font-bold mb-7'>Sign In</h1>
                    <form onSubmit={handleSignIn} className="signin-form space-y-4">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="email">Email</Label>
                            <input
                                id="email"
                                type="email"
                                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                value={email}
                                placeholder='Enter your e-mail'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="password">Password</Label>
                            <input
                                id="password"
                                type="password"
                                className='flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                value={password}
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button className='py-5 px-6 w-full sm:min-w-[300px] rounded-full mt-4' type="submit">Sign In with Email</Button>
                    </form>
                    <div className="w-full border-t border-gray-300 my-5" />
                    <div className='flex flex-col gap-4'>
                        {providers && Object.values(providers).map((provider) => {
                            if (provider.id === 'credentials') return null;
                            return (
                                <div key={provider.name}>
                                    <Button
                                        className={cn('relative py-5 px-6 min-w-[350px] sm:min-w-[300px] flex justify-center items-center border-2 rounded-full', provider.name === 'GitHub' ? "bg-black text-white hover:bg-zinc-900" : provider.name === "Google" ? "bg-white text-black hover:bg-slate-100" : "")}
                                        onClick={() => signIn(provider.id, { callbackUrl })}
                                    >
                                        {provider.name === 'GitHub' ? <GitHubLogoIcon className='absolute left-5 w-5 h-5' /> : provider.name === "Google" ? <FcGoogle className='absolute left-5 w-5 h-5' /> : ""}
                                        Sign in with {provider.name}
                                    </Button>
                                </div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </Suspense>
    );
};

export default SignIn;
