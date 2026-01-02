import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRppsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rpps-period-document.typeorm.entity';
import { GetRetirementPlanningRppsPeriodDocumentQueryResult } from '@module/customer/analysis-tool/domain/repository/retirement-planning-rpps-period-document/query/result/get-retirement-planning-rpps-period-document.query.result';
import { RetirementPlanningRppsPeriodDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/retirement-planning-rpps-period-document/value-object/retirement-planning-rpps-period-document-id.value-object';

@Injectable()
export class GetRetirementPlanningRppsPeriodDocumentQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPlanningRppsPeriodDocumentQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRppsPeriodDocumentTypeormEntity,
    ): GetRetirementPlanningRppsPeriodDocumentQueryResult => {
      return GetRetirementPlanningRppsPeriodDocumentQueryResult.build({
        ...source,
        id: new RetirementPlanningRppsPeriodDocumentId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
      GetRetirementPlanningRppsPeriodDocumentQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPlanningRppsPeriodDocumentQueryResult,
    ): RetirementPlanningRppsPeriodDocumentTypeormEntity => {
      return RetirementPlanningRppsPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        documentType: source.documentType,
        document: source.document,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPlanningRppsPeriodDocumentQueryResult,
      RetirementPlanningRppsPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
