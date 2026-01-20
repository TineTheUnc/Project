import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const name = body.name
    if (!name){
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
    const [results] = await db.query("SELECT * FROM Zone WHERE Zone_id = ?;",[id])
    if (results.length > 0){
        await db.query("UPDATE Zone SET Zone_name = ? WHERE Zone_id = ?;",[name,id])
        return {status: 200,  message: "สำเร็จ"}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})