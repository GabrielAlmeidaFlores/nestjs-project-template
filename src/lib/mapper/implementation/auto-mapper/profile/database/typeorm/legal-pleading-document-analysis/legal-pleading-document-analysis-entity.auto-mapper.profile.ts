import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';
import { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';

@Injectable()
export class LegalPleadingDocumentAnalysisEntityAutoMapperProfile {
  protected readonly _type =
    LegalPleadingDocumentAnalysisEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingDocumentAnalysisTypeormEntity,
    ): LegalPleadingDocumentAnalysisEntity => {
      return new LegalPleadingDocumentAnalysisEntity({
        ...source,
        id: new LegalPleadingDocumentAnalysisId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentAnalysisTypeormEntity,
      LegalPleadingDocumentAnalysisEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: LegalPleadingDocumentAnalysisEntity,
    ): LegalPleadingDocumentAnalysisTypeormEntity => {
      return LegalPleadingDocumentAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentAnalysisEntity,
      LegalPleadingDocumentAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
