import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingHistoryTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-history.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingHistoryEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/legal-pleading-history.entity';
import { LegalPleadingHistoryId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-history/value-object/legal-pleading-history-id/legal-pleading-history-id.value-object';

@Injectable()
export class LegalPleadingHistoryEntityAutoMapperProfile {
  protected readonly _type = LegalPleadingHistoryEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapEntityToOrmEntity();
    this.mapOrmEntityToEntity();
  }

  private mapEntityToOrmEntity(): void {
    const convertEntityToOrmEntity = (
      source: LegalPleadingHistoryEntity,
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

    createMap<LegalPleadingHistoryEntity, LegalPleadingHistoryTypeormEntity>(
      this.mapper,
      LegalPleadingHistoryEntity,
      LegalPleadingHistoryTypeormEntity,
      constructUsing(convertEntityToOrmEntity),
    );
  }

  private mapOrmEntityToEntity(): void {
    const convertOrmEntityToEntity = (
      source: LegalPleadingHistoryTypeormEntity,
    ): LegalPleadingHistoryEntity => {
      if (!source.legalPleading) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: LegalPleadingHistoryEntity.name,
          sourceClass: LegalPleadingHistoryTypeormEntity.name,
        });
      }

      return new LegalPleadingHistoryEntity({
        ...source,
        id: new LegalPleadingHistoryId(source.id),
        legalPleading: new LegalPleadingId(source.legalPleading.id),
      });
    };

    createMap<LegalPleadingHistoryTypeormEntity, LegalPleadingHistoryEntity>(
      this.mapper,
      LegalPleadingHistoryTypeormEntity,
      LegalPleadingHistoryEntity,
      constructUsing(convertOrmEntityToEntity),
    );
  }
}
