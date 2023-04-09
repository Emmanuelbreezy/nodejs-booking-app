import Room from "../models/Room.model.js";
import Hotel from "../models/Hotel.model.js";

class RoomService {
  createNewRoom = async (data, hotelId) => {
    const room = new Room(data);
    const savedRoom = await room.save();
    await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } });
    return savedRoom;
  };

  UpdateRoomById = async (roomId, data) => {
    const updateRoom = await Room.findByIdAndUpdate(
      roomId,
      {
        $set: data,
      },
      { new: true }
    );
    return updateRoom;
  };

  UpdateRoomByAvailability = async (roomId, dates) => {
    const response = await Room.updateOne(
      { "roomNumber._id": roomId },
      {
        $push: {
          "roomNumbers.$.unavailableDates": dates,
        },
      }
    );
    return response;
  };

  DeleteRoomById = async (roomId, hotelId) => {
    await Room.findByIdAndDelete(roomId);
    await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: roomId } });
    return {
      success: true,
      message: "Room has been deleted",
    };
  };

  QueryRoomById = async (roomId) => {
    const singleRoom = await Room.findById(roomId);
    return singleRoom;
  };

  QueryListOfRoom = async () => {
    const rooms = await Room.find({});
    return rooms;
  };
}

export default RoomService;
