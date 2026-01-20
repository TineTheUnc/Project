import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params.id
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const role = body.role
    if (!name || !email || !role){
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
    const [results] = await db.query("SELECT * FROM User WHERE User_id = ?;",[id])
    if (results.length > 0){
        await db.query("UPDATE User SET User_name = ?, User_email = ?, User_role = ? WHERE User_id = ?;",[name,email,role,id])
        return {status: 200,  message: "สำเร็จ"}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})