import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
  const userId = parseInt(event.context.user.id)
    const result = await prisma.estimate.findMany({
        where:{
          Estimate_staff: userId
        },
        select:{
          Estimate_id: true,
          Estimate_data: true,
          Estimate_create: true
        },
        orderBy: {Estimate_create: 'desc'}
    })
    if (result.length > 0){
        const data = result.map((r) => ({
            "id": r.Estimate_id,
            "data": r.Estimate_data,
            "create": r.Estimate_create,
        }))
        return {status: 200,  message: "สำเร็จ",data:data}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})