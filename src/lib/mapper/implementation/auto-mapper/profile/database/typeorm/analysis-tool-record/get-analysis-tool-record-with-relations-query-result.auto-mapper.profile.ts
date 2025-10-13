import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { CnisFastAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis.typeorm.entity';
import { LegalPleadingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading.typeorm.entity';
import { GetAnalysisToolRecordWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/result/get-analysis-tool-record.query.result';
import { GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/result/get-cnis-fast-analysis-with-responsible-and-client-relations.query.result';
import { GetLegalPleadingWithResponsibleAndClientRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/result/get-legal-pleading-with-responsible-and-client-relations.query.result';
import { AnalysisToolRecordCode } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-code/analysis-tool-record-code.value-object';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';

@Injectable()
export class GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAnalysisToolRecordWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: AnalysisToolRecordTypeormEntity,
    ): GetAnalysisToolRecordWithRelationsQueryResult => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        CnisFastAnalysisTypeormEntity,
        GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult,
      );

      const legalPleading = this.mapper.map(
        source.legalPleading,
        LegalPleadingTypeormEntity,
        GetLegalPleadingWithResponsibleAndClientRelationsQueryResult,
      );

      return GetAnalysisToolRecordWithRelationsQueryResult.build({
        ...source,
        id: new AnalysisToolRecordId(source.id),
        code: new AnalysisToolRecordCode(source.code),
        cnisFastAnalysis,
        legalPleading,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      AnalysisToolRecordTypeormEntity,
      GetAnalysisToolRecordWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetAnalysisToolRecordWithRelationsQueryResult,
    ): AnalysisToolRecordTypeormEntity => {
      const cnisFastAnalysis = this.mapper.map(
        source.cnisFastAnalysis,
        GetCnisFastAnalysisWithResponsibleAndClientRelationsQueryResult,
        CnisFastAnalysisTypeormEntity,
      );

      const legalPleading = this.mapper.map(
        source.legalPleading,
        GetLegalPleadingWithResponsibleAndClientRelationsQueryResult,
        LegalPleadingTypeormEntity,
      );

      return AnalysisToolRecordTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        code: source.code.toString(),
        cnisFastAnalysis,
        legalPleading,
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetAnalysisToolRecordWithRelationsQueryResult,
      AnalysisToolRecordTypeormEntity,
      mappingFunction,
    );
  }
}
