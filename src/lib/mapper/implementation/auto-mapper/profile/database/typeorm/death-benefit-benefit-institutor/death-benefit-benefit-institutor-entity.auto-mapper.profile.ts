import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitBenefitInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-benefit-institutor.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitBenefitInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/death-benefit-benefit-institutor.entity';
import { DeathBenefitBenefitInstitorId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-benefit-institutor/value-object/death-benefit-benefit-institutor-id.value-object';

@Injectable()
export class DeathBenefitBenefitInstitorEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitBenefitInstitorEntityAutoMapperProfile.name;

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
      DeathBenefitBenefitInstitorTypeormEntity,
      DeathBenefitBenefitInstitorEntity,
      constructUsing(
        (source: DeathBenefitBenefitInstitorTypeormEntity): DeathBenefitBenefitInstitorEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitBenefitInstitorEntity.name,
              sourceClass: DeathBenefitBenefitInstitorTypeormEntity.name,
            });
          }

          return new DeathBenefitBenefitInstitorEntity({
            id: new DeathBenefitBenefitInstitorId(source.id),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            sex: source.sex,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
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
      DeathBenefitBenefitInstitorEntity,
      DeathBenefitBenefitInstitorTypeormEntity,
      constructUsing(
        (source: DeathBenefitBenefitInstitorEntity): DeathBenefitBenefitInstitorTypeormEntity =>
          DeathBenefitBenefitInstitorTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            sex: source.sex,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
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
