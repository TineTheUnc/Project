

export default defineNuxtRouteMiddleware(async (to,from)=>{
    const user = "/user/"
    const staff = "/staff/"
    const admin = "/admin/"
    const protect = [user,staff,admin]
    if (!protect.some((path)=>to.path.startsWith(path))) return 
    if (import.meta.client){
        const token = localStorage.getItem('token')
        if (token){
            const {data} = await $fetch("/api/user/me",{
                method:"GET",
                headers:{
                    "Authentication": "App "+token
                }
            })
            if (data){
                if (to.path == "/user/weather" || to.path == "/user/profile" || to.path == "/user/profileEdit") return
                if (to.path.startsWith(user) && data.role != "user") location.assign("/")
                if (to.path.startsWith(staff) && data.role != "staff") location.assign("/")
                if (to.path.startsWith(admin) && data.role != "admin") location.assign("/")
            }else{
                localStorage.clear()
                location.assign("/login")
            }
        }else{
            location.assign("/login")
        }
    }
})