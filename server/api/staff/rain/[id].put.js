import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const persent = body.persent
    const zone = body.zone
    const result = await prisma.rain.findFirst({
        where: {
            Rain_id: parseInt(id)
        },
        select: {
            Rain_id: true,
            Rain_persent: true,
            Rain_zone: true,
            Rain_by: true,
            Rain_create: true
        }
    })
    if (result){
        const data1 = result
        const result2 = await prisma.rain.findFirst({
            where: {
                Rain_zone: zone,
                Rain_create: data1.Rain_create
            },
            select: {
                Rain_id: true
            }
        })
        if (!result2 || result2.Rain_id == id){
            await prisma.rain.update({
                where: {
                    Rain_id: parseInt(id)
                },
                data: {
                    Rain_persent: parseInt(persent),
                    Rain_zone: parseInt(zone)
                }
            })
            return {status: 200, message: "สำเร็จ"}
        }else{
            return {status: 400, message: "ข้อมูลซ้ำ"}
        }
    }else{
        return {status: 404, message: "ไม่พบข้อมูล"}
    }
})