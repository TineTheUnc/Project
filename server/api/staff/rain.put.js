import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const id = event.context.user.id
    const persent = body.persent
    const zone = body.zone
    const date = new Date().toISOString().split("T")[0]
    
    if (persent&&zone){
        const results = await prisma.rain.findFirst({
            where: {
                Rain_create: date,
                Rain_zone: parseInt(zone)
            },
            select: {
                Rain_id: true,
                Rain_persent: true,
                Rain_zone: true,
                Rain_by: true,
                Rain_create: true
            }
        })
        if (results){
            await prisma.rain.update({
                where: {
                    Rain_create: date,
                    Rain_zone: parseInt(zone)
                },
                data: {
                    Rain_persent: parseInt(persent),
                    Rain_by: Number(id)
                }
            })
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีไม่มีข้อมูลนี้"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})