module.exports = (sequelize, DataTypes) => {
    var enclos = sequelize.define('enclos', {
      nom: DataTypes.STRING,
     
      

    });
  
    return enclos;
  };