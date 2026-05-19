import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-result.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/temporary-incapacity-benefit-rejection-result.entity';
import { TemporaryIncapacityBenefitRejectionResultId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-result/value-object/temporary-incapacity-benefit-rejection-result-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionResultEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionResultTypeormEntity,
      TemporaryIncapacityBenefitRejectionResultEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionResultTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionResultEntity =>
          new TemporaryIncapacityBenefitRejectionResultEntity({
            id: new TemporaryIncapacityBenefitRejectionResultId(source.id),
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
      TemporaryIncapacityBenefitRejectionResultEntity,
      TemporaryIncapacityBenefitRejectionResultTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionResultEntity,
        ): TemporaryIncapacityBenefitRejectionResultTypeormEntity =>
          TemporaryIncapacityBenefitRejectionResultTypeormEntity.build({
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
