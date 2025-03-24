const bcrypt = require("bcrypt");
const { User, Role } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
    user_name: "string|empty:false",
    email: "email|empty:false",
    password: "string|min:8",
  };

  const validate = v.validate(req.body, schema);

  if (validate.length) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exist",
    });
  }

  const role = await Role.findOne({
    where: { roleName: "User" },
  });

  if (!role) {
    return res.status(404).json({
      status: "error",
      message: "role not found",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    userName: req.body.user_name,
    email: req.body.email,
    password,
    roleID: role.id,
  };

  const createUser = await User.create(data);

  return res.json({
    status: "success",
    data: {
      id: createUser.id,
      user_name: createUser.userName,
      email: createUser.email,
      role: role ? role.roleName : null,
      guard: role ? role.guardName : null,
      created_at: createUser.createdAt,
      updated_at: createUser.updatedAt,
    },
  });
};
