import express from "express";
import Admin from "../models/Admin.js";

const router = express.Router();

/* LOGIN */

router.post("/login", async (req, res) => {

  try {

    const { username, password } =
      req.body;

    const admin = await Admin.findOne({

      username,
      password,

    });

    if (!admin) {

      return res.status(401).json({

        success: false,
        message: "Invalid Credentials",

      });

    }

    res.status(200).json({

      success: true,
      message: "Login Success",

    });

  } catch (error) {

    res.status(500).json({

      success: false,
      message: error.message,

    });

  }

});

export default router;