module.exports = (sequelize, DataTypes) => {
	const Position = sequelize.define('Position', {
		position_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	Position.associate = (models) => {
		Position.hasMany(models.User, {
			foreignKey: 'positionId',
		})
	}
	Position.associate = (models) => {
		Position.belongsTo(models.Profile, {
			foreignKey: {
				name: 'profileId',
				allowNull: false,
			},
		})
	}
	return Position
}
