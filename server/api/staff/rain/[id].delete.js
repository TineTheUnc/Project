import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const results = await prisma.rain.findFirst({
        where: {
            Rain_id: Number(id)
        }
    })
    if (results){
        await prisma.rain.delete({
            where: {
                Rain_id: Number(id)
            }
        })
        return {status: 200,  message: "สำเร็จ"}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})