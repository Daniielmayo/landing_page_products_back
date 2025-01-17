const jwt = require("jsonwebtoken");

const triggerJWT = (
  uid,
  name,
  email,
  lastname,
  image,
  country,
  city,
  phone,
  produts
) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
      name,
      email,
      lastname,
      image,
      country,
      city,
      phone,
      produts,
    };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        }

        resolve(token);
      }
    );
  });
};

module.exports = {
  triggerJWT,
};
