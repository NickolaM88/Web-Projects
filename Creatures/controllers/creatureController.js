const router = require("express").Router();

const { isAuth } = require("../middlewares/authMiddleware");
const creatureService = require("../services/creatureService");
const { getErrorMessage } = require("../utils/errorUtils");

router.get("/catalog", async (req, res) => {
  const creature = await creatureService.getAll();

  res.render("creature/catalog", { creature });
});

router.get("/:creatureId/details", async (req, res) => {
  const creature = await creatureService.getOne(req.params.creatureId);

  const isOwner = creature.owner == req.user?._id;
  // const isBuyer = creature.buyers?.some((id) => id == req.user?._id);

  res.render("creature/details", { creature, isOwner });
});

router.get("/:creatureId/vote", isAuth, async (req, res) => {
  await creatureService.vote(req.user._id, req.params.creatureId);

  res.redirect(`/creature/${req.params.creatureId}/details`);
});

router.get("/:creatureId/edit", isAuth, async (req, res) => {
  const creature = await creatureService.getOne(req.params.creatureId);


  res.render("creature/edit", { creature });
});

router.post("/:creatureId/edit", isAuth, async (req, res) => {
  const creatureData = req.body;

  await creatureService.edit(req.params.creatureId, creatureData);

  res.redirect(`/creature/${req.params.creatureId}/details`);
});

router.get("/:creatureId/delete", isAuth, async (req, res) => {
  await creatureService.delete(req.params.creatureId);

  res.redirect("/creature/catalog");
});

router.get("/create", isAuth, (req, res) => {
  res.render("creature/create");
});

router.post("/create", isAuth, async (req, res) => {
  const creatureData = req.body;

  try {
    await creatureService.create(req.user._id, creatureData);
  } catch (error) {
    return res
      .status(400)
      .render("creature/create", { error: getErrorMessage(error) });
  }

  res.redirect("/creature/catalog");
});

router.get('/profile', (req, res) => {
  res.render("creature/profile");
});

module.exports = router;
