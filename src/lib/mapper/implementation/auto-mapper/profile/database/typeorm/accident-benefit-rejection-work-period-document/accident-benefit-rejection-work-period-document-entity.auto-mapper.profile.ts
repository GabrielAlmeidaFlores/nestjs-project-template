import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period-document.typeorm.entity';
import { AccidentBenefitRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period/value-object/accident-benefit-rejection-work-period-id.value-object';
import { AccidentBenefitRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/accident-benefit-rejection-work-period-document.entity';
import { AccidentBenefitRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-work-period-document/value-object/accident-benefit-rejection-work-period-document-id.value-object';

@Injectable()
export class AccidentBenefitRejectionWorkPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionWorkPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
    ): AccidentBenefitRejectionWorkPeriodDocumentEntity => {
      if (!source.accidentBenefitRejectionWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            AccidentBenefitRejectionWorkPeriodDocumentEntity.name,
          sourceClass:
            AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionWorkPeriodDocumentEntity({
        id: new AccidentBenefitRejectionWorkPeriodDocumentId(source.id),
        document: source.fileName,
        type: source.type,
        accidentBenefitRejectionWorkPeriodId:
          new AccidentBenefitRejectionWorkPeriodId(
            source.accidentBenefitRejectionWorkPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
      AccidentBenefitRejectionWorkPeriodDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionWorkPeriodDocumentEntity,
    ): AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity => {
      const accidentBenefitRejectionWorkPeriod =
        source.accidentBenefitRejectionWorkPeriodId !== null
          ? ({
              id: source.accidentBenefitRejectionWorkPeriodId.toString(),
            } as AccidentBenefitRejectionWorkPeriodTypeormEntity)
          : null;

      return AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        fileName: source.document,
        type: source.type,
        accidentBenefitRejectionWorkPeriod,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionWorkPeriodDocumentEntity,
      AccidentBenefitRejectionWorkPeriodDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
