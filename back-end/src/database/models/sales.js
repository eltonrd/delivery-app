const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    totalPrice: DataTypes.DECIMAL,
    deliveryAddress: DataTypes.STRING,
    deliveryNumber:  DataTypes.STRING,
    saleDate: { type: sequelize.fn('NOW') },
    status:  DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true } ,
    sellerId: { type: DataTypes.INTEGER, foreignKey: true } ,
  },{ tableName: 'sales', timestamps: false, underscored: true },
  );
  Sale.associate = (models) => { 
    models.Sale.belongsTo(models.User, { foreignKey: 'userId', as: 'user', }); 
    models.Sale.belongsTo(models.User, { foreignKey: 'sellerId', as: 'seller', }); 
  };  
  return Sale;
}; 

module.exports = Sale;
