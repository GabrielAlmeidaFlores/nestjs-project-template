import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomerTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.command.repository';
import { CustomerTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/customer/customer/customer.typeorm.query.repository';
import { ApplicationPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/application-paid-resource.typeorm.entity';
import { AvailablePaymentPlanEnabledPaidResourceTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan-enabled-paid-resource.typeorm.entity';
import { AvailablePaymentPlanTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/available-payment-plan.typeorm.entity';
import { CustomerAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-address.typeorm.entity';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer.typeorm.entity';
import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { OrganizationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization.typeorm.entity';
import { DatabaseApplicationVariable } from '@shared/system/constant/application-variable/database.application-variable';

import type { Provider } from '@nestjs/common';
import type { EntityClassOrSchema } from '@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type';
import type { DataSourceOptions } from 'typeorm';

export class TypeormIndex {
  public static readonly entities: EntityClassOrSchema[] = [
    ApplicationPaidResourceTypeormEntity,
    CustomerTypeormEntity,
    CustomerAddressTypeormEntity,
    AvailablePaymentPlanTypeormEntity,
    AvailablePaymentPlanEnabledPaidResourceTypeormEntity,
    OrganizationTypeormEntity,
    OrganizationMemberTypeormEntity,
  ];

  public static readonly repositories: Provider[] = [
    CustomerTypeormQueryRepository,
    CustomerTypeormCommandRepository,
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
    entities: TypeormIndex.entities,
    migrations: ['src/infra/database/implementation/typeorm/migration/*.ts'],
    synchronize: DatabaseApplicationVariable.DATABASE_SYNCHRONIZE,
  };

  protected readonly _type = TypeormIndex.name;
}
