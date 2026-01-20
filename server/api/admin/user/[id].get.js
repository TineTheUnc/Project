import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const [results] = await db.query("SELECT * FROM User WHERE User_id = ?;",[id])
    if (results.length > 0){
        const data = results[0]
        return {status: 200,  message: "สำเร็จ",data:{"id":data.User_id,"name":data.User_name,"email":data.User_email,"role":data.User_role}}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})