import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcDisabilityDenialResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-denial-result.typeorm.entity';
import { BpcDisabilityDenialResultEntity } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/bpc-disability-denial-result.entity';
import { BpcDisabilityDenialResultId } from '@module/customer/analysis-tool/module/bpc-disability-denial/domain/schema/entity/bpc-disability-denial-result/value-object/bpc-disability-denial-result-id/bpc-disability-denial-result-id.value-object';

@Injectable()
export class BpcDisabilityDenialResultEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityDenialResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcDisabilityDenialResultTypeormEntity,
    ): BpcDisabilityDenialResultEntity => {
      return new BpcDisabilityDenialResultEntity({
        id: new BpcDisabilityDenialResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialResultTypeormEntity,
      BpcDisabilityDenialResultEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcDisabilityDenialResultEntity,
    ): BpcDisabilityDenialResultTypeormEntity => {
      return BpcDisabilityDenialResultTypeormEntity.build({
        id: source.id.toString(),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        firstAnalysis: source.firstAnalysis,
        completeAnalysis: source.completeAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        simplifiedAnalysis: source.simplifiedAnalysis,
        applicableRules: source.applicableRules,
        benefitSummaries: source.benefitSummaries,
        analysisDetailedText: source.analysisDetailedText,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcDisabilityDenialResultEntity,
      BpcDisabilityDenialResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
