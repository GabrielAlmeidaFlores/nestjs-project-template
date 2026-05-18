import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis/value-object/temporary-disability-benefits-terminated-disability-analysis-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/temporary-disability-benefits-terminated-disability-analysis-cid.entity';
import { TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-disability-analysis-cid/value-object/temporary-disability-benefits-terminated-disability-analysis-cid-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity => {
          if (!source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity(
            {
              id: new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidId(
                source.id,
              ),
              cidTenId: source.cidTenId,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId:
                new TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId(
                  source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysis
                    .id,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          );
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
      TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidEntity,
        ): TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity =>
          TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisCidTypeormEntity.build(
            {
              id: source.id.toString(),
              cidTenId: source.cidTenId,
              temporaryDisabilityBenefitsTerminatedDisabilityAnalysis:
                TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.toString(),
                  } as TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisTypeormEntity,
                ),
              createdAt: source.createdAt,
              updatedAt: source.updatedAt,
              deletedAt: source.deletedAt,
            },
          ),
      ),
    );
  }
}
