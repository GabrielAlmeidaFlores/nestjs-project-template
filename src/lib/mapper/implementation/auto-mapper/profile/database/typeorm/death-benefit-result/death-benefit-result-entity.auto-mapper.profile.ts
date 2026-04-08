import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-result.typeorm.entity';
import { DeathBenefitResultEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/death-benefit-result.entity';
import { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

@Injectable()
export class DeathBenefitResultEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitResultEntityAutoMapperProfile.name;

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
      DeathBenefitResultTypeormEntity,
      DeathBenefitResultEntity,
      constructUsing(
        (source: DeathBenefitResultTypeormEntity): DeathBenefitResultEntity =>
          new DeathBenefitResultEntity({
            id: new DeathBenefitResultId(source.id),
            deathBenefitFirstAnalysis: source.deathBenefitFirstAnalysis,
            deathBenefitCompleteAnalysis: source.deathBenefitCompleteAnalysis,
            deathBenefitSimplifiedAnalysis:
              source.deathBenefitSimplifiedAnalysis,
            deathBenefitCompleteAnalysisDownload:
              source.deathBenefitCompleteAnalysisDownload,
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
      DeathBenefitResultEntity,
      DeathBenefitResultTypeormEntity,
      constructUsing(
        (source: DeathBenefitResultEntity): DeathBenefitResultTypeormEntity =>
          DeathBenefitResultTypeormEntity.build({
            id: source.id.toString(),
            deathBenefitFirstAnalysis: source.deathBenefitFirstAnalysis,
            deathBenefitCompleteAnalysis: source.deathBenefitCompleteAnalysis,
            deathBenefitSimplifiedAnalysis:
              source.deathBenefitSimplifiedAnalysis,
            deathBenefitCompleteAnalysisDownload:
              source.deathBenefitCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
