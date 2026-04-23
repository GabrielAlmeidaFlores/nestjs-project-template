import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-time-accelerator.typeorm.entity';
import { GetDeathBenefitRejectionTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/repository/death-benefit-rejection-time-accelerator/query/result/get-death-benefit-rejection-time-accelerator.query.result';
import { DeathBenefitRejectionTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-time-accelerator/value-object/death-benefit-rejection-time-accelerator-id.value-object';

@Injectable()
export class GetDeathBenefitRejectionTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitRejectionTimeAcceleratorQueryResultAutoMapperProfile.name;

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
      DeathBenefitRejectionTimeAcceleratorTypeormEntity,
      GetDeathBenefitRejectionTimeAcceleratorQueryResult,
      constructUsing(
        (
          source: DeathBenefitRejectionTimeAcceleratorTypeormEntity,
        ): GetDeathBenefitRejectionTimeAcceleratorQueryResult =>
          GetDeathBenefitRejectionTimeAcceleratorQueryResult.build({
            id: new DeathBenefitRejectionTimeAcceleratorId(source.id),
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
      GetDeathBenefitRejectionTimeAcceleratorQueryResult,
      DeathBenefitRejectionTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GetDeathBenefitRejectionTimeAcceleratorQueryResult,
        ): DeathBenefitRejectionTimeAcceleratorTypeormEntity =>
          DeathBenefitRejectionTimeAcceleratorTypeormEntity.build({
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
