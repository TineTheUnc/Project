import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const [results] = await db.query("SELECT * FROM Zone WHERE Zone_id = ?;",[id])
    if (results.length > 0){
        const data = results[0]
        return {status: 200,  message: "สำเร็จ",data:{"id":data.Zone_id,"name":data.Zone_name}}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})