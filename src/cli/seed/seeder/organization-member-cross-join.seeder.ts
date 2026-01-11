import { Inject, Logger } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization/query/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/command/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CustomerEntity } from '@module/customer/account/domain/schema/entity/customer/customer.entity';
import { OrganizationEntity } from '@module/customer/account/domain/schema/entity/organization/organization.entity';
import { OrganizationMemberEntity } from '@module/customer/account/domain/schema/entity/organization-member/organization-member.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';
import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';

export class OrganizationMemberCrossJoinSeeder implements SeederInterface {
  protected readonly _type = OrganizationMemberCrossJoinSeeder.name;
  private readonly logger: Logger;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,

    @Inject(OrganizationQueryRepositoryGateway)
    private readonly organizationQueryRepositoryGateway: OrganizationQueryRepositoryGateway,

    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,

    @Inject(OrganizationMemberCommandRepositoryGateway)
    private readonly organizationMemberCommandRepositoryGateway: OrganizationMemberCommandRepositoryGateway,
  ) {
    this.logger = new Logger(OrganizationMemberCrossJoinSeeder.name);
  }

  public async execute(): Promise<Array<TransactionType>> {
    const transactions: TransactionType[] = [];

    const customers = await this.customerQueryRepositoryGateway.listAll();

    this.logger.log(`Found ${customers.length} customers`);

    const organizations =
      await this.organizationQueryRepositoryGateway.listAll();

    this.logger.log(`Found ${organizations.length} organizations`);

    let createdCount = 0;
    let skippedCount = 0;

    for (const customerResult of customers) {
      for (const organizationResult of organizations) {
        const existingMember =
          await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndOrganizationId(
            customerResult.id,
            organizationResult.id,
          );

        if (existingMember) {
          this.logger.log(
            `Skipping: Customer ${customerResult.id.toString()} already member of Organization ${organizationResult.id.toString()}`,
          );
          skippedCount++;
          continue;
        }

        const customer = {
          id: customerResult.id,
        } as CustomerEntity;

        const organization = {
          id: organizationResult.id,
        } as OrganizationEntity;

        const organizationMember = new OrganizationMemberEntity({
          organization,
          customer,
          owner: false,
        });

        const transaction =
          this.organizationMemberCommandRepositoryGateway.createOrganizationMember(
            organizationMember,
          );

        transactions.push(transaction);
        createdCount++;

        this.logger.log(
          `Creating: Customer ${customerResult.id.toString()} -> Organization ${organizationResult.id.toString()}`,
        );
      }
    }

    this.logger.log(`\nSummary:`);
    this.logger.log(`- Created: ${createdCount} organization-members`);
    this.logger.log(`- Skipped: ${skippedCount} (already existed)`);
    this.logger.log(
      `- Total combinations: ${customers.length * organizations.length}`,
    );

    return transactions;
  }
}
