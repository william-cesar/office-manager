module.exports = (sequelize, DataTypes) => {
	const Position = sequelize.define('Position', {
		position_name: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	})

	Position.associate = async (models) => {
		await Position.belongsTo(models.Profile, {
			foreignKey: {
				name: 'profileId',
				allowNull: false,
			},
		}),
			await Position.hasMany(models.User, {
				foreignKey: 'positionId',
			})
	}
	return Position
}
