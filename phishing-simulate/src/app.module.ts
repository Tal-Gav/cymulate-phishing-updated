import { Module } from "@nestjs/common";
import { TargetModule } from "./target/target.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    TargetModule,
    MongooseModule.forRoot("mongodb://cym:cym@localhost:27017"),
  ],
})
export class AppModule {}
