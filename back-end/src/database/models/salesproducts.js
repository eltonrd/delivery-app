const SalesProduct = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define("salesProduct", {
    saleId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: { model: 'Sale', key: 'id' },
      field: 'sale_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      foreignKey: true,
      references: { model: 'Product', key: 'id' },
      field: 'product_id',
    },
    quantity:  DataTypes.INTEGER,
  },{ timestamps: false },
);
SalesProduct.associate = (models) => { 
  SalesProduct.belongsToMany(models.Sales, { foreignKey: 'userId', as: 'user', }); 
  SalesProduct.belongsToMany(models.Product, { foreignKey: 'sellerId', as: 'seller', }); 
}

SalesProduct.associate = (models) => {
  models.Sale.belongsToMany(
    models.Product,
    { 
      as: 'product',
      through: SalesProduct,
      foreignKey: 'saleId',
      otherKey: 'productId',
    }
    );
   models.Product.belongsToMany(
    models.Sale,
    {
      as: 'sales',
      through: SalesProduct,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  };  
  return SalesProduct
}; 

module.exports = SalesProduct;
