import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-termination-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis/value-object/temporary-incapacity-benefit-termination-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/temporary-incapacity-benefit-termination-disability-analysis-cid.entity';
import { TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-disability-analysis-cid/value-object/temporary-incapacity-benefit-termination-disability-analysis-cid-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity => {
          if (!source.temporaryIncapacityBenefitTerminationDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity(
            {
              id: new TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidId(
                source.id,
              ),
              cidTenId: source.cidTenId,
              temporaryIncapacityBenefitTerminationDisabilityAnalysisId:
                new TemporaryIncapacityBenefitTerminationDisabilityAnalysisId(
                  source.temporaryIncapacityBenefitTerminationDisabilityAnalysis
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
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
      TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidEntity,
        ): TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity =>
          TemporaryIncapacityBenefitTerminationDisabilityAnalysisCidTypeormEntity.build(
            {
              id: source.id.toString(),
              cidTenId: source.cidTenId,
              temporaryIncapacityBenefitTerminationDisabilityAnalysis:
                TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitTerminationDisabilityAnalysisId.toString(),
                  } as TemporaryIncapacityBenefitTerminationDisabilityAnalysisTypeormEntity,
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
