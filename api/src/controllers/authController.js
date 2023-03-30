import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthService from "../services/authService.js";
import { createError } from "./../utils/errorHandler.js";

class AuthController extends AuthService {
  register = async (req, res, next) => {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(req.body.password, salt);

      const data = {
        username: req.body.username,
        email: req.body.email,
        password: hashPassword,
      };

      const user = await this.CreateAuthUser(data);
      if (!user) return next(createError(400, "User fail to save"));

      res.status(201).json({
        success: true,
        message: "user created successfully",
      });
    } catch (err) {
      next(err);
    }
  };

  login = async (req, res, next) => {
    try {
      const user = await this.QueryAuthUser(req.body.username);
      if (!user) return next(createError(404, "User not found"));

      const checkPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (!checkPassword)
        return next(createError(400, "Wrong username or password"));

      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_KEY
      );

      const { password, isAdmin, ...rest } = user._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          data: { ...rest },
        });
    } catch (err) {
      next(err);
    }
  };
}

export default AuthController;
