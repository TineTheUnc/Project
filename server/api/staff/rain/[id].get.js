import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const results = await prisma.rain.findFirst({
        where: {
            Rain_id: Number(id)
        },
        select: {
            Rain_id: true,
            Rain_persent: true,
            Rain_zone: true
        }
    })
    if (results){
        const data = {"id":results.Rain_id,"persent":results.Rain_persent,"zone":results.Rain_zone}
        return {status: 200, data: data, message: "สำเร็จ"}
    }else{
        return {status: 404, message: "ไม่พบข้อมูล"}
    }
})