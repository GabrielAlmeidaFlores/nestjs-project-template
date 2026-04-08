import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-result.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantResultEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/temporary-disability-benefits-grant-result.entity';
import { TemporaryDisabilityBenefitsGrantResultId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-result/value-object/temporary-disability-benefits-grant-result-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantResultEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantResultTypeormEntity,
      TemporaryDisabilityBenefitsGrantResultEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantResultTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantResultEntity =>
          new TemporaryDisabilityBenefitsGrantResultEntity({
            id: new TemporaryDisabilityBenefitsGrantResultId(source.id),
            completeAnalysis: source.completeAnalysis,
            simplifiedAnalysis: source.simplifiedAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
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
      TemporaryDisabilityBenefitsGrantResultEntity,
      TemporaryDisabilityBenefitsGrantResultTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantResultEntity,
        ): TemporaryDisabilityBenefitsGrantResultTypeormEntity =>
          TemporaryDisabilityBenefitsGrantResultTypeormEntity.build({
            id: source.id.toString(),
            completeAnalysis: source.completeAnalysis,
            simplifiedAnalysis: source.simplifiedAnalysis,
            firstAnalysis: source.firstAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
