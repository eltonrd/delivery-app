const Products = (sequelize, DataTypes) => {
  const Products = sequelize.define("Product", {
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    url_image: DataTypes.STRING,
  },{ tableName: 'products', timestamps: false }
  
  );
  
  return Products;}

module.exports = Products;