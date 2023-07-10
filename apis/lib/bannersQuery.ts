import Banner from "../models/Banner";
import connectDb from "../config/connetMongo";


export function getBanner() {
    let randomPercentage = Math.random()
    return Banner.findOne({ percentage : { $gte : randomPercentage }})
}

// connectDb().then(() => {
//     console.time('query')
//     getBanner().then((res) => {
//         console.timeEnd('query')
//         console.log(res)
//     })
// })