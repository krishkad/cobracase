import React, { ReactNode } from 'react'
import MaxWidthWrapper from '@/components/shared/max-width-wrapper'
import ProgressSteps from '@/components/shared/progress-steps';

const ConfigureLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main className="w-full">
            <MaxWidthWrapper>
                <ProgressSteps />
                <main className="w-full">
                    {children}
                </main>
            </MaxWidthWrapper>
        </main>
    )
}

export default ConfigureLayout;