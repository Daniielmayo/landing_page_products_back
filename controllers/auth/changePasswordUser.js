const User = require("../../models/User");
const bcrypt = require("bcrypt");

const changePassword = async (req, res = response) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    user.password = hashedPassword;
    await user.save();

    res.json({
      msg: "Contraseña actualizada exitosamente",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar la contraseña" });
  }
};

module.exports = changePassword;
