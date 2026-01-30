import prisma from "../util/db"
import jwt from "jsonwebtoken"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const email = body.email
    const password = body.password
    if (email&&password){
        const data = await prisma.user.findFirst({
            where: {
                User_email: email,
                User_password: password
            },
            select: {
                User_id: true,
                User_name: true,
                User_email: true,
                User_role: true,
                User_avatar: true
            }
        })
        if (data){
            const token = jwt.sign({"id":data.User_id,"name":data.User_name,"email":data.User_email,"role":data.User_role,"avatar":data.User_avatar},config.app_secret)
            return {status: 200 , message:"สำเร็จ",data:token}
        }else{
            return {status: 404 , message:"email หรือ password ไม่ถูกต้อง"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})