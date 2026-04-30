import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceTerminatedBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-terminated-benefit.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentAssistanceTerminatedBenefitEntity } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/accident-assistance-terminated-benefit.entity';
import { AccidentAssistanceTerminatedBenefitId } from '@module/customer/analysis-tool/module/accident-assistance-terminated/domain/schema/entity/accident-assistance-terminated-benefit/value-object/accident-assistance-terminated-benefit-id/accident-assistance-terminated-benefit-id.value-object';

@Injectable()
export class AccidentAssistanceTerminatedBenefitEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceTerminatedBenefitEntityAutoMapperProfile.name;

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
      AccidentAssistanceTerminatedBenefitTypeormEntity,
      AccidentAssistanceTerminatedBenefitEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedBenefitTypeormEntity,
        ): AccidentAssistanceTerminatedBenefitEntity => {
          if (!source.id) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: AccidentAssistanceTerminatedBenefitEntity.name,
              sourceClass:
                AccidentAssistanceTerminatedBenefitTypeormEntity.name,
            });
          }

          return new AccidentAssistanceTerminatedBenefitEntity({
            id: new AccidentAssistanceTerminatedBenefitId(source.id),
            inssBenefitNumber: source.inssBenefitNumber,
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
      AccidentAssistanceTerminatedBenefitEntity,
      AccidentAssistanceTerminatedBenefitTypeormEntity,
      constructUsing(
        (
          source: AccidentAssistanceTerminatedBenefitEntity,
        ): AccidentAssistanceTerminatedBenefitTypeormEntity =>
          AccidentAssistanceTerminatedBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefitNumber: source.inssBenefitNumber,
            accidentAssistanceTerminated: undefined,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt ?? null,
          }),
      ),
    );
  }
}
