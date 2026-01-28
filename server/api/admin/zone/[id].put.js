import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const name = body.name
    if (!name){
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
    const results = await prisma.zone.findFirst({
        where: {
            Zone_id: parseInt(id)
        }
    })
    if (results){
        const results2 = await prisma.zone.findFirst({
            where: {
                Zone_name: name,
                Zone_id: {
                    not: parseInt(id)
                }
            }
        })
        if (results2){
            return {status: 400, message: "ชื่อเขตซ้ำ"}
        }else{
            await prisma.zone.update({
                where: {
                    Zone_id: parseInt(id)
                },
                data: {
                    Zone_name: name
                }
            })
            return {status: 200, message: "สำเร็จ"}
        }
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})