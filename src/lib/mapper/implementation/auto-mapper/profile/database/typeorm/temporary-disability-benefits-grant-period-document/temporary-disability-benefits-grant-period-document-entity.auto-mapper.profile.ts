import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period-document.typeorm.entity';
import { TemporaryDisabilityBenefitsGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/temporary-disability-benefits-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { TemporaryDisabilityBenefitsGrantPeriodId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period/value-object/temporary-disability-benefits-grant-period-id.value-object';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/temporary-disability-benefits-grant-period-document.entity';
import { TemporaryDisabilityBenefitsGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/temporary-disability-benefits-grant/domain/schema/entity/temporary-disability-benefits-grant-period-document/value-object/temporary-disability-benefits-grant-period-document-id.value-object';

@Injectable()
export class TemporaryDisabilityBenefitsGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    TemporaryDisabilityBenefitsGrantPeriodDocumentEntityAutoMapperProfile.name;

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
      TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
      TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
        ): TemporaryDisabilityBenefitsGrantPeriodDocumentEntity => {
          if (!source.temporaryDisabilityBenefitsGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                TemporaryDisabilityBenefitsGrantPeriodDocumentEntity.name,
              sourceClass:
                TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity.name,
            });
          }

          return new TemporaryDisabilityBenefitsGrantPeriodDocumentEntity({
            id: new TemporaryDisabilityBenefitsGrantPeriodDocumentId(source.id),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsGrantPeriodId:
              new TemporaryDisabilityBenefitsGrantPeriodId(
                source.temporaryDisabilityBenefitsGrantPeriod.id,
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
      TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
      TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: TemporaryDisabilityBenefitsGrantPeriodDocumentEntity,
        ): TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity =>
          TemporaryDisabilityBenefitsGrantPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            fileName: source.fileName,
            type: source.type,
            temporaryDisabilityBenefitsGrantPeriod:
              TemporaryDisabilityBenefitsGrantPeriodTypeormEntity.build({
                id: source.temporaryDisabilityBenefitsGrantPeriodId.toString(),
              } as TemporaryDisabilityBenefitsGrantPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
