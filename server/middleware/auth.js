import jwt from "jsonwebtoken"

const config = useRuntimeConfig()
export default defineEventHandler(async (event)=>{
    const user = "/api/user/"
    const staff = "/api/staff/"
    const admin = "/api/admin/"
    const protect = [user,staff,admin]
    if (!protect.some((path)=>event.path.startsWith(path))) return
    
    const header = getHeader(event,"Authentication")
    if (!header){
        event.context.error = {status:403,message:"ต้องการยืนยันตัวตน"}
    }

    const token = header.split(" ")[1]
    try{    
        event.context.user = jwt.verify(token,config.app_secret)
        const role = event.context.user.role
        if (event.path == "/api/user/me") return
        if (event.path.startsWith(user) && role != "user") event.context.error = {status:403,message:"ไม่มีสิทธิ์"}
        if (event.path.startsWith(staff) && role != "staff") event.context.error = {status:403,message:"ไม่มีสิทธิ์"}
        if (event.path.startsWith(admin) && role != "admin") event.context.error = {status:403,message:"ไม่มีสิทธิ์"}
    }catch(error)
    {
        event.context.error = {status:500,message:error}
    }
})