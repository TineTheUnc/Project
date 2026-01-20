import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const [results] = await db.query("SELECT * FROM Rain WHERE Rain_id=?;",[id])
    if (results.length > 0){
        const data = {"id":results[0].Rain_id,"persent":results[0].Rain_persent,"zone":results[0].Rain_zone}
        return {status: 200, data: data, message: "สำเร็จ"}
    }else{
        return {status: 404, message: "ไม่พบข้อมูล"}
    }
})