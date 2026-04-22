import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { PersonalDocument } from '@core/domain/schema/value-object/personal-document/personal-document.value-object';
import { DeathBenefitRejectionLegalRepresentativeTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection-legal-representative.typeorm.entity';
import { DeathBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { DeathBenefitRejectionId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection/value-object/death-benefit-rejection-id.value-object';
import { DeathBenefitRejectionLegalRepresentativeEntity } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/death-benefit-rejection-legal-representative.entity';
import { DeathBenefitRejectionLegalRepresentativeId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-legal-representative/value-object/death-benefit-rejection-legal-representative-id.value-object';

@Injectable()
export class DeathBenefitRejectionLegalRepresentativeEntityAutoMapperProfile {
  protected readonly _type =
    DeathBenefitRejectionLegalRepresentativeEntityAutoMapperProfile.name;

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
      DeathBenefitRejectionLegalRepresentativeTypeormEntity,
      DeathBenefitRejectionLegalRepresentativeEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionLegalRepresentativeTypeormEntity,
        ): DeathBenefitRejectionLegalRepresentativeEntity => {
          if (!source.deathBenefitRejection) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                DeathBenefitRejectionLegalRepresentativeEntity.name,
              sourceClass:
                DeathBenefitRejectionLegalRepresentativeTypeormEntity.name,
            });
          }

          return new DeathBenefitRejectionLegalRepresentativeEntity({
            id: new DeathBenefitRejectionLegalRepresentativeId(source.id),
            name: source.name,
            cpf: source.cpf !== null ? new PersonalDocument(source.cpf) : null,
            birthDate: source.birthDate,
            legalRepresentativeRelationship:
              source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
      DeathBenefitRejectionLegalRepresentativeEntity,
      DeathBenefitRejectionLegalRepresentativeTypeormEntity,
      constructUsing(
        (
          source: DeathBenefitRejectionLegalRepresentativeEntity,
        ): DeathBenefitRejectionLegalRepresentativeTypeormEntity =>
          DeathBenefitRejectionLegalRepresentativeTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            cpf: source.cpf?.toString() ?? null,
            birthDate: source.birthDate,
            legalRepresentativeRelationship:
              source.legalRepresentativeRelationship,
            isMinorUnderGuardianship: source.isMinorUnderGuardianship,
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
