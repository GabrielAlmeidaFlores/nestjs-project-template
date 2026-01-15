import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { JudicialCaseAnalysisDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-document.typeorm.entity';
import { JudicialCaseAnalysisTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis.typeorm.entity';
import { JudicialCaseAnalysisEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/judicial-case-analysis.entity';
import { JudicialCaseAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/judicial-case-analysis-document.entity';
import { JudicialCaseAnalysisDocumentId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-document/value-object/judicial-case-analysis-document-id/judicial-case-analysis-document-id.value-object';

@Injectable()
export class JudicialCaseAnalysisDocumentEntityAutoMapperProfile {
  protected readonly _type =
    JudicialCaseAnalysisDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisDocumentTypeormEntity,
    ): JudicialCaseAnalysisDocumentEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisTypeormEntity,
        JudicialCaseAnalysisEntity,
      );

      return new JudicialCaseAnalysisDocumentEntity({
        ...source,
        id: new JudicialCaseAnalysisDocumentId(source.id),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisDocumentTypeormEntity,
      JudicialCaseAnalysisDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JudicialCaseAnalysisDocumentEntity,
    ): JudicialCaseAnalysisDocumentTypeormEntity => {
      const judicialCaseAnalysis = this.mapper.map(
        source.judicialCaseAnalysis,
        JudicialCaseAnalysisEntity,
        JudicialCaseAnalysisTypeormEntity,
      );

      return JudicialCaseAnalysisDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        judicialCaseAnalysis,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisDocumentEntity,
      JudicialCaseAnalysisDocumentTypeormEntity,
      mappingFunction,
    );
  }
}

