import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TermsAndConditionsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/terms-and-conditions.typeorm.entity';
import { TermsEntity } from '@module/customer/account/domain/schema/entity/terms/terms.entity';
import { TermsId } from '@module/customer/account/domain/schema/entity/terms/value-object/terms-id/terms-id.value-object';

@Injectable()
export class TermsEntityAutoMapperProfile {
  protected readonly _type = TermsEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: TermsAndConditionsTypeormEntity,
    ): TermsEntity => {
      return new TermsEntity({
        ...source,
        id: new TermsId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      TermsAndConditionsTypeormEntity,
      TermsEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: TermsEntity,
    ): TermsAndConditionsTypeormEntity => {
      return TermsAndConditionsTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      TermsEntity,
      TermsAndConditionsTypeormEntity,
      mappingFunction,
    );
  }
}
