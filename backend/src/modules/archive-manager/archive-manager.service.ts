import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ArchiveYear, ArchiveYearDocument } from './schemas/archive-year.schema';
import { ArchiveYearDto } from './dto/archive-year.dto';

@Injectable()
export class ArchiveManagerService {
    constructor(@InjectModel(ArchiveYear.name) private archiveYearModel: Model<ArchiveYearDocument>) {
    }

    async getAllArchiveYears(): Promise<ArchiveYear[]> {
        return this.archiveYearModel.find();
    }

    async getArchiveYearById(id: string): Promise<ArchiveYear> {
        return this.archiveYearModel.findById(id);
    }

    async getCurrentYear(): Promise<ArchiveYear> {
        return this.archiveYearModel.findOne({current: true});
    }

    updateArchiveYears(archiveYears: ArchiveYearDto[]): void {
         archiveYears.forEach(async (archiveYear: ArchiveYearDto) => {
            if (archiveYear._id) {
                const { _id, year, available, current } = archiveYear;
                await this.archiveYearModel
                    .findByIdAndUpdate(_id, {$set: {year, available, current}});
            } else {
                const newArchiveYear = new this.archiveYearModel(archiveYear);
                await newArchiveYear.save();
            }
        })
    }

    async removeArchiveYear(id: string): Promise<ArchiveYear> {
        return this.archiveYearModel.findByIdAndRemove(id);
    }
}
