const Sale = (sequelize, DataTypes) => {
  const Sale = sequelize.define("Sale", {
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number:  DataTypes.STRING,
    sale_date:  DataTypes.DATE,
    status:  DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, foreignKey: true } ,
    seller_id: { type: DataTypes.INTEGER, foreignKey: true } ,
  },{ tableName: 'sales', timestamps: false }
);
Sale.associate = (models) => { 
  Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user', }); 
  Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller', }); 
}
;  
  return Sale}; 

module.exports = Sale;
