import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { LegalPleadingAddressEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/legal-pleading-address.entity';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';

@Injectable()
export class LegalPleadingAddressEntityAutoMapperProfile {
  protected readonly _type = LegalPleadingAddressEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingAddressTypeormEntity,
    ): LegalPleadingAddressEntity => {
      return new LegalPleadingAddressEntity({
        ...source,
        id: new LegalPleadingAddressId(source.id),
        postalCode: new PostalCode(source.postalCode),
        stateCode: source.stateCode as StateCodeEnum,
        addressNumber: Number(source.addressNumber),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingAddressTypeormEntity,
      LegalPleadingAddressEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: LegalPleadingAddressEntity,
    ): LegalPleadingAddressTypeormEntity => {
      return LegalPleadingAddressTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        postalCode: source.postalCode.toString(),
        addressNumber: String(source.addressNumber),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      LegalPleadingAddressEntity,
      LegalPleadingAddressTypeormEntity,
      mappingFunction,
    );
  }
}
