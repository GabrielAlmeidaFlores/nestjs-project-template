import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-legal-proceeding.typeorm.entity';
import { LegalProceedingDetailTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-proceeding-detail.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
import { LegalProceedingDetailEntity } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/legal-proceeding-detail.entity';
import { LegalProceedingDetailId } from '@module/customer/legal-proceeding/domain/schema/entity/legal-proceeding-detail/value-object/analysis-tool-client-legal-proceeding-detail-id/legal-proceeding-detail-id.value-object';

@Injectable()
export class LegalProceedingDetailEntityAutoMapperProfile {
  protected readonly _type = LegalProceedingDetailEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalProceedingDetailTypeormEntity,
    ): LegalProceedingDetailEntity => {
      if (!source.analysisToolClientLegalProceeding) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: LegalProceedingDetailEntity.name,
          sourceClass: LegalProceedingDetailTypeormEntity.name,
        });
      }
      return new LegalProceedingDetailEntity({
        ...source,
        id: new LegalProceedingDetailId(source.id),
        analysisToolClientLegalProceeding:
          new AnalysisToolClientLegalProceedingId(
            source.analysisToolClientLegalProceeding.id,
          ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalProceedingDetailTypeormEntity,
      LegalProceedingDetailEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: LegalProceedingDetailEntity,
    ): LegalProceedingDetailTypeormEntity => {
      const analysisToolClientLegalProceeding = {
        id: source.analysisToolClientLegalProceeding.toString(),
      } as AnalysisToolClientLegalProceedingTypeormEntity;

      return LegalProceedingDetailTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClientLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      LegalProceedingDetailEntity,
      LegalProceedingDetailTypeormEntity,
      mappingFunction,
    );
  }
}
