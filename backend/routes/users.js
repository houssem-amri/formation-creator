const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/users");

const jwtConfig = {
  secret: "some-secret-code-goes-here",
  expiresIn: "2 days", // A numeric value is interpreted as a seconds count. If you use a string be sure you provide the time units (days, hours, etc)
};

router.post("/register", async (req, res) => {
  const email_user = await User.findOne({ email: req.body.email });
  if (email_user) {
    res.status(200).json({
      message: "email existe",
    });
  } else {
    bcrypt.hash(req.body.password, 10).then((hash) => {
      const usres = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        role: req.body.role,
      });
      usres
        .save()
        .then(
          res.status(200).json({
            message: "User added succesful",
          })
        )
        .catch((err) => {
          res.status(500).json({
            error: err,
          });
        });
    });
  }
});

// router.get("/get_user", (req, res) => {
//     User.find((err, docs) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.status(200).json({
//           data: docs,
//         });
//       }
//     });
//   });

//   router.get("/get_user_byId/:id", (req, res) => {
//     User.findOne({ _id: req.params.id }).then((findedObject) => {
//       if (findedObject) {
//         res.status(200).json({
//           user: findedObject,
//         });
//       }
//     });
//   });

//   router.delete("/delete_User/:id", (req, res) => {
//     User.deleteOne({ _id: req.params.id }).then(
//       res.status(200).json({
//         message: "user deleted succesful",
//       })
//     );
//   });

//   router.post("/login", async (req, res) => {
//   try {
//     const user = await User.findOne({Email:req.body.email})
//     if(!user) return res.status(200).json({message: "0"})
//     const isMatch = await bcrypt.compare(req.body.password, user.password)
//     console.log("isMatch",isMatch);
//     if(!isMatch) return res.status(200).json({message: "1"})
//     let finalUser = {
//       id: user._id,
//       NomUtilisateur: user.NomUtilisateur,
//       PrenomUtilisateur: user.PrenomUtilisateur,
//       Poste: user.Poste,
//       magasin: user.magasin,
//     };
//     res.status(200).json({
//       user: finalUser,
//       message: "2",
//     });

//   } catch (error) {
//     return res.status(200).json({message: "1"})

//   }

//   });

router.post("/auth", async (req, res, next) => {
  let error = [];
  let finaluser = {};
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(200).json({ type: "email", message: "Check your email address" });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);

    if (!isMatch) {
      return res.status(200).json({ type: "password", message: "Check your password" });
    }
    const token = jwt.sign({ id: user._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    finaluser = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
    };
    res.status(200).json({
      message:"logged successfully",
      type: "success",
      access_token: token,
      user: finaluser,
    });
  } catch (error) {
    console.log(error);
    return res.status(200).json({      type: "failed",
    message: "Auth failed" });
  }
});


router.post("/auth/access-token", async (req, res, next) => {
  const access_token = req.body.access_token;

  try {
    const { id } = jwt.verify(access_token, jwtConfig.secret);
    const findeduser = await User.findOne({ _id: id });

    delete findeduser.password;

    const updatedAccessToken = jwt.sign({ id: findeduser._id }, jwtConfig.secret, {
      expiresIn: jwtConfig.expiresIn,
    });
    const user  = {
      id: findeduser._id,
      firstName: findeduser.firstName,
      lastName: findeduser.lastName,
      role: findeduser.role,
    };
    res.status(200).json({
      message:"0",
      user:user,
      access_token: updatedAccessToken,
    });
  } catch (e) {
    const error = "Invalid access token detected";
    res.status(200).json({
      message:"1"
    });
  }
});

module.exports = router;
