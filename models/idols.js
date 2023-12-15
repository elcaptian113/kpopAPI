module.exports = (sequelize, Sequelize, groups) => {
    const Idols = sequelize.define("idols",
    {
    stage_name: {
        type: Sequelize.STRING
    },
    full_name: {
        type: Sequelize.STRING
    },
    korean_name: {
        type: Sequelize.STRING
    },
    korean_stage_name: {
        type: Sequelize.STRING
    },
    dob: {
        type: Sequelize.DATE
    },
    country: {
        type: Sequelize.STRING
    },
    birthplace: {
        type: Sequelize.STRING
    },
    other_group: {
        type: Sequelize.STRING
    },
    gender: {
        type: Sequelize.STRING
    },
    image: {
        type: Sequelize.BLOB
    },
    },
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'idols'
    }
    );

    Idols.belongsTo(groups, {
        foreignkey: 'id'
    });

    return Idols;
   };

   