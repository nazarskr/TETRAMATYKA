import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PartnerDto } from './dto/partner.dto';
import { Partner, PartnerDocument } from './schemas/partner.schema';

@Injectable()
export class FooterService {
    constructor(@InjectModel(Partner.name) private partnerModel: Model<PartnerDocument>) {
    }

    async getPartners(currentYear: number): Promise<Partner[]> {
        return this.partnerModel.find({archiveYear: currentYear});
    }

    async addPartners(partnersDtos: PartnerDto[]): Promise<any> {
        return partnersDtos.map(async(partner: PartnerDto) => {
            const newPartner = await new this.partnerModel(partner);
            return newPartner.save();
        });
    }

    async deletePartner(id: string): Promise<Partner> {
        return this.partnerModel.findByIdAndRemove(id);
    }

    async getPartnerImageUrl(id: string): Promise<Partner> {
        return this.partnerModel.findById(id).select('imageUrl');
    }
}
