import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolClientInterviewFormTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client-interview-form.typeorm.entity';
import { AnalysisToolClientTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-client.typeorm.entity';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientInterviewFormEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/analysis-tool-client-interview-form.entity';
import { AnalysisToolClientInterviewFormId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-interview-form/value-object/analysis-tool-client-interview-form-id/analysis-tool-client-interview-form-id.value-object';

@Injectable()
export class AnalysisToolClientInterviewFormEntityAutoMapperProfile {
  protected readonly _type = AnalysisToolClientInterviewFormEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AnalysisToolClientInterviewFormTypeormEntity,
    ): AnalysisToolClientInterviewFormEntity => {
      const analysisToolClient = source.analysisToolClient
        ? this.mapper.map(
            source.analysisToolClient,
            AnalysisToolClientTypeormEntity,
            AnalysisToolClientEntity,
          )
        : undefined;

      return new AnalysisToolClientInterviewFormEntity({
        ...source,
        id: new AnalysisToolClientInterviewFormId(source.id),
        analysisToolClient: analysisToolClient as AnalysisToolClientEntity,
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientInterviewFormTypeormEntity,
      AnalysisToolClientInterviewFormEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AnalysisToolClientInterviewFormEntity,
    ): AnalysisToolClientInterviewFormTypeormEntity => {
      const analysisToolClient = this.mapper.map(
        source.analysisToolClient,
        AnalysisToolClientEntity,
        AnalysisToolClientTypeormEntity,
      );

      return AnalysisToolClientInterviewFormTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        analysisToolClient,
      });
    };

    createMap(
      this.mapper,
      AnalysisToolClientInterviewFormEntity,
      AnalysisToolClientInterviewFormTypeormEntity,
      constructUsing(convert),
    );
  }
}
