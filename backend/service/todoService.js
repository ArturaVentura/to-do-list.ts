const express = require("express");
const { Sequelize, Todo } = require("../db/models");

const router = express.Router();

router.get("/todo", async (_, res) => {
  try {
    const todos = await Todo.findAll({ order: [["createdAt", "DESC"]] });
    res.json(todos);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.post("/todo", async (req, res) => {
  try {
    const todos = await Todo.create({
      ...req.body,
      status: false,
    });
    res.json(todos);
  } catch (error) {
    res.sendStatus(411);
  }
});

router.put("/todo/:id", async (req, res) => {
  try {
    await Todo.update(req.body, {
      status: Sequelize.literal("NOT status"),
      where: { id: req.params.id },
    });

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/todo/:id", async (req, res) => {
  try {
    await Todo.destroy({ where: { id: req.params.id } });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

router.delete("/todo-delete-all", async (req, res) => {
  try {
    await Todo.destroy({ where: {} });
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
