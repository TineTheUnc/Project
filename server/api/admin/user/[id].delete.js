import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const results = await prisma.user.findFirst({
        where: {
            User_id: parseInt(id)
        }
    })
    if (results){
       await prisma.user.delete({
            where: {
                User_id: parseInt(id)
            }
        })
        return {status: 200,  message: "สำเร็จ"}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})