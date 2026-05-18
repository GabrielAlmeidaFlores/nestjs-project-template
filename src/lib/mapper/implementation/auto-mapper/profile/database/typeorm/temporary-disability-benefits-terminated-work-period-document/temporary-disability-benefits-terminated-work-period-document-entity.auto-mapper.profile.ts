import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-terminated-work-periods.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/temporary-disability-benefits-terminated-work-period-document.entity';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-period-document/value-object/temporary-disability-benefits-terminated-work-period-document-id.value-object';
import { TemporaryDisabilityBenefitsTerminatedWorkPeriodsId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-terminated/domain/schema/entity/temporary-disability-benefits-terminated-work-periods/value-object/temporary-disability-benefits-terminated-work-periods-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
    ): TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity => {
      if (!source.temporaryDisabilityBenefitsTerminatedWorkPeriods) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity.name,
          sourceClass:
            TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity.name,
        });
      }

      return new TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity({
        id: new TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId(
          source.id,
        ),
        document: source.fileName,
        type: source.type,
        temporaryDisabilityBenefitsTerminatedWorkPeriodsId:
          new TemporaryDisabilityBenefitsTerminatedWorkPeriodsId(
            source.temporaryDisabilityBenefitsTerminatedWorkPeriods.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
    ): TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity => {
      const temporaryDisabilityBenefitsTerminatedWorkPeriods =
        source.temporaryDisabilityBenefitsTerminatedWorkPeriodsId !== null
          ? ({
              id: source.temporaryDisabilityBenefitsTerminatedWorkPeriodsId.toString(),
            } as TemporaryDisabilityBenefitsTerminatedWorkPeriodsTypeormEntity)
          : null;

      return TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity.build(
        {
          id: source.id.toString(),
          fileName: source.document,
          type: source.type,
          temporaryDisabilityBenefitsTerminatedWorkPeriods,
          createdAt: source.createdAt,
          updatedAt: source.updatedAt,
          deletedAt: source.deletedAt,
        },
      );
    };

    createMap(
      this.mapper,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentEntity,
      TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
