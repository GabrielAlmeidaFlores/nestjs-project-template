import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { CnisFastAnalysisResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cnis-fast-analysis-result.typeorm.entity';
import { CnisFastAnalysisResultEntity } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/cnis-fast-analysis-result.entity';
import { CnisFastAnalysisResultId } from '@module/customer/cnis-fast-analysis/domain/schema/entity/cnis-fast-analysis-result/value-object/cnis-fast-analysis-result-id/cnis-fast-analysis-result-id.value-object';

@Injectable()
export class CnisFastAnalysisResultEntityAutoMapperProfile {
  protected readonly _type = CnisFastAnalysisResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CnisFastAnalysisResultTypeormEntity,
    ): CnisFastAnalysisResultEntity => {
      return new CnisFastAnalysisResultEntity({
        ...source,
        id: new CnisFastAnalysisResultId(source.id),
        clientFederalDocument:
          source.clientFederalDocument !== null
            ? new FederalDocument(source.clientFederalDocument)
            : null,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CnisFastAnalysisResultTypeormEntity,
      CnisFastAnalysisResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CnisFastAnalysisResultEntity,
    ): CnisFastAnalysisResultTypeormEntity => {
      return CnisFastAnalysisResultTypeormEntity.build({
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
      CnisFastAnalysisResultEntity,
      CnisFastAnalysisResultTypeormEntity,
      mappingFunction,
    );
  }
}
