import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { SpecialRetirementGrantEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/special-retirement-grant.entity';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';
import { SpecialRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-result/special-retirement-grant-result.entity';

@Injectable()
export class SpecialRetirementGrantEntityAutoMapperProfile {
  protected readonly _type = SpecialRetirementGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantTypeormEntity,
    ): SpecialRetirementGrantEntity => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: SpecialRetirementGrantEntity.name,
          sourceClass: SpecialRetirementGrantTypeormEntity.name,
        });
      }

      const specialRetirementGrantResult =
        source.specialRetirementGrantResult !== undefined
          ? this.mapper.map(
              source.specialRetirementGrantResult,
              SpecialRetirementGrantResultTypeormEntity,
              SpecialRetirementGrantResultEntity,
            )
          : null;

      return new SpecialRetirementGrantEntity({
        ...source,
        id: new SpecialRetirementGrantId(source.id),
        specialRetirementGrantResult,
        specialRetirementGrantDocument: [],
        specialRetirementGrantBenefit: [],
        specialRetirementGrantLegalProceeding: [],
        createdBy: new OrganizationMemberId(source.createdBy.id),
        updatedBy: new OrganizationMemberId(source.updatedBy.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantTypeormEntity,
      SpecialRetirementGrantEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialRetirementGrantEntity,
    ): SpecialRetirementGrantTypeormEntity => {
      const createdBy = {
        id: source.createdBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const updatedBy = {
        id: source.updatedBy.toString(),
      } as OrganizationMemberTypeormEntity;

      const specialRetirementGrantResult =
        source.specialRetirementGrantResult !== null
          ? this.mapper.map(
              source.specialRetirementGrantResult,
              SpecialRetirementGrantResultEntity,
              SpecialRetirementGrantResultTypeormEntity,
            )
          : undefined;

      return SpecialRetirementGrantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrantResult,
        specialRetirementGrantBenefit: undefined,
        specialRetirementGrantLegalProceeding: undefined,
        specialRetirementGrantDocument: undefined,
        createdBy,
        updatedBy,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantEntity,
      SpecialRetirementGrantTypeormEntity,
      mappingFunction,
    );
  }
}
