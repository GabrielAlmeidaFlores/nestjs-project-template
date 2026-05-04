import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period-document.typeorm.entity';
import { AccidentAssistanceTerminatedPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentAssistanceTerminatedPeriodId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period/value-object/accident-assistance-terminated-period-id/accident-assistance-terminated-period-id.value-object';
import { AccidentAssistanceTerminatedPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/accident-assistance-terminated-period-document.entity';
import { AccidentAssistanceTerminatedPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-period-document/value-object/accident-assistance-terminated-period-document-id/accident-assistance-terminated-period-document-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentAssistanceTerminatedPeriodDocumentTypeormEntity,
    ): AccidentAssistanceTerminatedPeriodDocumentEntity => {
      if (!source.accidentAssistanceTerminatedPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            AccidentAssistanceTerminatedPeriodDocumentEntity.name,
          sourceClass:
            AccidentAssistanceTerminatedPeriodDocumentTypeormEntity.name,
        });
      }

      return new AccidentAssistanceTerminatedPeriodDocumentEntity({
        id: new AccidentAssistanceTerminatedPeriodDocumentId(source.id),
        document: source.document,
        accidentAssistanceTerminatedPeriodId:
          new AccidentAssistanceTerminatedPeriodId(
            source.accidentAssistanceTerminatedPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedPeriodDocumentTypeormEntity,
      AccidentAssistanceTerminatedPeriodDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentAssistanceTerminatedPeriodDocumentEntity,
    ): AccidentAssistanceTerminatedPeriodDocumentTypeormEntity => {
      const accidentAssistanceTerminatedPeriod =
        source.accidentAssistanceTerminatedPeriodId !== null
          ? ({
              id: source.accidentAssistanceTerminatedPeriodId.toString(),
            } as AccidentAssistanceTerminatedPeriodTypeormEntity)
          : null;

      return AccidentAssistanceTerminatedPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        accidentAssistanceTerminatedPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceTerminatedPeriodDocumentEntity,
      AccidentAssistanceTerminatedPeriodDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
