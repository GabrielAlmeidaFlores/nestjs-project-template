import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';
import { GeneralUrbanRetirementGrantInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/value-object/general-urban-retirement-grant-inss-benefit-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantInssBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
    ): GeneralUrbanRetirementGrantInssBenefitEntity => {
      if (!source.generalUrbanRetirementGrant) {
        throw new Error(
          'generalUrbanRetirementGrant is required for GeneralUrbanRetirementGrantInssBenefitEntity',
        );
      }

      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantTypeormEntity,
        GeneralUrbanRetirementGrantEntity,
      );

      return new GeneralUrbanRetirementGrantInssBenefitEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantInssBenefitId(source.id),
        generalUrbanRetirementGrant,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
      GeneralUrbanRetirementGrantInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantInssBenefitEntity,
    ): GeneralUrbanRetirementGrantInssBenefitTypeormEntity => {
      const generalUrbanRetirementGrant = this.mapper.map(
        source.generalUrbanRetirementGrant,
        GeneralUrbanRetirementGrantEntity,
        GeneralUrbanRetirementGrantTypeormEntity,
      );

      return GeneralUrbanRetirementGrantInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrant,
      } as GeneralUrbanRetirementGrantInssBenefitTypeormEntity);
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantInssBenefitEntity,
      GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
