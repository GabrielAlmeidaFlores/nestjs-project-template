import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { GetAccidentAssistanceGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/repository/accident-assistance-grant/query/result/get-accident-assistance-grant-with-relations.query.result';
import { AccidentAssistanceGrantEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/accident-assistance-grant.entity';
import { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import { AccidentAssistanceGrantDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/value-object/accident-assistance-grant-document-id.value-object';
import { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';

@Injectable()
export class GetAccidentAssistanceGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetAccidentAssistanceGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convert = (
      source: AccidentAssistanceGrantTypeormEntity,
    ): GetAccidentAssistanceGrantWithRelationsQueryResult => {
      const analysisEntity = this.mapper.map(
        source,
        AccidentAssistanceGrantTypeormEntity,
        AccidentAssistanceGrantEntity,
      );

      const accidentAssistanceGrantResult =
        source.accidentAssistanceGrantResult !== null &&
        source.accidentAssistanceGrantResult !== undefined
          ? this.mapper.map(
              source.accidentAssistanceGrantResult,
              AccidentAssistanceGrantResultTypeormEntity,
              AccidentAssistanceGrantResultEntity,
            )
          : null;

      const accidentAssistanceGrantDocument = (
        source.accidentAssistanceGrantDocument ?? []
      ).map(
        (item) =>
          new AccidentAssistanceGrantDocumentEntity({
            id: new AccidentAssistanceGrantDocumentId(item.id),
            document: item.fileName,
            type: item.type,
            accidentAssistanceGrantId: analysisEntity.id,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
            deletedAt: item.deletedAt,
          }),
      );

      return GetAccidentAssistanceGrantWithRelationsQueryResult.build({
        accidentAssistanceGrantId: analysisEntity.id,
        analysisToolClientId: analysisEntity.analysisToolClientId,
        analysisName: analysisEntity.analysisName,
        category: analysisEntity.category,
        accidentDate: analysisEntity.accidentDate,
        hadPreviousTemporaryDisabilityAssistance:
          analysisEntity.hadPreviousTemporaryDisabilityAssistance,
        sequelDescription: analysisEntity.sequelDescription,
        associatedCidId: analysisEntity.associatedCidId,
        accidentAssistanceGrantResult,
        accidentAssistanceGrantDocument,
        createdAt: analysisEntity.createdAt,
        updatedAt: analysisEntity.updatedAt,
        deletedAt: analysisEntity.deletedAt,
      } as GetAccidentAssistanceGrantWithRelationsQueryResult);
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantTypeormEntity,
      GetAccidentAssistanceGrantWithRelationsQueryResult,
      constructUsing(convert),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convert = (
      _source: GetAccidentAssistanceGrantWithRelationsQueryResult,
    ): AccidentAssistanceGrantTypeormEntity => {
      throw new Error(
        'Reverse mapping from query result to ORM entity is not supported.',
      );
    };

    createMap(
      this.mapper,
      GetAccidentAssistanceGrantWithRelationsQueryResult,
      AccidentAssistanceGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
