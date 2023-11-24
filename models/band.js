module.exports = (sequelize, Sequelize) => {
    const Groups = sequelize.define("groups",
    {
    name: {
        type: Sequelize.STRING
    },
    short_name: {
        type: Sequelize.STRING
    },
    korean_name: {
        type: Sequelize.STRING
    },
    debut: {
        type: Sequelize.DATE
    },
    company: {
        type: Sequelize.STRING
    },
    current_members: {
        type: Sequelize.INTEGER
    },
    original_members: {
        type: Sequelize.INTEGER
    },
    fanclub_name: {
        type: Sequelize.STRING
    },
    active: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    },
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'groups'
    }
    );

    return Groups;
   };

   