import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type TargetDocument = Target & Document;

@Schema({ timestamps: true }) // Enable automatic createdAt and updatedAt
export class Target {
  @Prop({ type: Types.ObjectId, ref: "User", required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ default: false })
  isClickedUrl: boolean;

  @Prop({ type: Date, required: false })
  clickedUrlTime?: Date;
}

export const TargetSchema = SchemaFactory.createForClass(Target);
