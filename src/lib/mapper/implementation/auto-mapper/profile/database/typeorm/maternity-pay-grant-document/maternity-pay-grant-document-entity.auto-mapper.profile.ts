import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-document.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/maternity-pay-grant-document.entity';
import { MaternityPayGrantDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-document/value-object/maternity-pay-grant-document-id.value-object';

@Injectable()
export class MaternityPayGrantDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantDocumentEntityAutoMapperProfile.name;

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
      MaternityPayGrantDocumentTypeormEntity,
      MaternityPayGrantDocumentEntity,
      constructUsing(
        (
          source: MaternityPayGrantDocumentTypeormEntity,
        ): MaternityPayGrantDocumentEntity => {
          if (!source.maternityPayGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantDocumentEntity.name,
              sourceClass: MaternityPayGrantDocumentTypeormEntity.name,
            });
          }

          return new MaternityPayGrantDocumentEntity({
            id: new MaternityPayGrantDocumentId(source.id),
            document: source.document,
            type: source.type,
            maternityPayGrantId: new MaternityPayGrantId(
              source.maternityPayGrant.id,
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
      MaternityPayGrantDocumentEntity,
      MaternityPayGrantDocumentTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantDocumentEntity,
        ): MaternityPayGrantDocumentTypeormEntity =>
          MaternityPayGrantDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            type: source.type,
            maternityPayGrant: MaternityPayGrantTypeormEntity.build({
              id: source.maternityPayGrantId.toString(),
            } as MaternityPayGrantTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
