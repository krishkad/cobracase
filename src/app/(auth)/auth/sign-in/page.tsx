"use client"
import React, { Suspense } from 'react'
import SignIn from '@/components/shared/sign-in'

const SignInPage = () => {
    return (
        <Suspense>
            <SignIn />
        </Suspense>
    );
};

export default SignInPage;