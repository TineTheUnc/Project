export default defineEventHandler(async (event)=>{
    if (event.context.error) return event.context.error    
    return {status:200, data:event.context.user}
})