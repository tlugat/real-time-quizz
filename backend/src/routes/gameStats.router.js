module.exports = (options = {}) => {
	const { Router } = require("express");
	const router = Router();
	const GameStatsService = require("../services/gameStats.service");
	const GameStatsController = require("../controllers/gameStats.controller");
	const controller = GameStatsController(GameStatsService());

	router.get("/average", controller.getAverage);
	router.get("/code/:code", controller.getOneByCode);
	router.get("/:id", controller.getOne);

	return router;
};
