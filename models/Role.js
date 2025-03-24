module.exports = (Sequelize, DataTypes) => {
  const Role = Sequelize.define(
    "Role",
    {
      id: {
        field: "id",
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      roleName: {
        field: "role_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      guardName: {
        field: "guard_name",
        type: DataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        field: "created_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
      updatedAt: {
        field: "updated_at",
        type: DataTypes.DATE,
        allowNull: false,
      },
    },
    {
      tableName: "roles",
      timestamps: true,
    }
  );

  Role.associate = (models) => {
    Role.hasMany(models.User, { foreignKey: "role_id", as: "users" });
  };

  return Role;
};
