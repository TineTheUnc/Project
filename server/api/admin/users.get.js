import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const results = await prisma.user.findMany({
        select: {
            User_id: true,
            User_name: true,
            User_email: true,
            User_role: true
        }
    })
    if (results.length > 0){
        const data = results.map((result) => ({
            "id": result.User_id,
            "name": result.User_name,
            "email": result.User_email,
            "role": result.User_role
        }))
        return {status: 200,  message: "สำเร็จ",data:data}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})