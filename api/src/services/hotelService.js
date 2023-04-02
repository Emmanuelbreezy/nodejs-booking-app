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

  QueryCitiesCount = async (city) => {
    const result = await Hotel.countDocuments({ city: city });
    return result;
  };

  QueryHotelCount = async (type) => {
    return await Hotel.countDocuments({ type: type });
  };

  QueryListOfHotels = async (query) => {
    const { min, max, limit, ...others } = query;
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(limit);
    return hotels;
  };
}

export default HotelService;
