import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientCadastralFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-cadastral-form.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientCadastralFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/analysis-tool-client-cadastral-form.entity';
import { AnalysisToolClientCadastralFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-cadastral-form/value-object/analysis-tool-client-cadastral-form-id/analysis-tool-client-cadastral-form-id.value-object';

@Injectable()
export class AnalysisToolClientCadastralFormEntityAutoMapperProfile {
  protected readonly _type = AnalysisToolClientCadastralFormEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AnalysisToolClientCadastralFormTypeormEntity,
    ): AnalysisToolClientCadastralFormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientTypeormEntity,
        AnalysisToolClientEntity,
      );

      return new AnalysisToolClientCadastralFormEntity({
        ...source,
        id: new AnalysisToolClientCadastralFormId(source.id),
        analysisToolClient,
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientCadastralFormTypeormEntity,
      AnalysisToolClientCadastralFormEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AnalysisToolClientCadastralFormEntity,
    ): AnalysisToolClientCadastralFormTypeormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      return AnalysisToolClientCadastralFormTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient,
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientCadastralFormEntity,
      AnalysisToolClientCadastralFormTypeormEntity,
      constructUsing(convert),
    );
  }
}
