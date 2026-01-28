import fs from 'fs'
import { setHeader } from 'h3'
import { blob } from '@nuxthub/blob'

export default defineEventHandler(async (event) => {
    const file = getQuery(event).f
    console.log(file)
    setHeader(event, 'Content-Security-Policy', 'default-src \'/img/avatar.jpg\';')
    return blob.serve(event, file)
})
