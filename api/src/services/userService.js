import User from "../models/User.model.js";

class UserService {
  UpdateUserById = async (userId, data) => {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: data,
      },
      { new: true }
    );
    return updateUser;
  };

  DeleteUserById = async (userId) => {
    await User.findByIdAndDelete(userId);
    return {
      success: true,
      message: "User deleted",
    };
  };

  QueryUserById = async (userId) => {
    const singleUser = await User.findById(userId);
    return singleUser;
  };

  QueryListOfUsers = async () => {
    const users = await User.find({});
    return users;
  };
}

export default UserService;
