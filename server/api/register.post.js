import prisma from "../util/db"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const password = body.password
    if (name&&email&&password){
        const results = await prisma.user.findFirst({
            where: {
                User_email: email
            },
            select: {
                User_id: true
            }
        })
        if (!results){
            await prisma.user.create({
                data: {
                    User_name: name,
                    User_email: email,
                    User_password: password
                }
            })
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีผู้ใช้ email นี้แล้ว"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})