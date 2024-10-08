import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

import * as React from 'react'

const correctPassword = 'allin'

interface TitleProps {
    onSuccess: () => void
}

export function PasswordAuth({onSuccess}: TitleProps) {
    const [passwordVal, setPasswordVal] = React.useState('')
    
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
            <Label className="text-1xl md:text-2xl w-full justify-start" htmlFor="password">PASSWORD</Label>
            <Input 
                className="bg-white text-black table-font w-full text-lg min-w-[300px] md:min-w-[400px]" 
                value={passwordVal}
                onChange={(e) => setPasswordVal(e.target.value)}
                onKeyDown={onEnterKeyDown}
                type="password"
            />
            <div className="w-full flex justify-end">
                <Button className="text-1xl md:text-2xl hover:opacity-70 pr-1" onClick={checkPassword}>
                    ENTER
                </Button>
            </div>
        </div>
    )
}