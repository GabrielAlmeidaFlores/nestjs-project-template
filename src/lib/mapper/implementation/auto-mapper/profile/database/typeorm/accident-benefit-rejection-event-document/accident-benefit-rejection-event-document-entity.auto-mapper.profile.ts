import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionEventDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event-document.typeorm.entity';
import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';
import { AccidentBenefitRejectionEventDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/accident-benefit-rejection-event-document.entity';
import { AccidentBenefitRejectionEventDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event-document/value-object/accident-benefit-rejection-event-document-id.value-object';

@Injectable()
export class AccidentBenefitRejectionEventDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionEventDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionEventDocumentTypeormEntity,
    ): AccidentBenefitRejectionEventDocumentEntity => {
      if (!source.accidentBenefitRejectionEvent) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentBenefitRejectionEventDocumentEntity.name,
          sourceClass: AccidentBenefitRejectionEventDocumentTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionEventDocumentEntity({
        id: new AccidentBenefitRejectionEventDocumentId(source.id),
        document: source.fileName,
        type: source.type,
        accidentBenefitRejectionEventId: new AccidentBenefitRejectionEventId(
          source.accidentBenefitRejectionEvent.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionEventDocumentTypeormEntity,
      AccidentBenefitRejectionEventDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionEventDocumentEntity,
    ): AccidentBenefitRejectionEventDocumentTypeormEntity => {
      const accidentBenefitRejectionEvent =
        source.accidentBenefitRejectionEventId !== null
          ? ({
              id: source.accidentBenefitRejectionEventId.toString(),
            } as AccidentBenefitRejectionEventTypeormEntity)
          : null;

      return AccidentBenefitRejectionEventDocumentTypeormEntity.build({
        id: source.id.toString(),
        fileName: source.document,
        type: source.type,
        accidentBenefitRejectionEvent,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionEventDocumentEntity,
      AccidentBenefitRejectionEventDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
