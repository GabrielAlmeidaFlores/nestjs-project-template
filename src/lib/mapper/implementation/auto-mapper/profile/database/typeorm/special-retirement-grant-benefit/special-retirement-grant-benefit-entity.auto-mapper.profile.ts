import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantBenefitEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';

@Injectable()
export class SpecialRetirementGrantBenefitEntityAutoMapperProfile {
  protected readonly _type =
    SpecialRetirementGrantBenefitEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantBenefitTypeormEntity,
    ): SpecialRetirementGrantBenefitEntity => {
      if (!source.specialRetirementGrant) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialRetirementGrantBenefitEntity.name,
          sourceClass: SpecialRetirementGrantBenefitTypeormEntity.name,
        });
      }

      return new SpecialRetirementGrantBenefitEntity({
        ...source,
        id: new SpecialRetirementGrantBenefitId(source.id),
        specialRetirementGrant: this.mapper.map(
          source.specialRetirementGrant,
          SpecialRetirementGrantTypeormEntity,
          SpecialRetirementGrantEntity,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantBenefitTypeormEntity,
      SpecialRetirementGrantBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialRetirementGrantBenefitEntity,
    ): SpecialRetirementGrantBenefitTypeormEntity => {
      const specialRetirementGrant: SpecialRetirementGrantEntity =
        source.specialRetirementGrant;

      return SpecialRetirementGrantBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: {
          id: specialRetirementGrant.id.toString(),
        } as SpecialRetirementGrantTypeormEntity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantBenefitEntity,
      SpecialRetirementGrantBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
