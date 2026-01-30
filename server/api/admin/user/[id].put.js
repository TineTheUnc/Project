import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const role = body.role
    if (!name || !email || !role){
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
    const results = await prisma.user.findFirst({
        where: {
            User_id: Number(id)
        }
    })
    if (results){
        await prisma.user.update({
            where: {
                User_id: parseInt(id)
            },
            data: {
                User_name: name,
                User_email: email,
                User_role: role
            }
        })
        return {status: 200,  message: "สำเร็จ"}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})