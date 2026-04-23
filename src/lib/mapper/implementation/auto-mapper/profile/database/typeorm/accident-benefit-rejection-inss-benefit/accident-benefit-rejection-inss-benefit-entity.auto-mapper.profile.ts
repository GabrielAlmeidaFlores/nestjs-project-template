import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentBenefitRejectionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection-inss-benefit.typeorm.entity';
import { AccidentBenefitRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-benefit-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AccidentBenefitRejectionId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection/value-object/accident-benefit-rejection-id.value-object';
import { AccidentBenefitRejectionInssBenefitEntity } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/accident-benefit-rejection-inss-benefit.entity';
import { AccidentBenefitRejectionInssBenefitId } from '@module/customer/analysis-tool/module/accident-benefit-rejection/domain/schema/entity/accident-benefit-rejection-inss-benefit/value-object/accident-benefit-rejection-inss-benefit-id.value-object';

@Injectable()
export class AccidentBenefitRejectionInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    AccidentBenefitRejectionInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionInssBenefitTypeormEntity,
    ): AccidentBenefitRejectionInssBenefitEntity => {
      if (!source.accidentBenefitRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: AccidentBenefitRejectionInssBenefitEntity.name,
          sourceClass: AccidentBenefitRejectionInssBenefitTypeormEntity.name,
        });
      }

      return new AccidentBenefitRejectionInssBenefitEntity({
        id: new AccidentBenefitRejectionInssBenefitId(source.id),
        inssBenefit: source.inssBenefit,
        accidentBenefitRejectionId: new AccidentBenefitRejectionId(
          source.accidentBenefitRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionInssBenefitTypeormEntity,
      AccidentBenefitRejectionInssBenefitEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentBenefitRejectionInssBenefitEntity,
    ): AccidentBenefitRejectionInssBenefitTypeormEntity => {
      const accidentBenefitRejection =
        source.accidentBenefitRejectionId !== null
          ? ({
              id: source.accidentBenefitRejectionId.toString(),
            } as AccidentBenefitRejectionTypeormEntity)
          : null;

      return AccidentBenefitRejectionInssBenefitTypeormEntity.build({
        id: source.id.toString(),
        inssBenefit: source.inssBenefit,
        accidentBenefitRejection,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentBenefitRejectionInssBenefitEntity,
      AccidentBenefitRejectionInssBenefitTypeormEntity,
      constructUsing(convert),
    );
  }
}
