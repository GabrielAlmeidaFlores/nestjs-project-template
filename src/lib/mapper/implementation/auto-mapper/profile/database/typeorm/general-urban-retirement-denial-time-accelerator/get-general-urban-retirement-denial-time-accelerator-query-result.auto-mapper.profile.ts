import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-time-accelerator.typeorm.entity';
import { GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/repository/general-urban-retirement-denial-time-accelerator/query/result/get-general-urban-retirement-denial-time-accelerator.query.result';
import { GeneralUrbanRetirementDenialTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-time-accelerator/value-object/general-urban-retirement-denial-time-accelerator-id/general-urban-retirement-denial-time-accelerator-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResultAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
        ): GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult =>
          GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult.build({
            id: new GeneralUrbanRetirementDenialTimeAcceleratorId(source.id),
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
      GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult,
      GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GetGeneralUrbanRetirementDenialTimeAcceleratorQueryResult,
        ): GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity =>
          GeneralUrbanRetirementDenialTimeAcceleratorTypeormEntity.build({
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
