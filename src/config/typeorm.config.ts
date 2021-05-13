import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';

const dbConfig = config.get('db');
const serverConfig = config.get('server');

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    // host: 'localhost',
    // port: 5432,
    host: process.env.DB_HOST || dbConfig.host,
    port: process.env.DB_PORT || dbConfig.port,
    username: process.env.DB_USERNAME || dbConfig.username,
    password: process.env.DB_PASSWORD || dbConfig.password,
    database: process.env.DB_DATABASE || dbConfig.database,
    // username: dbConfig.username,
    // password: dbConfig.password,
    // database: dbConfig.database,
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true
}

console.log("TypeOrm Start Configuration");
console.log(serverConfig);
console.log(typeOrmConfig);