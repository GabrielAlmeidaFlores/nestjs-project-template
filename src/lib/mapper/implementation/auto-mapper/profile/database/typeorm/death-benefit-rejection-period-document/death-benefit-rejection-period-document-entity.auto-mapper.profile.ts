import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitRejectionPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period-document.typeorm.entity';
import { DeathBenefitRejectionPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionPeriodId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period/value-object/death-benefit-rejection-period-id.value-object';
import { DeathBenefitRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/death-benefit-rejection-period-document.entity';
import { DeathBenefitRejectionPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-period-document/value-object/death-benefit-rejection-period-document-id.value-object';

@Injectable()
export class DeathBenefitRejectionPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionPeriodDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionPeriodDocumentTypeormEntity,
      DeathBenefitRejectionPeriodDocumentEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionPeriodDocumentTypeormEntity,
        ): DeathBenefitRejectionPeriodDocumentEntity => {
          if (!source.deathBenefitRejectionPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionPeriodDocumentEntity.name,
              sourceClass:
                DeathBenefitRejectionPeriodDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionPeriodDocumentEntity({
            id: new DeathBenefitRejectionPeriodDocumentId(source.id),
            document: source.document,
            deathBenefitRejectionPeriodId: new DeathBenefitRejectionPeriodId(
              source.deathBenefitRejectionPeriod.id,
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
      DeathBenefitRejectionPeriodDocumentEntity,
      DeathBenefitRejectionPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionPeriodDocumentEntity,
        ): DeathBenefitRejectionPeriodDocumentTypeormEntity =>
          DeathBenefitRejectionPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitRejectionPeriod:
              DeathBenefitRejectionPeriodTypeormEntity.build({
                id: source.deathBenefitRejectionPeriodId.toString(),
              } as DeathBenefitRejectionPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
