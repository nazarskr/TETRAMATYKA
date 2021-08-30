import { Injectable } from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {WorksItem, WorksItemDocument} from './schemas/work.schema';
import {Model} from 'mongoose';
import {WorksItemDto} from './dto/works-item.dto';

@Injectable()
export class WorksService {
    constructor(@InjectModel(WorksItem.name) private worksModel: Model<WorksItemDocument>){
    }

    async getAllWorks(year: number): Promise<WorksItem[]> {
        return this.worksModel.find({archiveYear: year});
    }

    async getAllWorksShort(year: number): Promise<WorksItem[]> {
        return this.worksModel.find({archiveYear: year}, {description: 0, imageUrl: 0});
    }

    async getWorksItemById(id: string): Promise<WorksItem> {
        return this.worksModel.findById(id);
    }

    async createWorksItem(worksItemDto: WorksItemDto): Promise<WorksItem> {
        const newWorksItem = new this.worksModel(worksItemDto);
        return newWorksItem.save();
    }

    async updateWorksItem(id: string, worksItemDto: WorksItemDto): Promise<WorksItem> {
        return this.worksModel.findByIdAndUpdate(id, worksItemDto);
    }

    async deleteWorksItem(id: string): Promise<WorksItem> {
        return this.worksModel.findById(id);
    }

    async getWorksItemImageUrl(id: string): Promise<WorksItem> {
        return this.worksModel.findById(id).select('imageUrl');
    }
}
