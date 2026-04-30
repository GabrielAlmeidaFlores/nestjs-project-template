import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionWorkPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period-document.typeorm.entity';
import { MaternityPayRejectionWorkPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-work-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionWorkPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period/value-object/maternity-pay-rejection-work-period-id.value-object';
import { MaternityPayRejectionWorkPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/maternity-pay-rejection-work-period-document.entity';
import { MaternityPayRejectionWorkPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-work-period-document/value-object/maternity-pay-rejection-work-period-document-id.value-object';

@Injectable()
export class MaternityPayRejectionWorkPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionWorkPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodDocumentTypeormEntity,
    ): MaternityPayRejectionWorkPeriodDocumentEntity => {
      if (!source.maternityPayRejectionWorkPeriod) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MaternityPayRejectionWorkPeriodDocumentEntity.name,
          sourceClass:
            MaternityPayRejectionWorkPeriodDocumentTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionWorkPeriodDocumentEntity({
        id: new MaternityPayRejectionWorkPeriodDocumentId(source.id),
        document: source.document,
        type: source.type,
        maternityPayRejectionWorkPeriodId:
          new MaternityPayRejectionWorkPeriodId(
            source.maternityPayRejectionWorkPeriod.id,
          ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodDocumentTypeormEntity,
      MaternityPayRejectionWorkPeriodDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionWorkPeriodDocumentEntity,
    ): MaternityPayRejectionWorkPeriodDocumentTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionWorkPeriodId !== null
          ? {
              maternityPayRejectionWorkPeriod: {
                id: source.maternityPayRejectionWorkPeriodId.toString(),
              } as MaternityPayRejectionWorkPeriodTypeormEntity,
            }
          : {};

      return MaternityPayRejectionWorkPeriodDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionWorkPeriodDocumentEntity,
      MaternityPayRejectionWorkPeriodDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
