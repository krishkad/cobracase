import React from 'react'
import MaxWidthWrapper from './max-width-wrapper'

const Navbar = () => {
    return (
        <div className='w-full z-50 sticky top-0 bg-slate-100/50'>
            <MaxWidthWrapper className='h-16 flex justify-between items-center'>
                Navbar
            </MaxWidthWrapper>
        </div>
    )
}

export default Navbar