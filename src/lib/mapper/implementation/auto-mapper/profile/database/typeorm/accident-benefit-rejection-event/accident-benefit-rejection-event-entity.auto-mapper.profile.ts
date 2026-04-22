import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionEventTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-event.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { CidTenTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/cid-ten.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { CidTenId } from '@module/customer/analysis-tool/domain/schema/entity/cid-ten/value-object/cid-ten-id.value-object';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionEventEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/accident-benefit-rejection-event.entity';
import { AccidentBenefitRejectionEventId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-event/value-object/accident-benefit-rejection-event-id.value-object';

@Injectable()
export class AccidentBenefitRejectionEventEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionEventEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionEventTypeormEntity,
    ): AccidentBenefitRejectionEventEntity => {
      if (!source.accidentBenefitRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentBenefitRejectionEventEntity.name,
          sourceClass: AccidentBenefitRejectionEventTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionEventEntity({
        id: new AccidentBenefitRejectionEventId(source.id),
        accidentDate: source.accidentDate,
        accidentDescription: source.accidentDescription,
        cidTenId: source.cidTen?.id ? new CidTenId(source.cidTen.id) : null,
        accidentBenefitRejectionId: new AccidentBenefitRejectionId(
          source.accidentBenefitRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionEventTypeormEntity,
      AccidentBenefitRejectionEventEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionEventEntity,
    ): AccidentBenefitRejectionEventTypeormEntity => {
      const accidentBenefitRejection =
        source.accidentBenefitRejectionId !== null
          ? ({
              id: source.accidentBenefitRejectionId.toString(),
            } as AccidentBenefitRejectionTypeormEntity)
          : null;

      const cidTen =
        source.cidTenId !== null
          ? ({ id: source.cidTenId.toString() } as CidTenTypeormEntity)
          : null;

      return AccidentBenefitRejectionEventTypeormEntity.build({
        id: source.id.toString(),
        accidentDate: source.accidentDate,
        accidentDescription: source.accidentDescription,
        cidTen,
        accidentBenefitRejection,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionEventEntity,
      AccidentBenefitRejectionEventTypeormEntity,
      constructUsing(convert),
    );
  }
}
