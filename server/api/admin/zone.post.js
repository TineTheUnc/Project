import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const name = body.name
    if (name){
        await db.query("INSERT INTO Zone (Zone_name)VALUES(?);",[name])
        return {status: 200 , message:"สำเร็จ"}
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    } 
})