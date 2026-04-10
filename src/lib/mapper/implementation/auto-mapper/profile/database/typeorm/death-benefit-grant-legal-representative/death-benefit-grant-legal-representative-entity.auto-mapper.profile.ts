import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-legal-representative.typeorm.entity';
import { DeathBenefitGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitGrantId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant/value-object/death-benefit-grant-id.value-object';
import { DeathBenefitGrantLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/death-benefit-grant-legal-representative.entity';
import { DeathBenefitGrantLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-legal-representative/value-object/death-benefit-grant-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitGrantLegalRepresentativeEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitGrantLegalRepresentativeEntityAutoMapperProfile.name;

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
      DeathBenefitGrantLegalRepresentativeTypeormEntity,
      DeathBenefitGrantLegalRepresentativeEntity,
      constructUsing(
        (
          source: DeathBenefitGrantLegalRepresentativeTypeormEntity,
        ): DeathBenefitGrantLegalRepresentativeEntity => {
          if (!source.deathBenefitGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: DeathBenefitGrantLegalRepresentativeEntity.name,
              sourceClass:
                DeathBenefitGrantLegalRepresentativeTypeormEntity.name,
            });
          }

          return new DeathBenefitGrantLegalRepresentativeEntity({
            id: new DeathBenefitGrantLegalRepresentativeId(source.id),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            legalRepresentativeRelationship:
              source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
      DeathBenefitGrantLegalRepresentativeEntity,
      DeathBenefitGrantLegalRepresentativeTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitGrantLegalRepresentativeEntity,
        ): DeathBenefitGrantLegalRepresentativeTypeormEntity =>
          DeathBenefitGrantLegalRepresentativeTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf,
            birthDate: source.birthDate,
            legalRepresentativeRelationship:
              source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
