import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import * as React from 'react'

const correctPassword = '89poker'

interface TitleProps {
    onSuccess: () => void
}

export function PasswordAuth({onSuccess}: TitleProps) {
    const [passwordVal, setPasswordVal] = React.useState('')
    console.log(passwordVal)
    
    const checkPassword = () => {
        if(passwordVal === correctPassword) {
            onSuccess()
        } else {
            alert('password incorrect')
        }
    }

    const onEnterKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            checkPassword()
        }
    }

    return(
        <div className="grid w-[90%] max-w-[600px] items-center justify-center gap-1">
            <Label className="text-2xl w-full" htmlFor="password">PASSWORD</Label>
            <Input 
                className="bg-white text-black w-full text-lg min-w-[500px]" 
                value={passwordVal}
                onChange={(e) => setPasswordVal(e.target.value)}
                onKeyDown={onEnterKeyDown}
                type="password"
            />
            <div className="w-full flex justify-end">
                <Button className="text-2xl hover:opacity-70 pr-1" onClick={checkPassword}>
                    ENTER
                </Button>
            </div>
        </div>
    )
}