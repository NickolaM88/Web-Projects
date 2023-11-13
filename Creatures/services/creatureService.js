const Creature = require("../models/Creature");

exports.getAll = () => Creature.find({}).lean();

exports.getOne = (creatureId) => Creature.findById(creatureId).lean();


exports.create = (ownerId, creatureData) =>
Creature.create({ ...creatureData, owner: ownerId });

exports.edit = (creatureId, creatureData) =>
Creature.findByIdAndUpdate(creatureId, creatureData);

exports.delete = (creatureId) => Creature.findByIdAndDelete(creatureId);
