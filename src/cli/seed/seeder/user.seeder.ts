import { Inject, Injectable } from '@nestjs/common';

import { SeederInterface } from '@cli/seed/interface/seeder.interface';
import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { UserCommandRepositoryGateway } from '@module/social/user/domain/repository/user/command/user.command.repository.gateway';
import { UserQueryRepositoryGateway } from '@module/social/user/domain/repository/user/query/user.query.repository.gateway';
import { UserEntity } from '@module/social/user/domain/schema/entity/user/user.entity';

@Injectable()
export class UserSeeder implements SeederInterface {
  protected readonly _type = UserSeeder.name;

  private readonly adminEmail = 'admin@example.com';
  private readonly adminPassword = 'Admin@123456';
  private readonly adminName = 'Admin';
  private readonly adminUsername = 'admin';

  public constructor(
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(UserQueryRepositoryGateway)
    private readonly userQueryRepositoryGateway: UserQueryRepositoryGateway,
    @Inject(UserCommandRepositoryGateway)
    private readonly userCommandRepositoryGateway: UserCommandRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const email = new Email(this.adminEmail);

    const existing =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmail(
        email,
      );

    if (existing !== null) {
      return [];
    }

    const authIdentityId = new AuthIdentityId();

    const authIdentity = new AuthIdentityEntity({
      id: authIdentityId,
      email,
      password: this.adminPassword,
      isActive: true,
    });

    const existingUser =
      await this.userQueryRepositoryGateway.findOneUserByUsername(
        this.adminUsername,
      );

    if (existingUser !== null) {
      return [];
    }

    const user = new UserEntity({
      authIdentityId,
      name: this.adminName,
      username: this.adminUsername,
      bio: null,
    });

    return [
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(
        authIdentity,
      ),
      this.userCommandRepositoryGateway.createUser(user),
    ];
  }
}
