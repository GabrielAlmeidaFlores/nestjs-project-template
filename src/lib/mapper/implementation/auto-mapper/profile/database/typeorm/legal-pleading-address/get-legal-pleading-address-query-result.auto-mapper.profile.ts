import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { LegalPleadingAddressTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-address.typeorm.entity';
import { GetLegalPleadingAddressQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-address/query/result/get-legal-pleading-address.query.result';
import { LegalPleadingAddressId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-address/value-object/legal-pleading-address/legal-pleading-address-id.value-object';

@Injectable()
export class GetLegalPleadingAddressQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingAddressQueryResultAutoMapperProfile.name;

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
    ): GetLegalPleadingAddressQueryResult => {
      return GetLegalPleadingAddressQueryResult.build({
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
      GetLegalPleadingAddressQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingAddressQueryResult,
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
      GetLegalPleadingAddressQueryResult,
      LegalPleadingAddressTypeormEntity,
      mappingFunction,
    );
  }
}
