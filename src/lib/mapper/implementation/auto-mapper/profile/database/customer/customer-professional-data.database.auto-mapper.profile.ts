import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { CustomerProfessionalDataEntity } from '@core/domain/schema/entity/customer/customer-professional-data/customer-professional-data.entity';
import { StateCodeEnum } from '@core/domain/schema/entity/customer/enum/state-code.enum';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { CustomerTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer/customer.typeorm.entity';
import { CustomerProfessionalDataTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer/customer-professional-data/customer-professional-data.typeorm.entity';
import { BaseAutoMapperProfile } from '@lib/mapper/implementation/auto-mapper/profile/base/base.auto-mapper.profile';

@Injectable()
export class CustomerProfessionalDataDatabaseAutoMapperProfile extends BaseAutoMapperProfile {
  protected readonly _type =
    CustomerProfessionalDataDatabaseAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    super();
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerProfessionalDataTypeormEntity,
    ): CustomerProfessionalDataEntity => {
      const id = new Guid(source.id);
      const stateCode = this.convertStringToEnum(
        StateCodeEnum,
        source.stateCode,
      );
      const customer = this.mapper.map(
        source.customer,
        CustomerTypeormEntity,
        CustomerEntity,
      );

      return new CustomerProfessionalDataEntity({
        ...source,
        id,
        stateCode,
        customer,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerProfessionalDataTypeormEntity,
      CustomerProfessionalDataEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerProfessionalDataEntity,
    ): CustomerProfessionalDataTypeormEntity => {
      const id = source.id.toString();
      const stateCode = source.stateCode;
      const customer = this.mapper.map(
        source.customer,
        CustomerEntity,
        CustomerTypeormEntity,
      );

      return new CustomerProfessionalDataTypeormEntity({
        ...source,
        id,
        stateCode,
        customer,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerProfessionalDataEntity,
      CustomerProfessionalDataTypeormEntity,
      mappingFunction,
    );
  }
}
