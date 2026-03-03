import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { JudicialCaseAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/judicial-case-analysis-result.typeorm.entity';
import { JudicialCaseAnalysisResultEntity } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/judicial-case-analysis-result.entity';
import { JudicialCaseAnalysisResultId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis-result/value-object/judicial-case-analysis-result-id/judicial-case-analysis-result-id.value-object';

@Injectable()
export class JudicialCaseAnalysisResultEntityAutoMapperProfile {
  protected readonly _type =
    JudicialCaseAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: JudicialCaseAnalysisResultTypeormEntity,
    ): JudicialCaseAnalysisResultEntity => {
      return new JudicialCaseAnalysisResultEntity({
        ...source,
        id: new JudicialCaseAnalysisResultId(source.id),
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisResultTypeormEntity,
      JudicialCaseAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: JudicialCaseAnalysisResultEntity,
    ): JudicialCaseAnalysisResultTypeormEntity => {
      return JudicialCaseAnalysisResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? source.clientFederalDocument.toString()
            : null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      JudicialCaseAnalysisResultEntity,
      JudicialCaseAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
