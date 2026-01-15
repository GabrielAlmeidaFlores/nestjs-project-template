import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityLegalProceedingEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/special-activity-legal-proceeding.entity';
import { SpecialActivityLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-legal-proceeding/value-object/special-activity-legal-proceeding-id.value-object';
import { GetSpecialActivityLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/query/result/get-special-activity-legal-proceeding.query.result';

@Injectable()
export class SpecialActivityLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    SpecialActivityLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialActivityLegalProceedingTypeormEntity,
    ): SpecialActivityLegalProceedingEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        SpecialActivityEntity,
      );

      return new SpecialActivityLegalProceedingEntity({
        ...source,
        id: new SpecialActivityLegalProceedingId(source.id),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityLegalProceedingTypeormEntity,
      SpecialActivityLegalProceedingEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityLegalProceedingEntity,
    ): SpecialActivityLegalProceedingTypeormEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityEntity,
        SpecialActivityTypeormEntity,
      );

      return SpecialActivityLegalProceedingTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityLegalProceedingEntity,
      SpecialActivityLegalProceedingTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityLegalProceedingTypeormEntity,
    ): GetSpecialActivityLegalProceedingQueryResult => {
      return GetSpecialActivityLegalProceedingQueryResult.build({
        id: new SpecialActivityLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityLegalProceedingTypeormEntity,
      GetSpecialActivityLegalProceedingQueryResult,
      mappingFunction,
    );
  }
}
