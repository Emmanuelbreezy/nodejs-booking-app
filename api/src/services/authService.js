import User from "../models/User.model.js";

class AuthService {
  CreateAuthUser = async (data) => {
    const newUser = await User(data);
    const saveUser = await newUser.save();
    return saveUser;
  };

  QueryAuthUser = async (username) => {
    const user = await User.findOne({ username: username });
    return user;
  };
}

export default AuthService;
