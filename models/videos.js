module.exports = (sequelize, Sequelize, groups, idols) => {
    const Videos = sequelize.define("videos",
    {
    artist: {
        type: Sequelize.STRING
    },
    song_name: {
        type: Sequelize.STRING
    },
    korean_name: {
        type: Sequelize.STRING
    },
    youtube_video_extention: {
        type: Sequelize.STRING
    },
    type: {
        type: Sequelize.STRING
    },
    release_type: {
        type: Sequelize.STRING
    },
    },
    {
    timestamps: false,
    freezeTableName: true,
    tableName: 'videos'
    }
    );

    Videos.belongsTo(groups, {
        foreignkey: 'id'
    });

    Videos.belongsTo(idols, {
        foreignkey: 'id'
    });

    return Videos;
   };

