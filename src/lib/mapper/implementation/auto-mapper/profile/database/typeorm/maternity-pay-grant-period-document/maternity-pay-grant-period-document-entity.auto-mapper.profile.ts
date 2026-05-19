import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period-document.typeorm.entity';
import { MaternityPayGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-period.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantPeriodId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period/value-object/maternity-pay-grant-period-id.value-object';
import { MaternityPayGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/maternity-pay-grant-period-document.entity';
import { MaternityPayGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-period-document/value-object/maternity-pay-grant-period-document-id.value-object';

@Injectable()
export class MaternityPayGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantPeriodDocumentEntityAutoMapperProfile.name;

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
      MaternityPayGrantPeriodDocumentTypeormEntity,
      MaternityPayGrantPeriodDocumentEntity,
      constructUsing(
        (
          source: MaternityPayGrantPeriodDocumentTypeormEntity,
        ): MaternityPayGrantPeriodDocumentEntity => {
          if (!source.maternityPayGrantPeriod) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantPeriodDocumentEntity.name,
              sourceClass: MaternityPayGrantPeriodDocumentTypeormEntity.name,
            });
          }

          return new MaternityPayGrantPeriodDocumentEntity({
            id: new MaternityPayGrantPeriodDocumentId(source.id),
            document: source.document,
            maternityPayGrantPeriodId: new MaternityPayGrantPeriodId(
              source.maternityPayGrantPeriod.id,
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
      MaternityPayGrantPeriodDocumentEntity,
      MaternityPayGrantPeriodDocumentTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantPeriodDocumentEntity,
        ): MaternityPayGrantPeriodDocumentTypeormEntity =>
          MaternityPayGrantPeriodDocumentTypeormEntity.build({
            id: source.id.toString(),
            document: source.document,
            maternityPayGrantPeriod: MaternityPayGrantPeriodTypeormEntity.build(
              {
                id: source.maternityPayGrantPeriodId.toString(),
              } as MaternityPayGrantPeriodTypeormEntity,
            ),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
