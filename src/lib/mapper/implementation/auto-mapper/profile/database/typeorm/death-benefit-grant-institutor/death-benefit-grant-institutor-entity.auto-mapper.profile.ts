import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-institutor.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/death-benefit-grant-institutor.entity';
import { DeathBenefitGrantInstitorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-institutor/value-object/death-benefit-grant-institutor-id.value-object';

@Injectable()
export class DeathBenefitGrantInstitorEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantInstitorEntityAutoMapperProfile.name;

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
      DeathBenefitGrantInstitorTypeormEntity,
      DeathBenefitGrantInstitorEntity,
      constructUsing(
        (
          source: DeathBenefitGrantInstitorTypeormEntity,
        ): DeathBenefitGrantInstitorEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantInstitorEntity.name,
              sourceClass: DeathBenefitGrantInstitorTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantInstitorEntity({
            id: new DeathBenefitGrantInstitorId(source.id),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            sex: source.sex,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
            deathBenefitGrantId: new DeathBenefitGrantId(
              source.deathBenefitGrant.id,
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
      DeathBenefitGrantInstitorEntity,
      DeathBenefitGrantInstitorTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantInstitorEntity,
        ): DeathBenefitGrantInstitorTypeormEntity =>
          DeathBenefitGrantInstitorTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            sex: source.sex,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
            deathBenefitGrant: DeathBenefitGrantTypeormEntity.build({
              id: source.deathBenefitGrantId.toString(),
            } as DeathBenefitGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
