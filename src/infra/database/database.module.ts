import { Module } from '@nestjs/common';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.query.repository';
import { TypeormModule } from '@infra/database/implementation/typeorm/typeorm.module';
import { MapperModule } from '@lib/mapper/mapper.module';

@Module({
  imports: [MapperModule, TypeormModule],
  providers: [
    {
      provide: CustomerCommandRepositoryGateway,
      useClass: CustomerTypeormCommandRepository,
    },
    CustomerTypeormCommandRepository,
    {
      provide: CustomerQueryRepositoryGateway,
      useClass: CustomerTypeormQueryRepository,
    },
    CustomerTypeormQueryRepository,
  ],
  exports: [CustomerCommandRepositoryGateway, CustomerQueryRepositoryGateway],
})
export class DatabaseModule {
  protected readonly _type = DatabaseModule.name;
}
