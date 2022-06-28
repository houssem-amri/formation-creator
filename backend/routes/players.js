const express = require("express");

const router = express.Router();
const multer = require("multer"); // import module multer
const Player = require("../models/players");

// configure multer
const MIME_TYPE = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
  };
  
  const storage = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
      const isValid = MIME_TYPE[file.mimetype];
      let error = new Error("Mime type is invalid");
      if (isValid) {
        error = null;
      }
      cb(null, "backend/images");
    },
    filename: (req, file, cb) => {
      const name = file.originalname.toLowerCase().split(" ").join("-");
      const extension = MIME_TYPE[file.mimetype];
      const imgName = name + "-" + Date.now() + "-sport-" + "." + extension;
      cb(null, imgName);
    },
  });

// add Player 
router.post("/add_players", multer({ storage: storage }).single("playerImage") ,(req, res) => {

    console.log(req.files);
    url = req.protocol + "://" + req.get("host");
    const player = new Player({
        playerName: req.body.playerName,
        playerPost: req.body.playerPost,
        playerNumber: req.body.playerNumber,
        playerImage: url + "/images/" + req.file.filename,
        userId: req.body.userId,
    });
    player.save().then(
      res.status(200).json({
        message: "player created sucss",
      })
    );
  }
);


// get Player  by user id
router.get("/players_by_userId/:id", (req, res) => {
  console.log("players",req.params.id);
  Player.find({ userId: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});

// delete Player  by id

router.delete("/players/:id", (req, res) => {
  console.log("here into delete players", req.params.id);
  Player.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Players deleted successfully",
    })
  );
});


//  get Player by Id
router.get("/players_by_id/:id", (req, res) => {
  console.log("here into get players by Id", req.params.id);
  Player.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        player: findedObject,
      });
    }
  });
});

// update Player
router.put(
  "/players/:id",multer({ storage: storage }).single("playerImage"),
  (req, res) => {   
    let image=req.body.playerImage
    if (req.file) {
      url = req.protocol + "://" + req.get("host");
       image=url + "/images/" + req.file.filename
    }
    const player = {
      _id: req.params.id,
      playerName: req.body.playerName,
      playerPost: req.body.playerPost,
      playerNumber: req.body.playerNumber,
      playerImage: image,
      userId: req.body.userId,
    };
    Player.updateOne({ _id: req.params.id }, player).then(
      res.status(200).json({
        message: "Player updated successfully",
      })
    );
  }
);

module.exports = router;
