import Banner, {BannerWithPricePercentage} from "../models/Banner";
import { HydratedDocument } from 'mongoose';
import connectDb from "../config/connetMongo"
const NUMBERTOGENERATE = 1000000

function calculatePricePercentageForEachBanner(data : HydratedDocument<BannerWithPricePercentage>[]){
    data.sort((a, b) => b.price - a.price)
    let sum = 0;
    for (let { price } of data){
        sum += price
    }

    for (let key in data){
        data[key]['percentage'] = (data[key].price/sum)
    }
    for (let i =1; i < data.length;i++){
        data[i].percentage += data[i - 1].percentage
    }

}

async function run(number : number) {
    await Banner.collection.drop()
    let start = Date.now()
    const banners : HydratedDocument<BannerWithPricePercentage>[] = []
    for(let i = 0;i < number;i++){
        const bannerObj : HydratedDocument<BannerWithPricePercentage> = new Banner({
            description: "<empty>",
            name: `ad_${i + 1}`,
            onClickLink: "http://google.com",
            price: Math.random() * 1000 + 1,
            percentage : 0,
        })
        
        banners.push(bannerObj)
    }

    calculatePricePercentageForEachBanner(banners)
    
    console.log('Started insertion...')
    
    await Banner.insertMany(banners)
    
}

connectDb().then(() => {
    console.time('Saved')
    run(NUMBERTOGENERATE).then(() => {
        console.timeEnd('Saved')
    }).catch((err) => {
        if(err)
            throw err
    })
    
})
    