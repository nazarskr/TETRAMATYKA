import { Injectable } from '@nestjs/common';
import { AboutInfo, AboutInfoDocument} from './schemas/about-info.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AboutInfoDto } from './dto/about-info.dto';

@Injectable()
export class AboutService {
    constructor(@InjectModel(AboutInfo.name) private aboutInfoModel: Model<AboutInfoDocument>) {
    }

    async getAboutInfo(): Promise<AboutInfo[]> {
        return this.aboutInfoModel.find();
    }

    async addAboutInfo(aboutInfoDto: AboutInfoDto): Promise<AboutInfo> {
        const newAboutInfo = new this.aboutInfoModel(aboutInfoDto);
        return newAboutInfo.save();
    }

    async updateAboutInfo(id: string, aboutInfoDto: AboutInfoDto): Promise<AboutInfo> {
        return this.aboutInfoModel.findByIdAndUpdate(id, aboutInfoDto, {new: false});
    }

    async removeAboutInfo(id: string): Promise<AboutInfo> {
        return this.aboutInfoModel.findByIdAndRemove(id);
    }
}
