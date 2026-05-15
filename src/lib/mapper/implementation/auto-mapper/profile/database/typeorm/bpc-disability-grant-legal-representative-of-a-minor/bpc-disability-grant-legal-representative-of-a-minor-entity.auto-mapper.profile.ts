import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant-legal-representative-of-a-minor.typeorm.entity';
import { BpcDisabilityGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/bpc-disability-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { BpcDisabilityGrantId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant/value-object/bpc-disability-grant-id/bpc-disability-grant-id.value-object';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorEntity } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/bpc-disability-grant-legal-representative-of-a-minor.entity';
import { BpcDisabilityGrantLegalRepresentativeOfAMinorId } from '@module/customer/analysis-tool/module/bpc-disability-grant/domain/schema/entity/bpc-disability-grant-legal-representative-of-a-minor/value-object/bpc-disability-grant-legal-representative-of-a-minor-id/bpc-disability-grant-legal-representative-of-a-minor-id.value-object';

@Injectable()
export class BpcDisabilityGrantLegalRepresentativeOfAMinorEntityAutoMapperProfile {
  protected readonly _type =
    BpcDisabilityGrantLegalRepresentativeOfAMinorEntityAutoMapperProfile.name;

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
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
      BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
      constructUsing(
        (
          source: BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
        ): BpcDisabilityGrantLegalRepresentativeOfAMinorEntity => {
          if (!source.BpcDisabilityGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                BpcDisabilityGrantLegalRepresentativeOfAMinorEntity.name,
              sourceClass:
                BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity.name,
            });
          }

          return new BpcDisabilityGrantLegalRepresentativeOfAMinorEntity({
            id: new BpcDisabilityGrantLegalRepresentativeOfAMinorId(source.id),
            name: source.name,
            federalDocument:
              source.federalDocument !== null
                ? new FederalDocument(source.federalDocument)
                : null,
            birthDate: source.birthDate,
            minorUnderCustody: source.minorUnderCustody,
            kinship: source.kinship,
            BpcDisabilityGrantId: new BpcDisabilityGrantId(
              source.BpcDisabilityGrant.id,
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
      BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
      BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity,
      constructUsing(
        (
          source: BpcDisabilityGrantLegalRepresentativeOfAMinorEntity,
        ): BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity =>
          BpcDisabilityGrantLegalRepresentativeOfAMinorTypeormEntity.build({
            id: source.id.toString(),
            name: source.name,
            federalDocument: source.federalDocument?.toString() ?? null,
            birthDate: source.birthDate,
            minorUnderCustody: source.minorUnderCustody,
            kinship: source.kinship,
            BpcDisabilityGrant: BpcDisabilityGrantTypeormEntity.build({
              id: source.BpcDisabilityGrantId.toString(),
            } as BpcDisabilityGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}