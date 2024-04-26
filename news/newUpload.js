import path from "path";
import express from "express";
import multer from "multer";
import News from "./newsModel.js";

const newsRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "newsuploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Your allowed to uopload images only", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 2MB
  },
});

newsRoute.post("/create/news", upload.single("filename"), async (req, res) => {
  const { title, category, image_url, publish_date, status, source_type } =
    req.body;
  const filename = req?.file?.filename;
  if (title && category && publish_date && status && source_type) {
    try {
      if (source_type.own || source_type.other) {
        if (filename || image_url) {
          if (filename) {
            const news = new News({
              title: title,
              category: category,
              status: status,
              publish_date: publish_date,
              source_type: source_type,
              image: filename,
            });
            await news.save();

            res.status(200).json({
              success: true,
              message: "News created successfully",
            });
          } else {
            const news = new News({
              title: title,
              category: category,
              status: status,
              publish_date: publish_date,
              source_type: source_type,
              image_url: image_url,
            });
            await news.save();

            res.status(200).json({
              success: true,
              message: "News created successfully",
            });
          }
        } else {
          res.status(400).json({
            success: false,
            message: "Please provide news image type",
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "Source type required",
        });
      }
    } catch (error) {
      console.log(error, "error");
      res.status(400).json({
        success: false,
        message: `${error?.message}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "something wents wrong",
    });
  }
});

export default newsRoute;
