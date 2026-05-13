import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/query/result/get-retirement-permanent-disability-revision-inss-benefit.query.result';
import { RetirementPermanentDisabilityRevisionInssBenefitId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/value-object/retirement-permanent-disability-revision-inss-benefit-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionInssBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionInssBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult => {
      return GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult.build(
        {
          id: new RetirementPermanentDisabilityRevisionInssBenefitId(source.id),
          inssBenefitNumber: source.inssBenefitNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
    ): RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity => {
      return RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity.build(
        {
          id: source.id.toString(),
          inssBenefitNumber: source.inssBenefitNumber,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt ?? null,
          retirementPermanentDisabilityRevision: undefined,
        },
      );
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
      RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
