import { config } from 'dotenv';
import { DataSource } from 'typeorm';

import { TypeormIndex } from '@infra/database/implementation/typeorm/typeorm.index';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

config();

const typeormDataSource = new DataSource({
  type: 'mysql',
  host: DatabaseApplicationVariable.DATABASE_HOST,
  port: DatabaseApplicationVariable.DATABASE_PORT,
  database: DatabaseApplicationVariable.DATABASE_NAME,
  username: DatabaseApplicationVariable.DATABASE_USERNAME,
  password: DatabaseApplicationVariable.DATABASE_PASSWORD,
  synchronize: true,
  extra: {
    trustServerCertificate: true,
  },
  migrations: [__dirname + '/migration/*'],
  migrationsTableName: 'tb_migration',
  entities: TypeormIndex.entities,
});

export default typeormDataSource;
