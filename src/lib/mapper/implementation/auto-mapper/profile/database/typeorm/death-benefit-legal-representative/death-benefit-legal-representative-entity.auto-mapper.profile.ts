import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-legal-representative.typeorm.entity';
import { DeathBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit/value-object/death-benefit-id.value-object';
import { DeathBenefitLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/death-benefit-legal-representative.entity';
import { DeathBenefitLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-legal-representative/value-object/death-benefit-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitLegalRepresentativeEntityAutoMapperProfile {
  protected readonly _type = DeathBenefitLegalRepresentativeEntityAutoMapperProfile.name;

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
      DeathBenefitLegalRepresentativeTypeormEntity,
      DeathBenefitLegalRepresentativeEntity,
      constructUsing(
        (source: DeathBenefitLegalRepresentativeTypeormEntity): DeathBenefitLegalRepresentativeEntity => {
          if (!source.deathBenefit) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitLegalRepresentativeEntity.name,
              sourceClass: DeathBenefitLegalRepresentativeTypeormEntity.name,
            });
          }

          return new DeathBenefitLegalRepresentativeEntity({
            id: new DeathBenefitLegalRepresentativeId(source.id),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            legalRepresentativeRelationship: source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
      DeathBenefitLegalRepresentativeEntity,
      DeathBenefitLegalRepresentativeTypeormEntity,
      constructUsing(
        (source: DeathBenefitLegalRepresentativeEntity): DeathBenefitLegalRepresentativeTypeormEntity =>
          DeathBenefitLegalRepresentativeTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            legalRepresentativeRelationship: source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
