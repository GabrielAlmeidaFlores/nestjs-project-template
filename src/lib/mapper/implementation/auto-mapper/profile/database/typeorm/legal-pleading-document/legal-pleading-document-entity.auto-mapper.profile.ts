import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { LegalPleadingEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/legal-pleading.entity';
import { LegalPleadingDocumentEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/legal-pleading-document.entity';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

@Injectable()
export class LegalPleadingDocumentEntityAutoMapperProfile {
  protected readonly _type = LegalPleadingDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingDocumentTypeormEntity,
    ): LegalPleadingDocumentEntity => {
      const legalPleading = this.mapper.map(
        source.legalPleading,
        LegalPleadingTypeormEntity,
        LegalPleadingEntity,
      );

      const legalPleadingDocumentAnalysis = this.mapper.map(
        source.legalPleadingDocumentAnalysis,
        LegalPleadingDocumentAnalysisTypeormEntity,
        LegalPleadingDocumentAnalysisEntity,
      );

      return new LegalPleadingDocumentEntity({
        ...source,
        id: new LegalPleadingDocumentId(source.id),
        legalPleading,
        legalPleadingDocumentAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentTypeormEntity,
      LegalPleadingDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: LegalPleadingDocumentEntity,
    ): LegalPleadingDocumentTypeormEntity => {
      const legalPleading = this.mapper.map(
        source.legalPleading,
        LegalPleadingEntity,
        LegalPleadingTypeormEntity,
      );

      const legalPleadingDocumentAnalysis = this.mapper.map(
        source.legalPleadingDocumentAnalysis,
        LegalPleadingDocumentAnalysisEntity,
        LegalPleadingDocumentAnalysisTypeormEntity,
      );

      return LegalPleadingDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        legalPleading,
        legalPleadingDocumentAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentEntity,
      LegalPleadingDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
