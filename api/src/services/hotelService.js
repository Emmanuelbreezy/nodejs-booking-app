import Hotel from "../models/Hotel.model.js";

class HotelService {
  CreateHotel = async (data) => {
    const hotel = new Hotel(data);
    const savedHotel = await hotel.save();
    return savedHotel;
  };

  UpdateHotelById = async (hotelId, data) => {
    const updateHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      {
        $set: data,
      },
      { new: true }
    );
    return updateHotel;
  };

  DeleteHotelById = async (hotelId) => {
    await Hotel.findByIdAndDelete(hotelId);
    return {
      success: true,
      message: "Hotel deleted",
    };
  };

  QueryHotelById = async (hotelId) => {
    const singleHotel = await Hotel.findById(hotelId);
    return singleHotel;
  };

  QueryListOfHotels = async () => {
    const hotels = await Hotel.find({});
    return hotels;
  };
}

export default HotelService;
