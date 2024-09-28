"use client"
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';
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
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [providers, setProviders] = useState<SignInProps['providers']>(null);
    const [createAccount, setCreateAccount] = useState<boolean>(false)
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

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();

        const result = await signIn('credentials', {
            redirect: false,
            name,
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
        <div className="signin-container min-h-[calc(100dvh-64px-80px)] flex flex-col gap-4 items-center">
            <div className="w-fit h-fit py-14">
                <h1 className='text-3xl font-bold mb-7'>{createAccount ? "Create Account" : "Sign In"}</h1>
                {!createAccount ? <form onSubmit={handleSignIn} className="signin-form flex flex-col items-center space-y-4">
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <div className='flex flex-col gap-1'>
                        <Label htmlFor="email">Email</Label>
                        <input
                            id="email"
                            type="email"
                            className='flex h-11 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
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
                            className='flex h-11 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                            value={password}
                            placeholder='Enter your password'
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        className='p-6 min-w-[300px] rounded-full mt-4'
                        type="submit"
                    >
                        Sign In with Email
                    </Button>
                    <p
                        className="text-green-600 text-balance text-sm self-start font-normal"
                    >
                        Dont have an account ?{" "}
                        <span className="cursor-pointer hover:underline" onClick={() => setCreateAccount(true)}>Create Account</span>
                    </p>
                </form> : (
                    <form onSubmit={handleCreateAccount} className="signin-form flex flex-col items-center space-y-4">
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="name">Name</Label>
                            <input
                                id="name"
                                type="name"
                                className='flex h-11 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                value={name}
                                placeholder='Enter your name'
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor="email">Email</Label>
                            <input
                                id="email"
                                type="email"
                                className='flex h-11 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
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
                                className='flex h-11 w-[300px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
                                value={password}
                                placeholder='Enter your password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <Button
                            className='p-6 min-w-[300px] rounded-full mt-4'
                            type="submit"
                        >
                            Sign up with Email
                        </Button>
                        <p
                            className="text-green-600 text-balance text-sm self-start font-normal"
                        >
                            Already have an account ?{" "}
                            <span className="cursor-pointer hover:underline" onClick={() => setCreateAccount(false)}>Log in</span>
                        </p>
                    </form>
                )}
                <div className="w-full flex items-center justify-between my-5">
                    <div className="w-[40%] border border-gray-200" />
                    <span className="text-lg font-medium text-primary">or</span>
                    <div className="w-[40%] border border-gray-200" />
                </div>
                <div className='flex flex-col gap-4'>
                    {providers && Object.values(providers).map((provider) => {
                        if (provider.id === 'credentials') return null;
                        return (
                            <div key={provider.name}>
                                <Button
                                    className={cn('relative p-6 min-w-[300px] flex justify-center items-center border-2 rounded-full', provider.name === 'GitHub' ? "bg-black text-white hover:bg-black/75" : provider.name === "Google" ? "bg-white text-black hover:bg-slate-100" : "")}
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
    );
};

export default SignIn;
