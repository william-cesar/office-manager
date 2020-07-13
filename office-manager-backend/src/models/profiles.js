module.exports = (sequelize, DataTypes) => {
	const Profile = sequelize.define('Profile', {
		profile_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	})
	return Profile
}
