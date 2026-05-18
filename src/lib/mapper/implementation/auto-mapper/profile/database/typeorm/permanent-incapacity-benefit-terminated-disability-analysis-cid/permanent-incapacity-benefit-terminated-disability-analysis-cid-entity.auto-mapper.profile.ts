import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid.typeorm.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis/value-object/permanent-incapacity-benefit-terminated-disability-analysis-id.value-object';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/permanent-incapacity-benefit-terminated-disability-analysis-cid.entity';
import { PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-disability-analysis-cid/value-object/permanent-incapacity-benefit-terminated-disability-analysis-cid-id.value-object';

@Injectable()
export class PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntityAutoMapperProfile {
  protected readonly _type =
    PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntityAutoMapperProfile.name;

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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity => {
          if (!source.permanentIncapacityBenefitTerminatedDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity.name,
              sourceClass:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity.name,
            });
          }

          return new PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity(
            {
              id: new PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidId(
                source.id,
              ),
              cidTenId: source.cidTenId,
              permanentIncapacityBenefitTerminatedDisabilityAnalysisId:
                new PermanentIncapacityBenefitTerminatedDisabilityAnalysisId(
                  source.permanentIncapacityBenefitTerminatedDisabilityAnalysis
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
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
      PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity,
      constructUsing(
        (
          source: PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidEntity,
        ): PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity =>
          PermanentIncapacityBenefitTerminatedDisabilityAnalysisCidTypeormEntity.build(
            {
              id: source.id.toString(),
              cidTenId: source.cidTenId,
              permanentIncapacityBenefitTerminatedDisabilityAnalysis:
                PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.permanentIncapacityBenefitTerminatedDisabilityAnalysisId.toString(),
                  } as PermanentIncapacityBenefitTerminatedDisabilityAnalysisTypeormEntity,
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
