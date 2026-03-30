import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-time-accelerator.typeorm.entity';
import { GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/repository/disability-retirement-planning-grant-time-accelerator/query/result/get-disability-retirement-planning-grant-time-accelerator.query.result';
import { DisabilityRetirementPlanningGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-time-accelerator/value-object/disability-retirement-planning-grant-time-accelerator-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
      GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult,
      constructUsing(
        (
          source: DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
        ): GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult =>
          GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult.build({
            id: new DisabilityRetirementPlanningGrantTimeAcceleratorId(
              source.id,
            ),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult,
      DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GetDisabilityRetirementPlanningGrantTimeAcceleratorQueryResult,
        ): DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity =>
          DisabilityRetirementPlanningGrantTimeAcceleratorTypeormEntity.build({
            id: source.id.toString(),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
