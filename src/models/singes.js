module.exports = (sequelize, DataTypes) => {
    var singes = sequelize.define('singes', {
      name: DataTypes.STRING,
      enclos: DataTypes.TINYINT,
      race : DataTypes.STRING,
      sexe: DataTypes.STRING,
      age : DataTypes.TINYINT
  
    });
  
    return singes;
  };