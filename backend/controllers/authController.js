const bcrypt =
  require("bcryptjs");

const jwt =
  require("jsonwebtoken");

const Admin =
  require("../models/Admin");

/**
 * Register Admin
 */
exports.register =
  async (req, res) => {
    try {
      const {
        name,
        email,
        password,
      } = req.body;

      const existing =
        await Admin.findOne({
          email,
        });

      if (existing) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Admin already exists",
          });
      }

      const hashedPassword =
        await bcrypt.hash(
          password,
          10
        );

      const admin =
        await Admin.create({
          name,
          email,
          password:
            hashedPassword,
        });

      res.status(201).json({
        success: true,
        message:
          "Admin created",
        admin: {
          id: admin._id,
          name: admin.name,
          email:
            admin.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };

/**
 * Login
 */
exports.login =
  async (req, res) => {
    try {
      const {
        email,
        password,
      } = req.body;

      const admin =
        await Admin.findOne({
          email,
        });

      if (!admin) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid credentials",
          });
      }

      const validPassword =
        await bcrypt.compare(
          password,
          admin.password
        );

      if (
        !validPassword
      ) {
        return res
          .status(401)
          .json({
            success: false,
            message:
              "Invalid credentials",
          });
      }

      const token =
        jwt.sign(
          {
            id: admin._id,
          },
          process.env
            .JWT_SECRET,
          {
            expiresIn:
              process.env
                .JWT_EXPIRES_IN,
          }
        );

      res.json({
        success: true,
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email:
            admin.email,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message:
          error.message,
      });
    }
  };