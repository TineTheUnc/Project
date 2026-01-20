import db from "../util/db"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    const body = await readBody(event)
    const name = body.name
    const email = body.email
    const password = body.password
    if (name&&email&&password){
        const [results] = await db.query("SELECT User_id FROM User WHERE User_email = ?",[email,password])
        if (results.length == 0){
            await db.query("INSERT INTO User (User_name, User_email, User_password)VALUES(?,?,?);",[name,email,password])
            return {status: 200 , message:"สำเร็จ"}
        }else{
            return {status: 400 , message:"มีผู้ใช้ email นี้แล้ว"}
        }
    }else
    {
        return {status: 400 , message:"โปรดใส่ข้อมูลให้ครบ"}
    }
})