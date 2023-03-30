import HotelService from "../services/hotelService.js";

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

  getAllHotel = async (req, res, next) => {
    try {
      const result = await this.QueryListOfHotels();
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  };
}

export default HotelController;