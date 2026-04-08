import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-inss-benefit.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitInssBenefitEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/death-benefit-inss-benefit.entity';
import { DeathBenefitInssBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-inss-benefit/value-object/death-benefit-inss-benefit-id.value-object';

@Injectable()
export class DeathBenefitInssBenefitEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitInssBenefitEntityAutoMapperProfile.name;

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
      DeathBenefitInssBenefitTypeormEntity,
      DeathBenefitInssBenefitEntity,
      constructUsing(
        (source: DeathBenefitInssBenefitTypeormEntity): DeathBenefitInssBenefitEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitInssBenefitEntity.name,
              sourceClass: DeathBenefitInssBenefitTypeormEntity.name,
            });
          }

          return new DeathBenefitInssBenefitEntity({
            id: new DeathBenefitInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
            deathBenefitId: new DeathBenefitId(source.deathBenefit.id),
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
      DeathBenefitInssBenefitEntity,
      DeathBenefitInssBenefitTypeormEntity,
      constructUsing(
        (source: DeathBenefitInssBenefitEntity): DeathBenefitInssBenefitTypeormEntity =>
          DeathBenefitInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            deathBenefit: DeathBenefitTypeormEntity.build({
              id: source.deathBenefitId.toString(),
            } as DeathBenefitTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
