import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-result.typeorm.entity';
import { DeathBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/death-benefit-rejection-result.entity';
import { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

@Injectable()
export class DeathBenefitRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      DeathBenefitRejectionResultTypeormEntity,
      DeathBenefitRejectionResultEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionResultTypeormEntity,
        ): DeathBenefitRejectionResultEntity =>
          new DeathBenefitRejectionResultEntity({
            id: new DeathBenefitRejectionResultId(source.id),
            deathBenefitRejectionInssDecisionAnalysis:
              source.deathBenefitRejectionInssDecisionAnalysis,
            deathBenefitRejectionFirstAnalysis:
              source.deathBenefitRejectionFirstAnalysis,
            deathBenefitRejectionCompleteAnalysis:
              source.deathBenefitRejectionCompleteAnalysis,
            deathBenefitRejectionSimplifiedAnalysis:
              source.deathBenefitRejectionSimplifiedAnalysis,
            deathBenefitRejectionCompleteAnalysisDownload:
              source.deathBenefitRejectionCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      DeathBenefitRejectionResultEntity,
      DeathBenefitRejectionResultTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionResultEntity,
        ): DeathBenefitRejectionResultTypeormEntity =>
          DeathBenefitRejectionResultTypeormEntity.build({
            id: source.id.toString(),
            deathBenefitRejectionInssDecisionAnalysis:
              source.deathBenefitRejectionInssDecisionAnalysis,
            deathBenefitRejectionFirstAnalysis:
              source.deathBenefitRejectionFirstAnalysis,
            deathBenefitRejectionCompleteAnalysis:
              source.deathBenefitRejectionCompleteAnalysis,
            deathBenefitRejectionSimplifiedAnalysis:
              source.deathBenefitRejectionSimplifiedAnalysis,
            deathBenefitRejectionCompleteAnalysisDownload:
              source.deathBenefitRejectionCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
