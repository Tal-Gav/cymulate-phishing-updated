import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import {
  generateRefreshToken,
  generateAccessToken,
  verifyRefreshToken,
} from "../utils/jwt";
import { GetUserDto } from "./dto/get-user.dto";

interface AuthResponse {
  user: {
    id: string;
    email: string;
  };
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly model: Model<UserDocument>
  ) {}
  async findAll(): Promise<User[]> {
    return await this.model.find().exec();
  }
  async findOne(id: string): Promise<User> {
    return await this.model.findById({ _id: id }).exec();
  }
  async create(createUserDto: CreateUserDto): Promise<AuthResponse> {
    const existingUser = await this.model.findOne({
      email: createUserDto.email,
    });
    if (existingUser) {
      throw new Error("Email is already in use");
    }
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      saltRounds
    );

    const newUser = await new this.model({
      ...createUserDto,
      password: hashedPassword,
      createdAt: new Date(),
    }).save();

    const user = {
      id: newUser.id.toString(),
      email: newUser.email,
    };

    const refreshToken = generateRefreshToken(user.id);
    const accessToken = generateAccessToken(user);

    return { user, accessToken, refreshToken };
  }

  async loginUser(loginUserDto: CreateUserDto): Promise<AuthResponse> {
    const existingUser = await this.model.findOne({
      email: loginUserDto.email,
    });
    if (!existingUser) {
      throw new Error("Email is not registered");
    }

    const isPasswordValid = await bcrypt.compare(
      loginUserDto.password,
      existingUser.password
    );

    if (!isPasswordValid) {
      throw new Error("Invalid password");
    }

    const user = {
      id: existingUser._id.toString(),
      email: existingUser.email,
    };

    const refreshToken = generateRefreshToken(user.id.toString());
    const accessToken = generateAccessToken(user);

    return { user, accessToken, refreshToken };
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.model
      .findByIdAndUpdate(
        id,
        {
          ...updateUserDto,
        },
        { new: true }
      )
      .exec();
  }
  async delete(id: string): Promise<User> {
    return await this.model.findByIdAndDelete(id).exec();
  }

  async getNewAccessToken(
    refreshToken: string
  ): Promise<{ user: GetUserDto; accessToken: string }> {
    try {
      if (!refreshToken) {
        throw new Error("No access");
      }

      const {
        decoded,
        expired,
        valid,
        msg: errorMsg,
      } = verifyRefreshToken(refreshToken);

      if (valid && !expired) {
        const userId = decoded.id;
        const userDocument = await this.model.findById(userId);

        if (!userDocument) {
          throw new Error("User not found");
        }

        const user = {
          id: userDocument._id,
          email: userDocument.email,
        } as GetUserDto;

        const accessToken = generateAccessToken(user);
        return { user, accessToken };
      } else {
        throw new Error(errorMsg);
      }
    } catch (error) {
      console.error("Failed to refresh token", error);
      throw new Error("Failed to refresh token");
    }
  }
}
