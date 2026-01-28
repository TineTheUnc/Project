import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const date = getQuery(event).date
    const results = await prisma.rain.findMany({
        where: {
            Rain_create: date
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
            },
            Rain_create: true
        }
    })
    
    if (results.length > 0){
        const data = results.map((result) => ({
            "id": result.Rain_id,
            "persent": result.Rain_persent,
            "by": result.user.User_name,
            "zone": result.zone.Zone_name,
            "create": result.Rain_create
        }))
        return {status: 200,  message: "สำเร็จ",data:data}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})