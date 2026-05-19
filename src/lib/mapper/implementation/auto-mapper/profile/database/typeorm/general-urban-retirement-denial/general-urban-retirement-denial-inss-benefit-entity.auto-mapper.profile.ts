import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementDenialInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementDenialTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-denial.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GeneralUrbanRetirementDenialId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial/value-object/general-urban-retirement-denial-id/general-urban-retirement-denial-id.value-object';
import { GeneralUrbanRetirementDenialInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/general-urban-retirement-denial-inss-benefit.entity';
import { GeneralUrbanRetirementDenialInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-denial/domain/schema/entity/general-urban-retirement-denial-inss-benefit/value-object/general-urban-retirement-denial-inss-benefit-id.value-object';

@Injectable()
export class GeneralUrbanRetirementDenialInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementDenialInssBenefitEntityAutoMapperProfile.name;

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
      GeneralUrbanRetirementDenialInssBenefitTypeormEntity,
      GeneralUrbanRetirementDenialInssBenefitEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialInssBenefitTypeormEntity,
        ): GeneralUrbanRetirementDenialInssBenefitEntity => {
          if (!source.generalUrbanRetirementDenial) {
            throw new IncompleteSourceDataForMappingError({
              destinationClass:
                GeneralUrbanRetirementDenialInssBenefitEntity.name,
              sourceClass:
                GeneralUrbanRetirementDenialInssBenefitTypeormEntity.name,
            });
          }

          return new GeneralUrbanRetirementDenialInssBenefitEntity({
            id: new GeneralUrbanRetirementDenialInssBenefitId(source.id),
            inssBenefit: source.inssBenefit,
            generalUrbanRetirementDenialId: new GeneralUrbanRetirementDenialId(
              source.generalUrbanRetirementDenial.id,
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
      GeneralUrbanRetirementDenialInssBenefitEntity,
      GeneralUrbanRetirementDenialInssBenefitTypeormEntity,
      constructUsing(
        (
          source: GeneralUrbanRetirementDenialInssBenefitEntity,
        ): GeneralUrbanRetirementDenialInssBenefitTypeormEntity =>
          GeneralUrbanRetirementDenialInssBenefitTypeormEntity.build({
            id: source.id.toString(),
            inssBenefit: source.inssBenefit,
            generalUrbanRetirementDenial:
              GeneralUrbanRetirementDenialTypeormEntity.build({
                id: source.generalUrbanRetirementDenialId.toString(),
              } as GeneralUrbanRetirementDenialTypeormEntity),
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
