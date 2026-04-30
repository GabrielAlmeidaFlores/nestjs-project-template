import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-result.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/temporary-incapacity-benefit-termination-result.entity';
import { TemporaryIncapacityBenefitTerminationResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-result/value-object/temporary-incapacity-benefit-termination-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationResultEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationResultEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationResultTypeormEntity,
      TemporaryIncapacityBenefitTerminationResultEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationResultTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationResultEntity =>
          new TemporaryIncapacityBenefitTerminationResultEntity({
            id: new TemporaryIncapacityBenefitTerminationResultId(source.id),
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
      TemporaryIncapacityBenefitTerminationResultEntity,
      TemporaryIncapacityBenefitTerminationResultTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationResultEntity,
        ): TemporaryIncapacityBenefitTerminationResultTypeormEntity =>
          TemporaryIncapacityBenefitTerminationResultTypeormEntity.build({
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
