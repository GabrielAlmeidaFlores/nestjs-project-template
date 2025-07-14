import { ClassProvider, Module } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/repository/base.transaction.repository.gateway';
import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.query.repository.gateway';
import { OrganizationCommandRepositoryGateway } from '@core/domain/repository/organization/organization/organization.command.repository.gateway';
import { OrganizationQueryRepositoryGateway } from '@core/domain/repository/organization/organization/organization.query.repository.gateway';
import { OrganizationMemberCommandRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.command.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@core/domain/repository/organization/organization-member/organization-member.query.repository.gateway';
import { BaseTypeormTransactionRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.transaction.repository';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer-address/customer-address.typeorm.query.repository';
import { OrganizationTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization/organization.typeorm.command.repository';
import { OrganizationTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization/organization.typeorm.query.repository';
import { OrganizationMemberTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/organization/organization-member/organization-member.typeorm.command.repository';
import { OrganizationMemberTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/organization/organization-member/organization-member.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';

const classProvider: ClassProvider[] = [
  {
    provide: BaseTransactionRepositoryGateway,
    useClass: BaseTypeormTransactionRepository,
  },
  {
    provide: CustomerCommandRepositoryGateway,
    useClass: CustomerTypeormCommandRepository,
  },
  {
    provide: CustomerQueryRepositoryGateway,
    useClass: CustomerTypeormQueryRepository,
  },
  {
    provide: CustomerAddressCommandRepositoryGateway,
    useClass: CustomerAddressTypeormCommandRepository,
  },
  {
    provide: CustomerAddressQueryRepositoryGateway,
    useClass: CustomerAddressTypeormQueryRepository,
  },
  {
    provide: OrganizationCommandRepositoryGateway,
    useClass: OrganizationTypeormCommandRepository,
  },
  {
    provide: OrganizationQueryRepositoryGateway,
    useClass: OrganizationTypeormQueryRepository,
  },
  {
    provide: OrganizationMemberCommandRepositoryGateway,
    useClass: OrganizationMemberTypeormCommandRepository,
  },
  {
    provide: OrganizationMemberQueryRepositoryGateway,
    useClass: OrganizationMemberTypeormQueryRepository,
  },
];

const providerList = classProvider.flatMap((p) => [p, p.useClass]);
const exportList = classProvider.map((p) => p.provide);

@Module({
  imports: [MapperModule, TypeormModule],
  providers: providerList,
  exports: exportList,
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}
