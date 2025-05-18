import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Target, TargetDocument } from "./schemas/target.schema";
import { CreateTargetDto } from "./dto/create-target.dto";
import { UpdateTargetDto } from "./dto/update-target.dto";
import { sendEmail } from "../helpers/emailHelper";

@Injectable()
export class TargetService {
  constructor(
    @InjectModel(Target.name) private readonly model: Model<TargetDocument>
  ) {}
  async findAll(): Promise<Target[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<Target> {
    return await this.model.findById(id).exec();
  }
  async findByUserId(id: string): Promise<Target[]> {
    return await this.model.find({ userId: id }).exec();
  }
  async create(createTargetDto: CreateTargetDto): Promise<Target> {
    try {
      const newTarget = await new this.model({
        userId: createTargetDto.userId,
        email: createTargetDto.email,
        createdAt: new Date(),
      }).save();

      const result = await sendEmail({
        to: newTarget.email,
        subject: "Free Bitcoin!! Get it now!",
        text: "Click the link below to get free bitcoin!",
        html: `<p>Click the link below to get free bitcoin!</p>
             <p><a href="http://localhost:5173/free-bitcoin/${newTarget._id}">Get Free Bitcoin</a></p>`,
      });

      if (result.error) {
        await this.model.findByIdAndDelete(newTarget._id);
        throw new Error(result.msg);
      }

      return newTarget;
    } catch (error) {
      throw new Error(`Failed to create target: ${error}`);
    }
  }
  async updatePhisingSuccess(id: string): Promise<Target> {
    return await this.model
      .findByIdAndUpdate(
        id,
        {
          isClickedUrl: true,
          clickedUrlTime: new Date(),
        },
        { new: true }
      )
      .exec();
  }
  async delete(id: string): Promise<Target> {
    return await this.model.findByIdAndDelete(id).exec();
  }
}
