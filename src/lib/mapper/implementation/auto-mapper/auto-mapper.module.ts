import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';

import { AutoMapperService } from '@lib/mapper/implementation/auto-mapper/auto-mapper.service';
import { noopStrategy } from '@lib/mapper/implementation/auto-mapper/noop-strategy';
import { AuthIdentityEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/auth-identity-entity.auto-mapper.profile';
import { GetAuthIdentityQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-query-result.auto-mapper.profile';
import { GetAuthIdentityWithRelationsQueryResultAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/auth-identity/get-auth-identity-with-relations-query-result.auto-mapper.profile';
import { CommentEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/comment/comment-entity.auto-mapper.profile';
import { PostEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/post/post-entity.auto-mapper.profile';
import { UserEntityAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/database/typeorm/user/user-entity.auto-mapper.profile';

@Module({
  imports: [
    AutomapperModule.forRoot({
      strategyInitializer: noopStrategy(),
    }),
  ],
  providers: [
    AutoMapperService,
    AuthIdentityEntityAutoMapperProfile,
    GetAuthIdentityQueryResultAutoMapperProfile,
    GetAuthIdentityWithRelationsQueryResultAutoMapperProfile,
    UserEntityAutoMapperProfile,
    PostEntityAutoMapperProfile,
    CommentEntityAutoMapperProfile,
  ],
  exports: [AutoMapperService],
})
export class AutoMapperModule {
  protected readonly _type = AutoMapperModule.name;
}
