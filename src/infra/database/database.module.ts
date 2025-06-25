import { ClassProvider, Module } from '@nestjs/common';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerAddressCommandRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.command.repository.gateway';
import { CustomerAddressQueryRepositoryGateway } from '@core/domain/repository/customer/customer-address/customer-address.query.repository.gateway';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.query.repository';
import { CustomerAddressTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer-address/customer-address.typeorm.command.repository';
import { CustomerAddressTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer-address/customer-address.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';

const classProvider: ClassProvider[] = [
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
