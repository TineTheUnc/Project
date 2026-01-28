import prisma from '~~/server/util/db'
import jwt from 'jsonwebtoken'
import { readMultipartFormData, readBody, getHeader } from 'h3'
import { blob } from '@nuxthub/blob'

const config = useRuntimeConfig()

export default defineEventHandler(async (event) => {
    if (event.context.error) return event.context.error

    const userId = Number(event.context.user.id)

    let name = null
    let email = null
    let avatarUrl = null

    const contentType = getHeader(event, 'content-type') || ''

    // ===== multipart (มี avatar) =====
    if (contentType.includes('multipart/form-data')) {
        const form = await readMultipartFormData(event)
        if (!form) {
            return { status: 400, message: 'ข้อมูลไม่ถูกต้อง' }
        }

        const nameField = form.find(f => f.name === 'name')
        const emailField = form.find(f => f.name === 'email')
        const avatarFile = form.find(f => f.name === 'avatar')

        name = nameField?.data?.toString()
        email = emailField?.data?.toString()

        if (avatarFile && avatarFile.data) {
            const allowTypes = ['image/png', 'image/jpeg', 'image/webp']
            if (!allowTypes.includes(avatarFile.type)) {
                return { status: 400, message: 'ชนิดไฟล์ไม่ถูกต้อง' }
            }

            if (avatarFile.data.length > 2 * 1024 * 1024) {
                return { status: 400, message: 'ไฟล์ต้องไม่เกิน 2MB' }
            }

            const ext = avatarFile.type.split('/')[1]

            // ⬇️ upload เข้า Nuxt Blob
            await blob.put(
                `${userId}.${ext}`,
                avatarFile.data, {
                access: 'public',
                prefix: 'avatar/',
                customMetadata: {
                    userId: userId,
                    category: 'avatar',
                },
            }
            )
            avatarUrl = "/api/avatar?f=" + `/avatar/${userId}.${ext}`;
            console.log(avatarUrl);
            
        }
    }
    // ===== json ปกติ (ไม่มี avatar) =====
    else {
        const body = await readBody(event)
        name = body.name
        email = body.email
    }

    if (!name || !email) {
        return { status: 400, message: 'โปรดใส่ข้อมูลให้ครบ' }
    }

    const data = await prisma.user.update({
        where: {
            User_id: userId
        },
        data: {
            User_name: name,
            User_email: email,
            ...(avatarUrl ? { User_avatar: avatarUrl } : {})
        }
    })

    const token = jwt.sign(
        {
            id: data.User_id,
            name: data.User_name,
            email: data.User_email,
            role: data.User_role,
            avatar: data.User_avatar
        },
        config.app_secret
    )

    return {
        status: 200,
        message: 'สำเร็จ',
        data: token
    }
})
