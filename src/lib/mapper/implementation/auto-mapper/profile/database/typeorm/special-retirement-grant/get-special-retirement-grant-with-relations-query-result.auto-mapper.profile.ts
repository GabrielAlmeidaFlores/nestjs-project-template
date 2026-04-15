import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { GetSpecialRetirementGrantBenefitQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-benefit.query.result';
import { GetSpecialRetirementGrantDocumentQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-document.query.result';
import { GetSpecialRetirementGrantLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-legal-proceeding.query.result';
import { GetSpecialRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-with-relations.query.result';
import { GetSpecialRetirementGrantResultQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant-result/query/result/get-special-retirement-grant-result.query.result';
import { SpecialRetirementGrantId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant/value-object/special-retirement-grant-id/special-retirement-grant-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantWithRelationsQueryResultAutoMapperProfile.name;

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
    ): GetSpecialRetirementGrantWithRelationsQueryResult => {
      if (
        source.specialRetirementGrantBenefit === undefined ||
        source.specialRetirementGrantLegalProceeding === undefined ||
        source.specialRetirementGrantDocument === undefined
      ) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass:
            GetSpecialRetirementGrantWithRelationsQueryResult.name,
          sourceClass: SpecialRetirementGrantTypeormEntity.name,
        });
      }

      const specialRetirementGrantResult = this.mapper.map(
        source.specialRetirementGrantResult,
        SpecialRetirementGrantResultTypeormEntity,
        GetSpecialRetirementGrantResultQueryResult,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        OrganizationMemberTypeormEntity,
        GetOrganizationMemberWithCustomerRelationQueryResult,
      );

      const specialRetirementGrantBenefit = this.mapper.mapArray(
        source.specialRetirementGrantBenefit,
        SpecialRetirementGrantBenefitTypeormEntity,
        GetSpecialRetirementGrantBenefitQueryResult,
      );

      const specialRetirementGrantLegalProceeding = this.mapper.mapArray(
        source.specialRetirementGrantLegalProceeding,
        SpecialRetirementGrantLegalProceedingTypeormEntity,
        GetSpecialRetirementGrantLegalProceedingQueryResult,
      );

      const specialRetirementGrantDocument = this.mapper.mapArray(
        source.specialRetirementGrantDocument,
        SpecialRetirementGrantDocumentTypeormEntity,
        GetSpecialRetirementGrantDocumentQueryResult,
      );

      return GetSpecialRetirementGrantWithRelationsQueryResult.build({
        ...source,
        id: new SpecialRetirementGrantId(source.id),
        specialRetirementGrantResult,
        createdBy,
        updatedBy,
        specialRetirementGrantLegalProceeding,
        specialRetirementGrantBenefit,
        specialRetirementGrantDocument,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantTypeormEntity,
      GetSpecialRetirementGrantWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantWithRelationsQueryResult,
    ): SpecialRetirementGrantTypeormEntity => {
      const specialRetirementGrantResult = this.mapper.map(
        source.specialRetirementGrantResult,
        GetSpecialRetirementGrantResultQueryResult,
        SpecialRetirementGrantResultTypeormEntity,
      );

      const updatedBy = this.mapper.map(
        source.updatedBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const createdBy = this.mapper.map(
        source.createdBy,
        GetOrganizationMemberWithCustomerRelationQueryResult,
        OrganizationMemberTypeormEntity,
      );

      const specialRetirementGrantBenefit = this.mapper.mapArray(
        source.specialRetirementGrantBenefit,
        GetSpecialRetirementGrantBenefitQueryResult,
        SpecialRetirementGrantBenefitTypeormEntity,
      );

      const specialRetirementGrantLegalProceeding = this.mapper.mapArray(
        source.specialRetirementGrantLegalProceeding,
        GetSpecialRetirementGrantLegalProceedingQueryResult,
        SpecialRetirementGrantLegalProceedingTypeormEntity,
      );

      const specialRetirementGrantDocument = this.mapper.mapArray(
        source.specialRetirementGrantDocument,
        GetSpecialRetirementGrantDocumentQueryResult,
        SpecialRetirementGrantDocumentTypeormEntity,
      );

      return SpecialRetirementGrantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrantResult,
        updatedBy,
        createdBy,
        specialRetirementGrantBenefit,
        specialRetirementGrantLegalProceeding,
        specialRetirementGrantDocument,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantWithRelationsQueryResult,
      SpecialRetirementGrantTypeormEntity,
      mappingFunction,
    );
  }
}
