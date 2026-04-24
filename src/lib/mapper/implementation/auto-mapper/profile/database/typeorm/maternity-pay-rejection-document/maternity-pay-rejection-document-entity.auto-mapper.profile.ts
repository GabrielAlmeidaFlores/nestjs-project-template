import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-document.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/maternity-pay-rejection-document.entity';
import { MaternityPayRejectionDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-document/value-object/maternity-pay-rejection-document-id.value-object';

@Injectable()
export class MaternityPayRejectionDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionDocumentTypeormEntity,
    ): MaternityPayRejectionDocumentEntity => {
      if (!source.maternityPayRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MaternityPayRejectionDocumentEntity.name,
          sourceClass: MaternityPayRejectionDocumentTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionDocumentEntity({
        id: new MaternityPayRejectionDocumentId(source.id),
        document: source.document,
        type: source.type,
        maternityPayRejectionId: new MaternityPayRejectionId(
          source.maternityPayRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionDocumentTypeormEntity,
      MaternityPayRejectionDocumentEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionDocumentEntity,
    ): MaternityPayRejectionDocumentTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionId !== null
          ? {
              maternityPayRejection: {
                id: source.maternityPayRejectionId.toString(),
              } as MaternityPayRejectionTypeormEntity,
            }
          : {};

      return MaternityPayRejectionDocumentTypeormEntity.build({
        id: source.id.toString(),
        document: source.document,
        type: source.type,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionDocumentEntity,
      MaternityPayRejectionDocumentTypeormEntity,
      constructUsing(convert),
    );
  }
}
