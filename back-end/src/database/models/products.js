const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    urlImage: DataTypes.STRING,
  }, { tableName: 'products', timestamps: false },
  );
  
  return Products;}

module.exports = Products;
