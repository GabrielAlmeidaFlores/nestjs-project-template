import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-result.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedResultEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/permanent-incapacity-benefit-terminated-result.entity';
import { PermanentIncapacityBenefitTerminatedResultId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-result/value-object/permanent-incapacity-benefit-terminated-result-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedResultEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedResultEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedResultTypeormEntity,
      PermanentIncapacityBenefitTerminatedResultEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedResultTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedResultEntity =>
          new PermanentIncapacityBenefitTerminatedResultEntity({
            id: new PermanentIncapacityBenefitTerminatedResultId(source.id),
            inssDecisionAnalysis: source.inssDecisionAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            simplifiedAnalysis: source.simplifiedAnalysis,
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
      PermanentIncapacityBenefitTerminatedResultEntity,
      PermanentIncapacityBenefitTerminatedResultTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedResultEntity,
        ): PermanentIncapacityBenefitTerminatedResultTypeormEntity =>
          PermanentIncapacityBenefitTerminatedResultTypeormEntity.build({
            id: source.id.toString(),
            inssDecisionAnalysis: source.inssDecisionAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            simplifiedAnalysis: source.simplifiedAnalysis,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
