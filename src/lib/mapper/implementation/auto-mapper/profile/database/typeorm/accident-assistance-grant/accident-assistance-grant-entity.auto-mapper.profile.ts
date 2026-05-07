import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';

@Injectable()
export class AccidentAssistanceGrantEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantTypeormEntity,
    ): AccidentAssistanceGrantEntity => {
      const resultId =
        source.accidentAssistanceGrantResult !== null &&
        source.accidentAssistanceGrantResult !== undefined
          ? new AccidentAssistanceGrantResultId(
              source.accidentAssistanceGrantResult.id,
            )
          : null;

      return new AccidentAssistanceGrantEntity({
        id: new AccidentAssistanceGrantId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolClientId,
        ),
        analysisName: source.analysisName,
        category: source.category,
        accidentDate: source.accidentDate,
        hadPreviousTemporaryDisabilityAssistance:
          source.hadPreviousTemporaryDisabilityAssistance,
        sequelDescription: source.sequelDescription,
        associatedCidId: source.associatedCidId,
        accidentAssistanceGrantResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantTypeormEntity,
      AccidentAssistanceGrantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantEntity,
    ): AccidentAssistanceGrantTypeormEntity => {
      const accidentAssistanceGrantResult =
        source.accidentAssistanceGrantResultId !== null
          ? AccidentAssistanceGrantResultTypeormEntity.build({
              id: source.accidentAssistanceGrantResultId.toString(),
            } as AccidentAssistanceGrantResultTypeormEntity)
          : undefined;

      return AccidentAssistanceGrantTypeormEntity.build({
        id: source.id.toString(),
        analysisToolClientId: source.analysisToolClientId.toString(),
        analysisName: source.analysisName,
        category: source.category,
        accidentDate: source.accidentDate,
        hadPreviousTemporaryDisabilityAssistance:
          source.hadPreviousTemporaryDisabilityAssistance,
        sequelDescription: source.sequelDescription,
        associatedCidId: source.associatedCidId,
        accidentAssistanceGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantEntity,
      AccidentAssistanceGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
