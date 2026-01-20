import db from "~~/server/util/db"
import jwt from "jsonwebtoken"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    if (event.context.error) return event.context.error
    const id = event.context.user.id
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    if (!name || !email){
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
    await db.query("UPDATE User SET User_name = ?, User_email = ? WHERE User_id = ?;",[name,email,id])
    const [results] = await db.query("SELECT * FROM User WHERE User_id = ?;",[id])
    const data = results[0]
    const token = jwt.sign({"id":data.User_id,"name":data.User_name,"email":data.User_email,"role":data.User_role},config.app_secret)
    return {status: 200,  message: "สำเร็จ",data:token}
})