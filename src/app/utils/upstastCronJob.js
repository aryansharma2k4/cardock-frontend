// import { Client } from "@upstash/qstash"

// const qstash = new Client({
//     token: process.env.QSTASH_TOKEN,
// })

// export async function upstashCronJob(sessionsId){
//     await qstash.publish({
//         url: "http://localhost:8000/api/sessions/notifySixHours",
//         params: {sessionsId},
//         delay: 6*6*60,
//     })
// }