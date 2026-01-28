import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const result = await prisma.rain.findMany({
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
        },
        orderBy: {Rain_create: 'desc'}
    })
    if (result.length > 0){
        const data = result.map((r) => ({
            "id": r.Rain_id,
            "persent": r.Rain_persent,
            "by": r.user.User_name,
            "zone": r.zone.Zone_name,
            "create": r.Rain_create
        }))
        return {status: 200,  message: "สำเร็จ",data:data}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})