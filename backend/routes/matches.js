const express = require("express");

const router = express.Router();
const multer = require("multer"); // import module multer

const Match = require("../models/matches");
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

// get all matches
router.get("/get_Matches", (req, res) => {
  console.log("here into get all matches ");

  Match.find().populate({
    path: "userId",
  })
  .exec(function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      res.status(200).json({
        data: docs,
      });
    }
  });

});

// get  matches BY USER ID
router.get("/matches_by_userId/:id", (req, res) => {
  console.log("here into get all matches ");
  Match.find({ userId: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        data: findedObject,
      });
    }
  });
});

// Add  matches BY USER ID
router.post(
  "/add_matches",
  multer({ storage: storage }).fields([
    { name: "imageOne" },
    { name: "imageTwo" },
  ]),
  (req, res) => {
    // console.log("imageOne  imageOne", req.files.imageOne);
    // console.log("imageTwo  imageTwo", req.files.imageTwo);
    url = req.protocol + "://" + req.get("host");
    const match = new Match({
      teamOne: req.body.teamOne,
      teamTwo: req.body.teamTwo,
      imageOne: url + "/images/" + req.files.imageOne[0].filename,
      imageTwo: url + "/images/" + req.files.imageTwo[0].filename,
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      userId: req.body.userId,
    });
    match.save().then(
      res.status(200).json({
        message: "match created sucss",
      })
    );
  }
);

//  delete match by Id
router.delete("/matches/:id", (req, res) => {
  console.log("here into delete match", req.params.id);
  Match.deleteOne({ _id: req.params.id }).then(
    res.status(200).json({
      message: "Match deleted successfully",
    })
  );
});

//  get match by Id
router.get("/matches_by_id/:id", (req, res) => {
  console.log("here into get match by Id", req.params.id);
  Match.findOne({ _id: req.params.id }).then((findedObject) => {
    if (findedObject) {
      res.status(200).json({
        match: findedObject,
      });
    }
  });
});

// update match
router.put(
  "/matches/:id",
  multer({ storage: storage }).fields([
    { name: "imageOne" },
    { name: "imageTwo" },
  ]),
  (req, res) => {
    let img1 = req.body.imageOne;
    let img2 = req.body.imageTwo;
    if (Object.keys(req.files).length !== 0) {
      url = req.protocol + "://" + req.get("host");
      console.log("req.files. ", req.files.imageTwo);

      if (req.files.imageOne) {
        img1 = url + "/images/" + req.files.imageOne[0].filename;
      }
      if (req.files.imageTwo) {
        img2 = url + "/images/" + req.files.imageTwo[0].filename;
      }
    }
    const match = {
      _id: req.params.id,
      teamOne: req.body.teamOne,
      teamTwo: req.body.teamTwo,
      imageOne: img1,
      imageTwo: img2,
      eventName: req.body.eventName,
      eventDate: req.body.eventDate,
      userId: req.body.userId,
    };
    Match.updateOne({ _id: req.params.id }, match).then(
      res.status(200).json({
        message: "Match updated successfully",
      })
    );
  }
);

module.exports = router;
