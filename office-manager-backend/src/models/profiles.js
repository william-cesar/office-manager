module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('Profile', {
		profile_name: {
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

	Profile.associate = (models) => {
		Profile.hasMany(models.Position, {
			foreignKey: {
				name: 'profileId',
			},
		})
	}

	return Profile
}
