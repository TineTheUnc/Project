import prisma from "../util/db"

export default defineEventHandler(async (event)=>{   
    const date = new Date()
    const results = await prisma.rain.findMany({
        where: {
            Rain_create: date.toISOString().split("T")[0]
        },
        select: {
            Rain_id: true,
            Rain_persent: true,
            zone: {
                select: {
                    Zone_name: true
                }
            },
            user: {
                select: {
                    User_name: true
                }
            }
        }
    })
    if (results.length > 0){
        const datas = results.map((data)=>{return{"id":data.Rain_id,"persent":data.Rain_persent,"by":data.user.User_name,"zone":data.zone.Zone_name,"create":data.Rain_create}})
        return {status: 200,  message: "สำเร็จ",data:datas}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})