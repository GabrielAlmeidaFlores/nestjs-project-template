import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-rejection-time-accelerator.typeorm.entity';
import { GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/repository/disability-retirement-planning-rejection-time-accelerator/query/result/get-disability-retirement-planning-rejection-time-accelerator.query.result';
import { DisabilityRetirementPlanningRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/disability-retirement-planning-rejection/domain/schema/entity/disability-retirement-planning-rejection-time-accelerator/value-object/disability-retirement-planning-rejection-time-accelerator-id/disability-retirement-planning-rejection-time-accelerator-id.value-object';

@Injectable()
export class GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResultAutoMapperProfile.name;

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
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult,
      constructUsing(
        (
          source: DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
        ): GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult =>
          GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult.build(
            {
              id: new DisabilityRetirementPlanningRejectionTimeAcceleratorId(
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
            },
          ),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult,
      DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GetDisabilityRetirementPlanningRejectionTimeAcceleratorQueryResult,
        ): DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity =>
          DisabilityRetirementPlanningRejectionTimeAcceleratorTypeormEntity.build(
            {
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
            },
          ),
      ),
    );
  }
}
