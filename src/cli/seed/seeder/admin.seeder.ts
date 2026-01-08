import { Inject } from '@nestjs/common';

import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { AdminCommandRepositoryGateway } from '@module/admin/account/domain/repository/admin/command/admin.command.repository.gateway';
import { AdminEntity } from '@module/admin/account/domain/schema/entity/admin/admin.entity';
import { AuthIdentityCommandRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/command/auth-identity.command.repository.gateway';
import { AuthIdentityQueryRepositoryGateway } from '@module/generic/auth-identity/domain/repository/auth-identity/query/auth-identity.query.repository.gateway';
import { AuthIdentityEntity } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/auth-identity.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export class AdminSeeder implements SeederInterface {
  protected readonly _type = AdminSeeder.name;

  public constructor(
    @Inject(AuthIdentityCommandRepositoryGateway)
    private readonly authIdentityCommandRepositoryGateway: AuthIdentityCommandRepositoryGateway,
    @Inject(AuthIdentityQueryRepositoryGateway)
    private readonly authIdentityQueryRepositoryGateway: AuthIdentityQueryRepositoryGateway,
    @Inject(AdminCommandRepositoryGateway)
    private readonly adminCommandRepositoryGateway: AdminCommandRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const adminEmail = new Email('admin@agilizaprevi.com.br');
    const adminFederalDocument = new FederalDocument('32139844009');
    const adminPassword = 'Testando123!';
    const adminName = 'admin';

    const existingAuthIdentity =
      await this.authIdentityQueryRepositoryGateway.findOneAuthIdentityByEmailOrFederalDocument(
        adminEmail,
      );

    if (existingAuthIdentity !== null) {
      return [];
    }

    const transactions: Array<TransactionType> = [];

    const admin = new AdminEntity({
      name: adminName,
    });

    const authIdentity = new AuthIdentityEntity({
      email: adminEmail,
      federalDocument: adminFederalDocument,
      password: adminPassword,
      authenticatorAppSecret: null,
      customer: null,
      admin: admin.id,
    });

    const createAdminTransaction =
      this.adminCommandRepositoryGateway.createAdmin(admin);

    transactions.push(createAdminTransaction);

    const createAuthIdentityTransaction =
      this.authIdentityCommandRepositoryGateway.createAuthIdentity(
        authIdentity,
      );

    transactions.push(createAuthIdentityTransaction);

    return transactions;
  }
}
