import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';

export class TypeormIndex {
  public static readonly entities: EntityClassOrSchema[] = [];

  public static readonly repositories: Provider[] = [];

  public static readonly dynamicModule = TypeOrmModule.forFeature(
    TypeormIndex.entities,
  );

  public static readonly dataSourceConfig: DataSourceOptions = {
    type: 'mysql',
    host: DatabaseApplicationVariable.DATABASE_HOST,
    port: DatabaseApplicationVariable.DATABASE_PORT,
    username: DatabaseApplicationVariable.DATABASE_USERNAME,
    password: DatabaseApplicationVariable.DATABASE_PASSWORD,
    database: DatabaseApplicationVariable.DATABASE_NAME,
    entities: TypeormIndex.entities,
    synchronize: DatabaseApplicationVariable.DATABASE_SYNCHRONIZE,
  };

  protected readonly _type = TypeormIndex.name;
}
