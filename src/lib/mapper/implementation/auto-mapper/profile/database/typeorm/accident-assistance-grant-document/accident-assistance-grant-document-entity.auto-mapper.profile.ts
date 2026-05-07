import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.typeorm.entity';
import { AccidentAssistanceGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant/accident-assistance-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentAssistanceGrantId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant/value-object/accident-assistance-grant-id.value-object';
import { AccidentAssistanceGrantDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/accident-assistance-grant-document.entity';
import { AccidentAssistanceGrantDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-document/value-object/accident-assistance-grant-document-id.value-object';

@Injectable()
export class AccidentAssistanceGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceGrantDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantDocumentTypeormEntity,
    ): AccidentAssistanceGrantDocumentEntity => {
      if (!source.accidentAssistanceGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentAssistanceGrantDocumentEntity.name,
          sourceClass: AccidentAssistanceGrantDocumentTypeormEntity.name,
        });
      }

      return new AccidentAssistanceGrantDocumentEntity({
        id: new AccidentAssistanceGrantDocumentId(source.id),
        document: source.fileName,
        type: source.type,
        accidentAssistanceGrantId: new AccidentAssistanceGrantId(
          source.accidentAssistanceGrant.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantDocumentTypeormEntity,
      AccidentAssistanceGrantDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantDocumentEntity,
    ): AccidentAssistanceGrantDocumentTypeormEntity => {
      const accidentAssistanceGrant =
        source.accidentAssistanceGrantId !== null
          ? ({
              id: source.accidentAssistanceGrantId.toString(),
            } as AccidentAssistanceGrantTypeormEntity)
          : null;

      return AccidentAssistanceGrantDocumentTypeormEntity.build({
        id: source.id.toString(),
        fileName: source.document,
        type: source.type,
        accidentAssistanceGrant,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantDocumentEntity,
      AccidentAssistanceGrantDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
