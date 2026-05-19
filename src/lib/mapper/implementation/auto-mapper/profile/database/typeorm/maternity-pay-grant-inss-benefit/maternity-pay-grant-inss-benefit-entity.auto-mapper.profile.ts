import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-inss-benefit.typeorm.entity';
import { MaternityPayGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayGrantId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant/value-object/maternity-pay-grant-id.value-object';
import { MaternityPayGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/maternity-pay-grant-inss-benefit.entity';
import { MaternityPayGrantInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-inss-benefit/value-object/maternity-pay-grant-inss-benefit-id.value-object';

@Injectable()
export class MaternityPayGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantInssBenefitEntityAutoMapperProfile.name;

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
      MaternityPayGrantInssBenefitTypeormEntity,
      MaternityPayGrantInssBenefitEntity,
      constructUsing(
        (
          source: MaternityPayGrantInssBenefitTypeormEntity,
        ): MaternityPayGrantInssBenefitEntity => {
          if (!source.maternityPayGrant) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass: MaternityPayGrantInssBenefitEntity.name,
              sourceClass: MaternityPayGrantInssBenefitTypeormEntity.name,
            });
          }

          return new MaternityPayGrantInssBenefitEntity({
            id: new MaternityPayGrantInssBenefitId(source.id),
            inssBenefitNumber: source.inssBenefitNumber,
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
      MaternityPayGrantInssBenefitEntity,
      MaternityPayGrantInssBenefitTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantInssBenefitEntity,
        ): MaternityPayGrantInssBenefitTypeormEntity =>
          MaternityPayGrantInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefitNumber: source.inssBenefitNumber,
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
