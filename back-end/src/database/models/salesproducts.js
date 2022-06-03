const SaleProduct = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define(
    "SaleProduct",
    {
      saleId: {
        type: DataTypes.INTEGER,
        references: { model: 'Sale', key: 'id' },
      },
      productId: {
        type: DataTypes.INTEGER,
        references: { model: 'Product', key: 'id' },
      },
      quantity:  DataTypes.INTEGER,
    },
    { tableName: 'salesProducts', timestamps: false, underscored: true },
  );

  SaleProduct.associate = (models) => {
    models.Sale.belongsToMany(
      models.Product,
      { 
        as: 'product',
        through: SaleProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
      }
      );
    models.Product.belongsToMany(
      models.Sale,
      {
        as: 'sales',
        through: SaleProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
      });
    };  

  return SaleProduct
}; 

module.exports = SaleProduct;
