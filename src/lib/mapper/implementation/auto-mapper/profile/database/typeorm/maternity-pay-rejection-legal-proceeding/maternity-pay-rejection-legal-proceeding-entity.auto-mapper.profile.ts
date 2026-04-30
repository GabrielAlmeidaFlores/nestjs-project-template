import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-legal-proceeding.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/maternity-pay-rejection-legal-proceeding.entity';
import { MaternityPayRejectionLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-legal-proceeding/value-object/maternity-pay-rejection-legal-proceeding-id.value-object';

@Injectable()
export class MaternityPayRejectionLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionLegalProceedingEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionLegalProceedingTypeormEntity,
    ): MaternityPayRejectionLegalProceedingEntity => {
      if (!source.maternityPayRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MaternityPayRejectionLegalProceedingEntity.name,
          sourceClass: MaternityPayRejectionLegalProceedingTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionLegalProceedingEntity({
        id: new MaternityPayRejectionLegalProceedingId(source.id),
        legalProceedingNumber: source.legalProceedingNumber,
        maternityPayRejectionId: new MaternityPayRejectionId(
          source.maternityPayRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionLegalProceedingTypeormEntity,
      MaternityPayRejectionLegalProceedingEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionLegalProceedingEntity,
    ): MaternityPayRejectionLegalProceedingTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionId !== null
          ? {
              maternityPayRejection: {
                id: source.maternityPayRejectionId.toString(),
              } as MaternityPayRejectionTypeormEntity,
            }
          : {};

      return MaternityPayRejectionLegalProceedingTypeormEntity.build({
        id: source.id.toString(),
        legalProceedingNumber: source.legalProceedingNumber,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionLegalProceedingEntity,
      MaternityPayRejectionLegalProceedingTypeormEntity,
      constructUsing(convert),
    );
  }
}
