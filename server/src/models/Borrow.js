module.exports = (sequelize, DataTypes) => {
    const Borrow = sequelize.define('Borrow', {
        nameLend: DataTypes.STRING,
        dateLend: DataTypes.STRING,
        dateReturn: DataTypes.STRING,
        equipment: DataTypes.STRING,
        number: DataTypes.STRING,
        status: DataTypes.STRING,
    })
    return Borrow
}