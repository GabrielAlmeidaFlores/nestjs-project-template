import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { CommentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/comment/comment.typeorm.command.repository';
import { CommentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/comment/comment.typeorm.query.repository';
import { PostTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/post/post.typeorm.command.repository';
import { PostTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/post/post.typeorm.query.repository';
import { UserTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/user/user.typeorm.command.repository';
import { UserTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/user/user.typeorm.query.repository';
import { AuthIdentityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/auth-identity.typeorm.entity';
import { CommentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/comment.typeorm.entity';
import { PostTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/post.typeorm.entity';
import { UserTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/user.typeorm.entity';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/source/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';

export class TypeormIndex {
  public static readonly entities: EntityClassOrSchema[] = [
    AuthIdentityTypeormEntity,
    UserTypeormEntity,
    PostTypeormEntity,
    CommentTypeormEntity,
  ];

  public static readonly repositories: Provider[] = [
    AuthIdentityTypeormQueryRepository,
    AuthIdentityTypeormCommandRepository,
    UserTypeormQueryRepository,
    UserTypeormCommandRepository,
    PostTypeormQueryRepository,
    PostTypeormCommandRepository,
    CommentTypeormQueryRepository,
    CommentTypeormCommandRepository,
  ];

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
    synchronize: DatabaseApplicationVariable.DATABASE_SYNCHRONIZE,
  };

  protected readonly _type = TypeormIndex.name;
}
