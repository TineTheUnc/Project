import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const name = body.name
    if (name){
        const results = await prisma.zone.findFirst({
            where: {
                Zone_name: name
            },
            select: {
                Zone_id: true,
                Zone_name: true
            }
        })
        if (!results){
            await prisma.zone.create({
                data: {
                    Zone_name: name
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