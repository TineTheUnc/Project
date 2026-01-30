import prisma from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const results = await prisma.user.findFirst({
        where: {
            User_id: parseInt(id)
        }
    })
    if (results){
        return {status: 200,  message: "สำเร็จ",data:{"id":results.User_id,"name":results.User_name,"email":results.User_email,"role":results.User_role}}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})