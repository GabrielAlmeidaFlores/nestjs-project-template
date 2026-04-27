import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-result.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/temporary-disability-benefits-terminated-result.entity';
import { TemporaryDisabilityBenefitsTerminatedResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-result/value-object/temporary-disability-benefits-terminated-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedResultEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedResultEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedResultTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedResultEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedResultTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedResultEntity =>
          new TemporaryDisabilityBenefitsTerminatedResultEntity({
            id: new TemporaryDisabilityBenefitsTerminatedResultId(source.id),
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
      TemporaryDisabilityBenefitsTerminatedResultEntity,
      TemporaryDisabilityBenefitsTerminatedResultTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedResultEntity,
        ): TemporaryDisabilityBenefitsTerminatedResultTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedResultTypeormEntity.build({
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
