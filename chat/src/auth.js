import GUN from 'gun'
import 'gun/sea'
import 'gun/axe'
import { useState } from 'react'

//database
export const db = GUN()

//gun user
export const user = db.user().recall({ sessionStorage: true })

//current user
export function HandleUsername () {
    const [ userName, setUsername ] = useState('')

    //alias : la username nguoi dung nhap vao
    user.get('alias').on(v => setUsername(v))

    db.on('auth', async (evt) => {
        const alias = await user.get('alias');
        setUsername(alias)

        console.log(`sign in as ${userName}`)
    })
}



