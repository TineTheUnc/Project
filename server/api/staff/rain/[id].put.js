import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const persent = body.persent
    const zone = body.zone
    const [results] = await db.query("SELECT * FROM Rain WHERE Rain_id=?;",[id])
    if (results.length > 0){
        const data1 = results[0]
        const [results2] = await db.query("SELECT * FROM Rain WHERE Rain_zone=? AND Rain_create=?;",[zone,data1.Rain_create])
        if (results2.length == 0 || results2[0].Rain_id == id){
            await db.query("UPDATE Rain SET Rain_persent=?, Rain_zone=? WHERE Rain_id=?;",[persent,zone,id])
            return {status: 200, message: "สำเร็จ"}
        }else{
            return {status: 400, message: "ข้อมูลซ้ำ"}
        }
    }else{
        return {status: 404, message: "ไม่พบข้อมูล"}
    }
})