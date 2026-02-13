import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { LegalPleadingDocumentAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-document-analysis.typeorm.entity';
import { GetLegalPleadingDocumentAnalysisQueryResult } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-document-analysis/query/result/get-legal-pleading-document-analysis.query.result';
import { LegalPleadingDocumentAnalysisId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-document-analysis/value-object/legal-pleading-document-analysis/legal-pleading-document-analysis-id.value-object';

@Injectable()
export class GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingDocumentAnalysisQueryResultAutoMapperProfile.name;

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
    ): GetLegalPleadingDocumentAnalysisQueryResult => {
      return GetLegalPleadingDocumentAnalysisQueryResult.build({
        ...source,
        id: new LegalPleadingDocumentAnalysisId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingDocumentAnalysisTypeormEntity,
      GetLegalPleadingDocumentAnalysisQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingDocumentAnalysisQueryResult,
    ): LegalPleadingDocumentAnalysisTypeormEntity => {
      return LegalPleadingDocumentAnalysisTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        legalPleadingDocument: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingDocumentAnalysisQueryResult,
      LegalPleadingDocumentAnalysisTypeormEntity,
      mappingFunction,
    );
  }
}
