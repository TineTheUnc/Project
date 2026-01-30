import prisma from "~~/server/util/db"


export default defineEventHandler(async (event) => {
  const date = getQuery(event).date
  const results = await prisma.sensorData.findFirst({
    where: {
      SD_create: date
    }
  })
  if (results) {
    return { status: 200, message: "สำเร็จ", data: results.SD_data }
  } else {
    return { status: 404, message: "ไม่พบข้อมูล" }
  }
})