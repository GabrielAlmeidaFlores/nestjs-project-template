import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid.typeorm.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis/value-object/temporary-incapacity-benefit-rejection-disability-analysis-id.value-object';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/temporary-incapacity-benefit-rejection-disability-analysis-cid.entity';
import { TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-disability-analysis-cid/value-object/temporary-incapacity-benefit-rejection-disability-analysis-cid-id.value-object';

@Injectable()
export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntityAutoMapperProfile.name;

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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity => {
          if (!source.temporaryIncapacityBenefitRejectionDisabilityAnalysis) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity.name,
              sourceClass:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity.name,
            });
          }

          return new TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity(
            {
              id: new TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidId(
                source.id,
              ),
              cidTenId: source.cidTenId,
              temporaryIncapacityBenefitRejectionDisabilityAnalysisId:
                new TemporaryIncapacityBenefitRejectionDisabilityAnalysisId(
                  source.temporaryIncapacityBenefitRejectionDisabilityAnalysis
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
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
      TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity,
      constructUsing(
        (
          source: TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidEntity,
        ): TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity =>
          TemporaryIncapacityBenefitRejectionDisabilityAnalysisCidTypeormEntity.build(
            {
              id: source.id.toString(),
              cidTenId: source.cidTenId,
              temporaryIncapacityBenefitRejectionDisabilityAnalysis:
                TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity.build(
                  {
                    id: source.temporaryIncapacityBenefitRejectionDisabilityAnalysisId.toString(),
                  } as TemporaryIncapacityBenefitRejectionDisabilityAnalysisTypeormEntity,
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
