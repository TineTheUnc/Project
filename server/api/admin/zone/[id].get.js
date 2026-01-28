import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const data = await prisma.zone.findFirst({
        where: {
            Zone_id: Number(id)
        }
    })
    if (data){
        return {status: 200,  message: "สำเร็จ",data:{"id":data.Zone_id,"name":data.Zone_name}}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})