import db from "~~/server/util/db"


export default defineEventHandler(async (event)=>{
    const [results] = await db.query("SELECT Rain_id, Rain_persent, z.Zone_name, u.User_name , Rain_create, Rain_by FROM weather.Rain JOIN `Zone` z JOIN `User` u WHERE Rain_zone = z.Zone_id AND Rain_by = u.User_id;",)
    if (results.length > 0){
        const datas = results.map((data)=>{return{"id":data.Rain_id,"persent":data.Rain_persent,"by":data.User_name,"zone":data.Zone_name,"create":data.Rain_create}})
        return {status: 200,  message: "สำเร็จ",data:datas}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})