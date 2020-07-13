module.exports = (sequelize, DataTypes) => {
	const Position = sequelize.define('Position', {
		position_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	Position.associate = (models) => {
		Position.belongsTo(models.Profile, { foreignKey: 'profileId' })
	}

	return Position
}
