const bcrypt = require("bcrypt");
const { User, Role } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const schema = {
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
    include: {
      model: Role,
      as: "role",
      attributes: ["roleName", "guardName"],
    },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  res.json({
    code: 200,
    status: "success",
    data: {
      id: user.id,
      email: user.email,
      user_name: user.userName,
      role: user.role ? user.role.roleName : null,
      guard: user.role ? user.role.guardName : null,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
    },
  });
};
