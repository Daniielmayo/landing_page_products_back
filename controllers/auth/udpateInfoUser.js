const { response } = require("express");
const User = require("../../models/User");
const updateUser = async (req, res = response) => {
  const { uid } = req.params;
  const newData = req.body;

  try {
    if (newData.hasOwnProperty("admin")) {
      return res
        .status(404)
        .json({ error: "No se puede actualizar la propiedad 'admin'" });
    }

    const user = await User.findByIdAndUpdate(uid, newData, { new: true });

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const updatedFields = {};
    for (const key in newData) {
      if (newData.hasOwnProperty(key) && user[key] !== newData[key]) {
        updatedFields[key] = newData[key];
      }
    }

    delete user.password;

    await user.save();

    res.status(200).json({
      message: "Usuario actualizado correctamente",
      user: {
        ...user.toObject(),
      },
    });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error al actualizar usuario" });
  }
};

module.exports = updateUser;
