import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const id = event.context.params
    const [results] = await db.query("SELECT * FROM User;",)
    if (results.length > 0){
        const datas = results.map((data)=> {return {"id":data.User_id,"name":data.User_name,"email":data.User_email,"role":data.User_role}})
        return {status: 200,  message: "สำเร็จ",data:datas}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})