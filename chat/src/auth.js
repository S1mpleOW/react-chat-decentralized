import GUN from 'gun'
import 'gun/sea'
import 'gun/axe'
import { useState } from 'react'

//database
export const db = GUN()

//gun user
export const user = db.user().recall({ sessionStorage: true })



