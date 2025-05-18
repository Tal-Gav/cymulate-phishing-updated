import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
  imports: [
    UserModule,
    MongooseModule.forRoot(
      `mongodb://${process.env.MONGO_DB_USERNAME}:${process.env.MONGO_DB_PASSWORD}@localhost:27017`
    ),
  ],
})
export class AppModule {}
