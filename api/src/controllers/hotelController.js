import HotelService from "../services/hotelService.js";
import RoomService from "../services/roomService.js";

class HotelController extends HotelService {
  /* CREATE */
  createHotel = async (req, res) => {
    try {
      const savedHotel = await this.CreateHotel(req.body);
      res.status(200).json(savedHotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /* UPDATE */
  updateHotel = async (req, res) => {
    try {
      const hotel = await this.UpdateHotelById(req.params.id, req.body);
      res.status(200).json(hotel);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  /* DELETE */
  deleteHotel = async (req, res) => {
    try {
      const result = await this.DeleteHotelById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getSingleHotel = async (req, res) => {
    try {
      const result = await this.QueryHotelById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getCountByCity = async (req, res) => {
    const cities = req.query.cities.split(",");
    try {
      const promises = cities.map(async (city) => {
        return await this.QueryCitiesCount(city);
      });
      const results = await Promise.all(promises);
      res.status(200).json(results);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getCountByType = async (req, res) => {
    const types = ["hotel", "apartment", "resort", "villa", "cabin"];
    try {
      const promises = types.map(async (type) => {
        const count = await this.QueryHotelCount(type);
        return { type, count };
      });
      const results = await Promise.all(promises);

      res.status(200).json(results);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  getAllHotel = async (req, res, next) => {
    try {
      const featured = req.query.featured
        ? { featured: req.query.featured }
        : {};
      const query = {
        ...req.query,
        ...featured,
      };

      const result = await this.QueryListOfHotels(query);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };

  getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await this.QueryHotelById(req.params.hotelId);

      const roomClass = new RoomService();

      const promises = hotel.rooms.map(async (roomId) => {
        const response = await roomClass.QueryRoomById(roomId);
        return response;
      });

      const results = await Promise.all(promises);

      res.status(200).json(results);
    } catch (err) {
      next(err);
    }
  };
}

export default HotelController;
