import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period-document.typeorm.entity';
import { DeathBenefitPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitPeriodId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period/value-object/death-benefit-period-id.value-object';
import { DeathBenefitPeriodDocumentEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/death-benefit-period-document.entity';
import { DeathBenefitPeriodDocumentId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-period-document/value-object/death-benefit-period-document-id.value-object';

@Injectable()
export class DeathBenefitPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitPeriodDocumentEntityAutoMapperProfile.name;

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
      DeathBenefitPeriodDocumentTypeormEntity,
      DeathBenefitPeriodDocumentEntity,
      constructUsing(
        (source: DeathBenefitPeriodDocumentTypeormEntity): DeathBenefitPeriodDocumentEntity => {
          if (!source.deathBenefitPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitPeriodDocumentEntity.name,
              sourceClass: DeathBenefitPeriodDocumentTypeormEntity.name,
            });
          }

          return new DeathBenefitPeriodDocumentEntity({
            id: new DeathBenefitPeriodDocumentId(source.id),
            document: source.document,
            deathBenefitPeriodId: new DeathBenefitPeriodId(source.deathBenefitPeriod.id),
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
      DeathBenefitPeriodDocumentEntity,
      DeathBenefitPeriodDocumentTypeormEntity,
      constructUsing(
        (source: DeathBenefitPeriodDocumentEntity): DeathBenefitPeriodDocumentTypeormEntity =>
          DeathBenefitPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            deathBenefitPeriod: DeathBenefitPeriodTypeormEntity.build({
              id: source.deathBenefitPeriodId.toString(),
            } as DeathBenefitPeriodTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
