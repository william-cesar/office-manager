module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('Profile', {
		profile_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})

	Profile.associate = (models) => {
		Profile.hasMany(models.Position, { foreignKey: 'profileId' })
	}

	return Profile
}
