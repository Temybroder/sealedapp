const express = require('express');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const router = express.Router();
const crypto = require("crypto");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");



// DB
const mongoURI = "mongodb+srv://temybroder:mariad29@cluster0-hudre.mongodb.net/aicol?retryWrites=true&w=majority";

// connection
const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// init gfs
let gfs;
conn.once("open", () => {
  // init stream
  gfs = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "uploads"
  });
});



// Storage
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString("hex") + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: "uploads"
        };
        resolve(fileInfo);
      });
    });
  }
});


// get /gridfs page
router.get("/", (req, res) => {
    if(!gfs) {
      console.log("some error occured, check connection to db");
      res.send("some error occured, check connection to db");
      process.exit(0);
    }
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        return res.render("uploadbizname", {
          files: false
        });
      } else {
        const f = files
          .map(file => {
            if (
              file.contentType === "image/png" ||
              file.contentType === "image/jpeg"
            ) {
              file.isImage = true;
            } else {
              file.isImage = false;
            }
            return file;
          })
          .sort((a, b) => {
            return (
              new Date(b["uploadDate"]).getTime() -
              new Date(a["uploadDate"]).getTime()
            );
          });
  
        return res.render("uploadbizname", {
          files: f
        });
      }
  
      // return res.json(files);
    });
  });



  const upload = multer({
    storage
  });
  
  router.post("/upload", upload.single("file"), (req, res) => {
    // res.json({file : req.file})
    req.flash('success_msg', 'Successful: Your Submission is now being processed');
    res.redirect("/registercompany/uploadbizname");
  });
  
  router.get("files", (req, res) => {
    gfs.find().toArray((err, files) => {
      // check if files
      if (!files || files.length === 0) {
        return res.status(404).json({
          err: "no files exist"
        });
      }
  
      return res.json(files);
    });
  });
  
  router.get("/files/:filename", (req, res) => {
    gfs.find(
      {
        filename: req.params.filename
      },
      (err, file) => {
        if (!file) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
  
        return res.json(file);
      }
    );
  });
  
  router.get("/image/:filename", (req, res) => {
    // console.log('id', req.params.id)
    const file = gfs
      .find({
        filename: req.params.filename
      })
      .toArray((err, files) => {
        if (!files || files.length === 0) {
          return res.status(404).json({
            err: "no files exist"
          });
        }
        gfs.openDownloadStreamByName(req.params.filename).pipe(res);
      });
  });
  
  // files/del/:id
  // Delete chunks from the db
  router.post("/files/del/:id", (req, res) => {
    gfs.delete(new mongoose.Types.ObjectId(req.params.id), (err, data) => {
      if (err) return res.status(404).json({ err: err.message });
      res.redirect("/");
    });
  });
  

  module.exports = router;