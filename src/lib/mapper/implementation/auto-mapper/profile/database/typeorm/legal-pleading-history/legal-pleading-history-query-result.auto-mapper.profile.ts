import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetLegalPleadingHistoryQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/result/get-legal-pleading-history.query.result';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingHistoryId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

@Injectable()
export class LegalPleadingHistoryQueryResultAutoMapperProfile {
  protected readonly _type =
    LegalPleadingHistoryQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: LegalPleadingHistoryTypeormEntity,
    ): GetLegalPleadingHistoryQueryResult => {
      if (!source.legalPleading) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetLegalPleadingHistoryQueryResult.name,
          sourceClass: LegalPleadingHistoryTypeormEntity.name,
        });
      }

      return GetLegalPleadingHistoryQueryResult.build({
        ...source,
        id: new LegalPleadingHistoryId(source.id),
        legalPleading: new LegalPleadingId(source.legalPleading.id),
      });
    };

    createMap<
      LegalPleadingHistoryTypeormEntity,
      GetLegalPleadingHistoryQueryResult
    >(
      this.mapper,
      LegalPleadingHistoryTypeormEntity,
      GetLegalPleadingHistoryQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetLegalPleadingHistoryQueryResult,
    ): LegalPleadingHistoryTypeormEntity => {
      const legalPleading = {
        id: source.legalPleading.toString(),
      } as LegalPleadingTypeormEntity;

      return LegalPleadingHistoryTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        legalPleading,
      });
    };

    createMap<
      GetLegalPleadingHistoryQueryResult,
      LegalPleadingHistoryTypeormEntity
    >(
      this.mapper,
      GetLegalPleadingHistoryQueryResult,
      LegalPleadingHistoryTypeormEntity,
      constructUsing(convertQueryResultToOrmEntity),
    );
  }
}
