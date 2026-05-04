import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-inss-benefit.typeorm.entity';
import { MaternityPayRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MaternityPayRejectionId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection/value-object/maternity-pay-rejection-id.value-object';
import { MaternityPayRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/maternity-pay-rejection-inss-benefit.entity';
import { MaternityPayRejectionInssBenefitId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-inss-benefit/value-object/maternity-pay-rejection-inss-benefit-id.value-object';

@Injectable()
export class MaternityPayRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionInssBenefitTypeormEntity,
    ): MaternityPayRejectionInssBenefitEntity => {
      if (!source.maternityPayRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MaternityPayRejectionInssBenefitEntity.name,
          sourceClass: MaternityPayRejectionInssBenefitTypeormEntity.name,
        });
      }

      return new MaternityPayRejectionInssBenefitEntity({
        id: new MaternityPayRejectionInssBenefitId(source.id),
        inssBenefit: source.inssBenefit,
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
      MaternityPayRejectionInssBenefitTypeormEntity,
      MaternityPayRejectionInssBenefitEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionInssBenefitEntity,
    ): MaternityPayRejectionInssBenefitTypeormEntity => {
      const relationProps =
        source.maternityPayRejectionId !== null
          ? {
              maternityPayRejection: {
                id: source.maternityPayRejectionId.toString(),
              } as MaternityPayRejectionTypeormEntity,
            }
          : {};

      return MaternityPayRejectionInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefit: source.inssBenefit,
        ...relationProps,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionInssBenefitEntity,
      MaternityPayRejectionInssBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
