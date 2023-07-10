import { Schema, model } from 'mongoose';
import {Banner} from "../../types/bannerType";

export type BannerWithPricePercentage = Banner & {
    percentage : number
}

const BannerSchema = new Schema<BannerWithPricePercentage>({
    name : { type : String, required : true },
    price : { type : Number, required : true },
    description : String,
    onClickLink : { type : String, required : true },
    shown : { type : Number, required : true, default : 0 },
    percentage : { type : Number, required : true},
});

const Banner = model<BannerWithPricePercentage>('Banners', BannerSchema);


export default Banner;
