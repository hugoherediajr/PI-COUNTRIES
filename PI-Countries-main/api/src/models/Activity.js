const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    'activity',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        unique:true,
        allowNull: true
  
      },
      difficulty: {
      type: DataTypes.ENUM,
      values: ["1","2","3","4","5"],
      allowNull: true

      },
      duration: {
        type: DataTypes.STRING,
        allowNull: true
      },
      season: {      
        type: DataTypes.ENUM,
        values: ["Summer", "Fall", "Winter", "Spring"],
        allowNull: true      
      },
      description:{
        type: DataTypes.STRING
      }
    },
    {
      timestamps: false,
    }
  )
}
