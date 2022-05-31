const SalesProduct = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define("salesProduct", {
    sale_id: { type: DataTypes.INTEGER, foreignKey: true } ,
    product_id: { type: DataTypes.INTEGER, foreignKey: true } ,
    quantity:  DataTypes.INTEGER,
  },{ tableName: 'salesProduct', timestamps: false }
);
SalesProduct.associate = (models) => { 
  SalesProduct.belongsToMany(models.Sales, { foreignKey: 'user_id', as: 'user', }); 
  SalesProduct.belongsToMany(models.Product, { foreignKey: 'seller_id', as: 'seller', }); 
}

SalesProduct.associate = (models) => { models.Sale.belongsToMany(models.Product, 
  { as: 'product', through: SalesProduct, foreignKey: 'sale_id', otherKey: 'product_id', });
   models.Product.belongsToMany(models.Sale, {
      as: 'sales', through: SalesProduct, foreignKey: 'product_id', otherKey: 'sale_id', }); };
;  
  return SalesProduct}; 

module.exports = SalesProduct;