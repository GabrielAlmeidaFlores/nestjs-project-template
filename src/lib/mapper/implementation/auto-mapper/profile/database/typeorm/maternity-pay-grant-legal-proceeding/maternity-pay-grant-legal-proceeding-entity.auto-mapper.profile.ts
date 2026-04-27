import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-legal-proceeding.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/maternity-pay-grant-legal-proceeding.entity';
import { MaternityPayGrantLegalProceedingId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-legal-proceeding/value-object/maternity-pay-grant-legal-proceeding-id.value-object';

@Injectable()
export class MaternityPayGrantLegalProceedingEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantLegalProceedingEntityAutoMapperProfile.name;

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
      MaternityPayGrantLegalProceedingTypeormEntity,
      MaternityPayGrantLegalProceedingEntity,
      constructUsing(
        (
          source: MaternityPayGrantLegalProceedingTypeormEntity,
        ): MaternityPayGrantLegalProceedingEntity => {
          if (!source.maternityPayGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantLegalProceedingEntity.name,
              sourceClass: MaternityPayGrantLegalProceedingTypeormEntity.name,
            });
          }

          return new MaternityPayGrantLegalProceedingEntity({
            id: new MaternityPayGrantLegalProceedingId(source.id),
            legalProceedingNumber: source.legalProceedingNumber,
            maternityPayGrantId: new MaternityPayGrantId(
              source.maternityPayGrant.id,
            ),
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
      MaternityPayGrantLegalProceedingEntity,
      MaternityPayGrantLegalProceedingTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantLegalProceedingEntity,
        ): MaternityPayGrantLegalProceedingTypeormEntity =>
          MaternityPayGrantLegalProceedingTypeormEntity.build({
            id: source.id.toString(),
            legalProceedingNumber: source.legalProceedingNumber,
            maternityPayGrant: MaternityPayGrantTypeormEntity.build({
              id: source.maternityPayGrantId.toString(),
            } as MaternityPayGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
