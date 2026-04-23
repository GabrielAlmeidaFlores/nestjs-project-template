import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-legal-proceeding.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/bpc-elderly-analysis-legal-proceeding.entity';
import { BpcElderlyAnalysisLegalProceedingId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-legal-proceeding/value-object/bpc-elderly-analysis-legal-proceeding-id/bpc-elderly-analysis-legal-proceeding-id.value-object';

@Injectable()
export class BpcElderlyAnalysisLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyAnalysisLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisLegalProceedingTypeormEntity,
    ): BpcElderlyAnalysisLegalProceedingEntity => {
      if (!source.bpcElderlyAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcElderlyAnalysisLegalProceedingEntity.name,
          sourceClass: BpcElderlyAnalysisLegalProceedingTypeormEntity.name,
        });
      }

      return new BpcElderlyAnalysisLegalProceedingEntity({
        id: new BpcElderlyAnalysisLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcElderlyAnalysisId: new BpcElderlyAnalysisId(
          source.bpcElderlyAnalysis.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisLegalProceedingTypeormEntity,
      BpcElderlyAnalysisLegalProceedingEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisLegalProceedingEntity,
    ): BpcElderlyAnalysisLegalProceedingTypeormEntity => {
      return BpcElderlyAnalysisLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        bpcElderlyAnalysis: {
          id: source.bpcElderlyAnalysisId.toString(),
        } as BpcElderlyAnalysisTypeormEntity,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      BpcElderlyAnalysisLegalProceedingEntity,
      BpcElderlyAnalysisLegalProceedingTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
