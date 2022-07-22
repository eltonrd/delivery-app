const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    urlImage: DataTypes.STRING,
  }, { tableName: 'products', timestamps: false, underscored: true },
  );
  
  return Product;}

module.exports = Product;
