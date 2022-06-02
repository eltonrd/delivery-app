const Product = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2),
    url_image: DataTypes.STRING,
  },{ tableName: 'products', timestamps: false }
  
  );
  
  return Product;}

module.exports = Product;