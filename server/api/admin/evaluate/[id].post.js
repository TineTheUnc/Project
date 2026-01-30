import prisma from "~~/server/util/db"


export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const body = await readBody(event)
  const data = body.scores
  
  if (data) {
    const today = new Date().getFullYear().toString()
    const results = await prisma.estimate.findMany({
      where: {
        Estimate_staff: parseInt(id),
        Estimate_create: today
      },
      select: {
        Estimate_id: true
      }
    })
    if (results.length<=0) {
      await prisma.estimate.create({
        data: {
          Estimate_staff: parseInt(id),
          Estimate_create: today,
          Estimate_data: data
        }
      })
    } else {
      await prisma.estimate.updateMany({
        where:{
          Estimate_staff: parseInt(id)
        },
        data:{
          Estimate_data: data
        }
      })      
    }
    return { status: 200, message: "สำเร็จ" }
  } else {
    return { status: 400, message: "โปรดใส่ข้อมูลให้ครบ" }
  }
})