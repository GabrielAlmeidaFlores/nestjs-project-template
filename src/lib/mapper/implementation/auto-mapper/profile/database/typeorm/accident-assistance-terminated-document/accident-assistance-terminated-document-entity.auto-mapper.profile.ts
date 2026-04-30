import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-document.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentAssistanceTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/accident-assistance-terminated-document.entity';
import { AccidentAssistanceTerminatedDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-document/value-object/accident-assistance-terminated-document-id/accident-assistance-terminated-document-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedDocumentEntityAutoMapperProfile.name;

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
      AccidentAssistanceTerminatedDocumentTypeormEntity,
      AccidentAssistanceTerminatedDocumentEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedDocumentTypeormEntity,
        ): AccidentAssistanceTerminatedDocumentEntity => {
          if (!source.id) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: AccidentAssistanceTerminatedDocumentEntity.name,
              sourceClass:
                AccidentAssistanceTerminatedDocumentTypeormEntity.name,
            });
          }

          return new AccidentAssistanceTerminatedDocumentEntity({
            id: new AccidentAssistanceTerminatedDocumentId(source.id),
            document: source.document,
            type: source.type,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          });
        },
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      AccidentAssistanceTerminatedDocumentEntity,
      AccidentAssistanceTerminatedDocumentTypeormEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedDocumentEntity,
        ): AccidentAssistanceTerminatedDocumentTypeormEntity =>
          AccidentAssistanceTerminatedDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            accidentAssistanceTerminated: undefined,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt ?? null,
          }),
      ),
    );
  }
}
