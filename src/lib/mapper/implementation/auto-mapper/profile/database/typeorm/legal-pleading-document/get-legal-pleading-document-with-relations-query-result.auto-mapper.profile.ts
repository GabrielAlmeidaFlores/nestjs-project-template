import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { LegalPleadingDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document.typeorm.entity';
import { GetLegalPleadingDocumentWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-document/query/result/get-legal-pleading-document-with-relations.query.result';
import { LegalPleadingDocumentId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document/value-object/legal-pleading-document/legal-pleading-document-id.value-object';
import { LegalPleadingDocumentAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-document-analysis/legal-pleading-document-analysis.entity';

@Injectable()
export class GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingDocumentWithRelationsQueryResultAutoMapperProfile.name;

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
    ): GetLegalPleadingDocumentWithRelationsQueryResult => {
      const legalPleadingDocumentAnalysis = this.mapper.map(
        source.legalPleadingDocumentAnalysis,
        LegalPleadingDocumentAnalysisTypeormEntity,
        LegalPleadingDocumentAnalysisEntity,
      );

      return GetLegalPleadingDocumentWithRelationsQueryResult.build({
        ...source,
        id: new LegalPleadingDocumentId(source.id),
        legalPleadingDocumentAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentTypeormEntity,
      GetLegalPleadingDocumentWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingDocumentWithRelationsQueryResult,
    ): LegalPleadingDocumentTypeormEntity => {
      const legalPleadingDocumentAnalysis = this.mapper.map(
        source.legalPleadingDocumentAnalysis,
        LegalPleadingDocumentAnalysisEntity,
        LegalPleadingDocumentAnalysisTypeormEntity,
      );

      return LegalPleadingDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        legalPleadingDocumentAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingDocumentWithRelationsQueryResult,
      LegalPleadingDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
