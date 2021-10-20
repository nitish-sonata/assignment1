const candidateModel = (sequelize, DataTypes) => {
    let Candidate = sequelize.define('candidate', {
        candidate_id: {
            allowNull: false,
            primaryKey: true,
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV1,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        email_id: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone_number: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        candidates_data: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        created_date: {
            // allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        created_by: {
            type: DataTypes.STRING(100),
            allowNull: false,
            defaultValue: 'nitish',
        },
        modified_date: {
            // allowNull: false,
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        modified_by: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
    })
    return Candidate
}

export { candidateModel }
