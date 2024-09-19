import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const MaxWidthWrapper = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn('max-w-7xl mx-auto px-4 sm:px-5 md:px-8', className)}>
            {children}
        </div>
    )
}

export default MaxWidthWrapper