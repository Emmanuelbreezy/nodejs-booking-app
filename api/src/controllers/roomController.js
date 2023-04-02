import RoomService from "../services/roomService.js";

class RoomController extends RoomService {
  createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
      const room = await this.createNewRoom(req.body, hotelId);
      res.status(200).json(room);
    } catch (err) {
      next(err);
    }
  };

  /* UPDATE */
  updateRoom = async (req, res) => {
    try {
      const room = await this.UpdateRoomById(req.params.id, req.body);
      res.status(200).json(room);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /* DELETE */
  deleteRoom = async (req, res) => {
    try {
      const result = await this.DeleteRoomById(
        req.params.id,
        req.params.hotelId
      );
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getSingleRoom = async (req, res) => {
    try {
      const result = await this.QueryRoomById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getAllRoom = async (req, res, next) => {
    try {
      const result = await this.QueryListOfRoom();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default RoomController;
