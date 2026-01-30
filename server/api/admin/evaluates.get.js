import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const year = getQuery(event).year
    
    const results = await prisma.estimate.findMany({
        select: {
            Estimate_data: true,
            staff:{
              select:{
                User_id: true,
                User_name: true,
                User_email: true
              }
            }
        },
        where: { Estimate_create: year }
    })
    if (results.length > 0){
        const data = results.map((result) => ({
            "id": result.staff.User_id,
            "name": result.staff.User_name,
            "email": result.staff.User_email,
            "estimate": result.Estimate_data
        }))
        return {status: 200,  message: "สำเร็จ",data:data}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})