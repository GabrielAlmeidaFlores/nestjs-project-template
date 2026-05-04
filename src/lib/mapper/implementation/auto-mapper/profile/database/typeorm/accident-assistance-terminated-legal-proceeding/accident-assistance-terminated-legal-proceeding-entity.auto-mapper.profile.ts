import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-legal-proceeding.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentAssistanceTerminatedLegalProceedingEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/accident-assistance-terminated-legal-proceeding.entity';
import { AccidentAssistanceTerminatedLegalProceedingId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-legal-proceeding/value-object/accident-assistance-terminated-legal-proceeding-id/accident-assistance-terminated-legal-proceeding-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedLegalProceedingEntityAutoMapperProfile.name;

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
      AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
      AccidentAssistanceTerminatedLegalProceedingEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
        ): AccidentAssistanceTerminatedLegalProceedingEntity => {
          if (!source.id) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                AccidentAssistanceTerminatedLegalProceedingEntity.name,
              sourceClass:
                AccidentAssistanceTerminatedLegalProceedingTypeormEntity.name,
            });
          }

          return new AccidentAssistanceTerminatedLegalProceedingEntity({
            id: new AccidentAssistanceTerminatedLegalProceedingId(source.id),
            legalProceedingNumber: source.legalProceedingNumber,
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
      AccidentAssistanceTerminatedLegalProceedingEntity,
      AccidentAssistanceTerminatedLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedLegalProceedingEntity,
        ): AccidentAssistanceTerminatedLegalProceedingTypeormEntity =>
          AccidentAssistanceTerminatedLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
            accidentAssistanceTerminated: undefined,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt ?? null,
          }),
      ),
    );
  }
}
