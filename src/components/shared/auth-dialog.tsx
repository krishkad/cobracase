import React from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AuthDialog = ({
    authDialog,
    setAuthDialog,
    id
}: {
    authDialog: boolean
    setAuthDialog: React.Dispatch<React.SetStateAction<boolean>>
    id: string
}) => {
    const router = useRouter();
    return (
        <Dialog
            open={authDialog}
            onOpenChange={() => setAuthDialog(false)}
        >
            <DialogContent className="w-[350px] sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Sign In to Proceed</DialogTitle>
                    <DialogDescription>
                        Your Configuration is successfully saved
                        <Check className='w-4 h-4 ml-1.5 inline' />
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button
                        onClick={() => {
                            router.push(`/auth/sign-in?callbackUrl=/configure/preview?id=${id}`);
                        }}
                    >
                        Sign-in
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AuthDialog;