import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten-typeorm.entity';
import { RetirementPlanningRppsPeriodDisabilityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-disability.typeorm.entity';
import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { GetCidTenQueryResult } from '@module/customer/analysis-tool/domain/repository/cid-ten/query/result/get-cid-ten.query.result';
import { GetRetirementPlanningRppsPeriodDisabilityQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-disability/query/result/get-retirement-planning-rpps-period-disability.query.result';
import { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import { RetirementPlanningRppsPeriodDisabilityId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-disability/value-object/retirement-planning-rpps-period-disability-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsPeriodDisabilityQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsPeriodDisabilityQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodDisabilityTypeormEntity,
    ): GetRetirementPlanningRppsPeriodDisabilityQueryResult => {
      const cid = this.mapper.map(
        source.cid,
        CidTenTypeormEntity,
        GetCidTenQueryResult,
      );

      const documents = source.disabilityDocuments
        ? this.mapper.mapArray(
            source.disabilityDocuments,
            RetirementPlanningRppsPeriodDocumentTypeormEntity,
            GetRetirementPlanningRppsPeriodDocumentQueryResult,
          )
        : [];

      return GetRetirementPlanningRppsPeriodDisabilityQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsPeriodDisabilityId(source.id),
        cid,
        documents,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
      GetRetirementPlanningRppsPeriodDisabilityQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsPeriodDisabilityQueryResult,
    ): RetirementPlanningRppsPeriodDisabilityTypeormEntity => {
      const cid = this.mapper.map(
        source.cid,
        GetCidTenQueryResult,
        CidTenTypeormEntity,
      );

      return RetirementPlanningRppsPeriodDisabilityTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        cid,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsPeriodDisabilityQueryResult,
      RetirementPlanningRppsPeriodDisabilityTypeormEntity,
      mappingFunction,
    );
  }
}
