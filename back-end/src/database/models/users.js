const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role:DataTypes.STRING,
  },{ tableName: 'users', timestamps: false }
  
  );
  User.associate = (models) => { 
    User.hasMany(models.Sale, { foreignKey: 'user_id', as: 'user', }); 
    User.hasMany(models.Sale, { foreignKey: 'seller_id', as: 'seller', });
  }
  
  return User;
}

module.exports = User;