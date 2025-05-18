import { Module } from "@nestjs/common";
import { TargetModule } from "./target/target.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    TargetModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@localhost:27017`
    ),
  ],
})
export class AppModule {}
