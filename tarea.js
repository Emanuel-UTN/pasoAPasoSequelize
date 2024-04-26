const { Model, DataTypes } = require("sequelize")
const sequelize = require("./db");

const Tarea = sequelize.define(
    "Tarea",
    {
        descripcion: { type: DataTypes.STRING}
    },
    {
        sequelize,
        modelName: "tarea",
        timestamps: false
    }
)

model.exports = Tarea;