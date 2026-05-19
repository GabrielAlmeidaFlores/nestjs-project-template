import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-result.typeorm.entity';
import { AccidentBenefitRejectionResultEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/accident-benefit-rejection-result.entity';
import { AccidentBenefitRejectionResultId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-result/value-object/accident-benefit-rejection-result-id.value-object';

@Injectable()
export class AccidentBenefitRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionResultTypeormEntity,
    ): AccidentBenefitRejectionResultEntity => {
      return new AccidentBenefitRejectionResultEntity({
        id: new AccidentBenefitRejectionResultId(source.id),
        firstAnalysis: source.firstAnalysis,
        secondAnalysis: source.secondAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionResultTypeormEntity,
      AccidentBenefitRejectionResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionResultEntity,
    ): AccidentBenefitRejectionResultTypeormEntity => {
      return AccidentBenefitRejectionResultTypeormEntity.build({
        id: source.id.toString(),
        firstAnalysis: source.firstAnalysis,
        secondAnalysis: source.secondAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        completeAnalysisDownload: source.completeAnalysisDownload,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionResultEntity,
      AccidentBenefitRejectionResultTypeormEntity,
      constructUsing(convert),
    );
  }
}
