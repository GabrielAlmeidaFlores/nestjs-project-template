import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/accident-assistance-terminated-result.entity';
import { AccidentAssistanceTerminatedResultId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-result/value-object/accident-assistance-terminated-result-id/accident-assistance-terminated-result-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedResultEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      AccidentAssistanceTerminatedResultTypeormEntity,
      AccidentAssistanceTerminatedResultEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedResultTypeormEntity,
        ): AccidentAssistanceTerminatedResultEntity =>
          new AccidentAssistanceTerminatedResultEntity({
            id: new AccidentAssistanceTerminatedResultId(source.id),
            firstAnalysis: source.firstAnalysis,
            decisionDetails: source.decisionDetails,
            accidentAssistanceTerminatedCompleteAnalysis:
              source.accidentAssistanceTerminatedCompleteAnalysis,
            accidentAssistanceTerminatedSimplifiedAnalysis:
              source.accidentAssistanceTerminatedSimplifiedAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      AccidentAssistanceTerminatedResultEntity,
      AccidentAssistanceTerminatedResultTypeormEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedResultEntity,
        ): AccidentAssistanceTerminatedResultTypeormEntity =>
          AccidentAssistanceTerminatedResultTypeormEntity.build({
            id: source.id.toString(),
            firstAnalysis: source.firstAnalysis,
            decisionDetails: source.decisionDetails,
            accidentAssistanceTerminatedCompleteAnalysis:
              source.accidentAssistanceTerminatedCompleteAnalysis,
            accidentAssistanceTerminatedSimplifiedAnalysis:
              source.accidentAssistanceTerminatedSimplifiedAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
