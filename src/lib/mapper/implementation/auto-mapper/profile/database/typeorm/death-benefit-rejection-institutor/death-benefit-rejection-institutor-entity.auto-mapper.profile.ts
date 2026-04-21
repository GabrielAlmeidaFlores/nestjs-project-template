import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { DeathBenefitRejectionInstitorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-institutor.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionInstitorEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/death-benefit-rejection-institutor.entity';
import { DeathBenefitRejectionInstitorId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-institutor/value-object/death-benefit-rejection-institutor-id.value-object';

@Injectable()
export class DeathBenefitRejectionInstitorEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionInstitorEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionInstitorTypeormEntity,
      DeathBenefitRejectionInstitorEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionInstitorTypeormEntity,
        ): DeathBenefitRejectionInstitorEntity => {
          if (!source.deathBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitRejectionInstitorEntity.name,
              sourceClass: DeathBenefitRejectionInstitorTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionInstitorEntity({
            id: new DeathBenefitRejectionInstitorId(source.id),
            name: source.name,
            cpf: source.cpf !== null ? new PersonalDocument(source.cpf) : null,
            birthDate: source.birthDate,
            gender: source.gender,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
            isDeathDeclarantChildOrSpouse: source.isDeathDeclarantChildOrSpouse,
            deathDeclarantRelationshipDescription:
              source.deathDeclarantRelationshipDescription,
            wantsToProveWorkPeriodNotInCnis:
              source.wantsToProveWorkPeriodNotInCnis,
            wasRuralInsured: source.wasRuralInsured,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            ruralPeriodDocumentDescription:
              source.ruralPeriodDocumentDescription,
            wasUnemployedAtDeath: source.wasUnemployedAtDeath,
            wantsToProveDisabilityBeforeDeath:
              source.wantsToProveDisabilityBeforeDeath,
            wantsToProveUnemploymentByWitness:
              source.wantsToProveUnemploymentByWitness,
            deathBenefitRejectionId: new DeathBenefitRejectionId(
              source.deathBenefitRejection.id,
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
      DeathBenefitRejectionInstitorEntity,
      DeathBenefitRejectionInstitorTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionInstitorEntity,
        ): DeathBenefitRejectionInstitorTypeormEntity =>
          DeathBenefitRejectionInstitorTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf !== null ? source.cpf.toString() : null,
            birthDate: source.birthDate,
            gender: source.gender,
            deathDate: source.deathDate,
            wasRetired: source.wasRetired,
            retirementBenefitNumber: source.retirementBenefitNumber,
            isDeathDeclarantChildOrSpouse:
              source.isDeathDeclarantChildOrSpouse ?? false,
            deathDeclarantRelationshipDescription:
              source.deathDeclarantRelationshipDescription,
            wantsToProveWorkPeriodNotInCnis:
              source.wantsToProveWorkPeriodNotInCnis ?? false,
            wasRuralInsured: source.wasRuralInsured ?? false,
            ruralPeriodStartDate: source.ruralPeriodStartDate,
            ruralPeriodEndDate: source.ruralPeriodEndDate,
            ruralPeriodDocumentDescription:
              source.ruralPeriodDocumentDescription,
            wasUnemployedAtDeath: source.wasUnemployedAtDeath ?? false,
            wantsToProveDisabilityBeforeDeath:
              source.wantsToProveDisabilityBeforeDeath ?? false,
            wantsToProveUnemploymentByWitness:
              source.wantsToProveUnemploymentByWitness ?? false,
            deathBenefitRejection: DeathBenefitRejectionTypeormEntity.build({
              id: source.deathBenefitRejectionId.toString(),
            } as DeathBenefitRejectionTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
