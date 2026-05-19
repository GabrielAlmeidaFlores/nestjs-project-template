import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-result.typeorm.entity';
import { DeathBenefitGrantResultEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/death-benefit-grant-result.entity';
import { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

@Injectable()
export class DeathBenefitGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantResultEntityAutoMapperProfile.name;

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
      DeathBenefitGrantResultTypeormEntity,
      DeathBenefitGrantResultEntity,
      constructUsing(
        (
          source: DeathBenefitGrantResultTypeormEntity,
        ): DeathBenefitGrantResultEntity =>
          new DeathBenefitGrantResultEntity({
            id: new DeathBenefitGrantResultId(source.id),
            deathBenefitGrantFirstAnalysis:
              source.deathBenefitGrantFirstAnalysis,
            deathBenefitGrantCompleteAnalysis:
              source.deathBenefitGrantCompleteAnalysis,
            deathBenefitGrantSimplifiedAnalysis:
              source.deathBenefitGrantSimplifiedAnalysis,
            deathBenefitGrantCompleteAnalysisDownload:
              source.deathBenefitGrantCompleteAnalysisDownload,
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
      DeathBenefitGrantResultEntity,
      DeathBenefitGrantResultTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantResultEntity,
        ): DeathBenefitGrantResultTypeormEntity =>
          DeathBenefitGrantResultTypeormEntity.build({
            id: source.id.toString(),
            deathBenefitGrantFirstAnalysis:
              source.deathBenefitGrantFirstAnalysis,
            deathBenefitGrantCompleteAnalysis:
              source.deathBenefitGrantCompleteAnalysis,
            deathBenefitGrantSimplifiedAnalysis:
              source.deathBenefitGrantSimplifiedAnalysis,
            deathBenefitGrantCompleteAnalysisDownload:
              source.deathBenefitGrantCompleteAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
