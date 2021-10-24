module.exports = {
    port: 8081,

    // SQLite
    db: {
        database: process.env.DB_NAME || 'nvWebblogDb',
        user: process.env.DB_User || 'root',
        password: process.env.DB_PASS || '',
        options: {
            dialect: process.env.DIALECT || 'sqlite',
            storage: './nvwebblog-db.sqlite'
        },
    },
    //MySQL
    // db:{
    //     database: process.env.DB_NAME || 'nvwebblog',
    //     user: process.env.DB_User || 'root',
    //     password: process.env.DB_PASS || '',
    //     options: {
    //         dialect: process.env.DIALECT || 'mysql',
    //         // storage: './nvwebblog-db.sqlite'
    //         host: process.env.HOST || 'localhost',
    //     },
    // },
    authentication: {
        jwtSecret: "test"
    }
}