import { ClassProvider, Module } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { AuthIdentityTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.command.repository';
import { AuthIdentityTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/auth-identity/auth-identity.typeorm.query.repository';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CommentTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/comment/comment.typeorm.command.repository';
import { CommentTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/comment/comment.typeorm.query.repository';
import { PostTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/post/post.typeorm.command.repository';
import { PostTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/post/post.typeorm.query.repository';
import { UserTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/user/user.typeorm.command.repository';
import { UserTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/user/user.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';
import { CommentCommandRepositoryGateway } from '@module/client/comment/domain/repository/comment/command/comment.command.repository.gateway';
import { CommentQueryRepositoryGateway } from '@module/client/comment/domain/repository/comment/query/comment.query.repository.gateway';
import { PostCommandRepositoryGateway } from '@module/client/post/domain/repository/post/command/post.command.repository.gateway';
import { PostQueryRepositoryGateway } from '@module/client/post/domain/repository/post/query/post.query.repository.gateway';
import { UserCommandRepositoryGateway } from '@module/client/user/domain/repository/user/command/user.command.repository.gateway';
import { UserQueryRepositoryGateway } from '@module/client/user/domain/repository/user/query/user.query.repository.gateway';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';

const classProvider: ClassProvider[] = [
  {
    provide: BaseTransactionRepositoryGateway,
    useClass: BaseTypeormTransactionRepository,
  },
  {
    provide: AuthIdentityQueryRepositoryGateway,
    useClass: AuthIdentityTypeormQueryRepository,
  },
  {
    provide: AuthIdentityCommandRepositoryGateway,
    useClass: AuthIdentityTypeormCommandRepository,
  },
  {
    provide: UserQueryRepositoryGateway,
    useClass: UserTypeormQueryRepository,
  },
  {
    provide: UserCommandRepositoryGateway,
    useClass: UserTypeormCommandRepository,
  },
  {
    provide: PostQueryRepositoryGateway,
    useClass: PostTypeormQueryRepository,
  },
  {
    provide: PostCommandRepositoryGateway,
    useClass: PostTypeormCommandRepository,
  },
  {
    provide: CommentQueryRepositoryGateway,
    useClass: CommentTypeormQueryRepository,
  },
  {
    provide: CommentCommandRepositoryGateway,
    useClass: CommentTypeormCommandRepository,
  },
];

@Module({
  imports: [MapperModule, TypeormModule],
  providers: classProvider.flatMap((p) => [p, p.useClass]),
  exports: classProvider.map((p) => p.provide),
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}
