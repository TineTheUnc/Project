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
        if (!results){
            await prisma.rain.create({
                data: {
                    Rain_persent: parseInt(persent),
                    Rain_zone: parseInt(zone),
                    Rain_by: parseInt(id),
                    Rain_create: date
                }
            })
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีข้อมูลนี้แล้ว"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})