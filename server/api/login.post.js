import db from "../util/db"
import jwt from "jsonwebtoken"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const email = body.email
    const password = body.password
    if (email&&password){
        const [results] = await db.query("SELECT * FROM User WHERE User_email = ? AND User_password = ?",[email,password])
        if (results.length >0){
            const data = results[0]
            const token = jwt.sign({"id":data.User_id,"name":data.User_name,"email":data.User_email,"role":data.User_role},config.app_secret)
            return {status: 200 , message:"สำเร็จ",data:token}
        }else{
            return {status: 404 , message:"email หรือ password ไม่ถูกต้อง"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})