import prisma from "~~/server/util/db"

export default defineEventHandler(async (event)=>{
    const id = event.context.params
    const results = await prisma.zone.findMany({
        select: {
            Zone_id: true,
            Zone_name: true
        }
    })
    if (results.length > 0){
        const datas = results.map((data)=> {return {"id":data.Zone_id,"name":data.Zone_name}})
        return {status: 200,  message: "สำเร็จ",data:datas}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})