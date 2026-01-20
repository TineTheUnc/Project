import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const id = event.context.user.id
    const persent = body.persent
    const zone = body.zone
    const date = new Date().toISOString().split("T")[0]
    
    if (persent&&zone){
        const [results] = await db.query("SELECT Rain_id, Rain_persent, Rain_zone, Rain_by, Rain_create FROM Rain WHERE Rain_create =? AND Rain_zone=?;",[date,zone])
        if (results.length > 0){
            await db.query("UPDATE Rain SET Rain_persent=?,Rain_by=? WHERE Rain_create =? AND Rain_zone=?;",[persent,id,date,zone])
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีไม่มีข้อมูลนี้"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})