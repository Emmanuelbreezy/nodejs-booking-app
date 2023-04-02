import UserService from "../services/userService.js";

class UserController extends UserService {
  /* UPDATE */
  updateUser = async (req, res) => {
    try {
      const user = await this.UpdateUserById(req.params.id, req.body);
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /* DELETE */
  deleteUser = async (req, res) => {
    try {
      const result = await this.DeleteUserById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getSingleUser = async (req, res) => {
    try {
      const result = await this.QueryUserById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.QueryListOfUsers();
      res.status(200).json(users);
    } catch (err) {
      next(err);
    }
  };
}

export default UserController;
