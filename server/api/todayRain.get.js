import db from "../util/db"

export default defineEventHandler(async (event)=>{
    const date = new Date()
    const [results] = await db.query("SELECT Rain_id, Rain_persent, z.Zone_name , Rain_create FROM weather.Rain JOIN `Zone` z WHERE Rain_zone = z.Zone_id AND Rain_create = ?;",[date.toISOString().split("T")[0]])
    if (results.length > 0){
        const datas = results.map((data)=>{return{"id":data.Rain_id,"persent":data.Rain_persent,"by":data.Rain_by,"zone":data.Zone_name,"create":data.Rain_create}})
        return {status: 200,  message: "สำเร็จ",data:datas}
    }else{
        return {status: 404,  message: "ไม่พบข้อมูล"}
    }
})