module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		first_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		registration_doc: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		birthdate: {
			type: DataTypes.DATEONLY,
			allowNull: true,
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: true,
		},
	})

	User.associate = (models) => {
		User.belongsTo(models.Position, {
			foreignKey: {
				name: 'positionId',
				allowNull: false,
			},
		})
	}

	return User
}
