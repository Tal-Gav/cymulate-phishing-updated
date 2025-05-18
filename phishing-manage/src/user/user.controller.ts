import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserService } from "./user.service";
import { Request, Response } from "express";

const isProduction = process.env.NODE_ENV === "production";

@Controller("user")
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Post("register")
  async create(
    @Body() createUserDto: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, accessToken, refreshToken } =
      await this.service.create(createUserDto);

    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(HttpStatus.OK)
      .json({
        user,
        accessToken,
        message: "User registered successfully",
      });
  }

  @Post("login")
  async login(
    @Body() loginUserDto: CreateUserDto,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { user, accessToken, refreshToken } =
      await this.service.loginUser(loginUserDto);

    res
      .cookie("jwt", refreshToken, {
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      })
      .status(HttpStatus.OK)
      .json({
        user,
        accessToken,
        message: "User registered successfully",
      });
  }

  @Post("logout")
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie("jwt");
  }

  @Get("refresh")
  async refresh(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const refreshToken = req.cookies.jwt;

    const { user, accessToken } =
      await this.service.getNewAccessToken(refreshToken);

    res.json({ user, accessToken });
  }

  @Put(":id")
  async update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
  }
  @Delete(":id")
  async delete(@Param("id") id: string) {
    return await this.service.delete(id);
  }
}
