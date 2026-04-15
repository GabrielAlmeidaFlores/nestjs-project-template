import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { BpcElderlyAnalysisInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis-inss-benefit.typeorm.entity';
import { BpcElderlyAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-elderly-analysis.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcElderlyAnalysisId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis/value-object/bpc-elderly-analysis-id/bpc-elderly-analysis-id.value-object';
import { BpcElderlyAnalysisInssBenefitEntity } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/bpc-elderly-analysis-inss-benefit.entity';
import { BpcElderlyAnalysisInssBenefitId } from '@module/customer/analysis-tool/module/bpc-elderly-analysis/domain/schema/entity/bpc-elderly-analysis-inss-benefit/value-object/bpc-elderly-analysis-inss-benefit-id/bpc-elderly-analysis-inss-benefit-id.value-object';

@Injectable()
export class BpcElderlyAnalysisInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    BpcElderlyAnalysisInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: BpcElderlyAnalysisInssBenefitTypeormEntity,
    ): BpcElderlyAnalysisInssBenefitEntity => {
      if (!source.bpcElderlyAnalysis) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: BpcElderlyAnalysisInssBenefitEntity.name,
          sourceClass: BpcElderlyAnalysisInssBenefitTypeormEntity.name,
        });
      }

      return new BpcElderlyAnalysisInssBenefitEntity({
        id: new BpcElderlyAnalysisInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcElderlyAnalysisInssBenefitTypeormEntity,
      BpcElderlyAnalysisInssBenefitEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: BpcElderlyAnalysisInssBenefitEntity,
    ): BpcElderlyAnalysisInssBenefitTypeormEntity => {
      return BpcElderlyAnalysisInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefitNumber: source.inssBenefitNumber,
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
      BpcElderlyAnalysisInssBenefitEntity,
      BpcElderlyAnalysisInssBenefitTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
