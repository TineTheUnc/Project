import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const id = event.context.user.id
    const persent = body.persent
    const zone = body.zone
    const date = new Date().toISOString().split("T")[0]
    
    if (persent&&zone){
        const [results] = await db.query("SELECT Rain_id, Rain_persent, Rain_zone, Rain_by, Rain_create FROM Rain WHERE Rain_create =? AND Rain_zone=?;",[date,zone])
        if (results.length == 0){
            await db.query("INSERT INTO weather.Rain (Rain_persent, Rain_zone, Rain_by, Rain_create)VALUES(?,?,?,?);",[persent,zone,id,date])
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีข้อมูลนี้แล้ว"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})