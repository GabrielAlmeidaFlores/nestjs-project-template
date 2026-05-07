import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { OrganizationMemberTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-member.typeorm.entity';
import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { SpecialRetirementGrantDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-document.typeorm.entity';
import { SpecialRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-legal-proceeding.entity';
import { SpecialRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-result.typeorm.entity';
import { SpecialRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant.typeorm.entity';
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
      const specialRetirementGrantResult = source.specialRetirementGrantResult
        ? this.mapper.map(
            source.specialRetirementGrantResult,
            SpecialRetirementGrantResultTypeormEntity,
            GetSpecialRetirementGrantResultQueryResult,
          )
        : null;

      const createdBy = source.createdBy
        ? this.mapper.map(
            source.createdBy,
            OrganizationMemberTypeormEntity,
            GetOrganizationMemberWithCustomerRelationQueryResult,
          )
        : null;

      const updatedBy = source.updatedBy
        ? this.mapper.map(
            source.updatedBy,
            OrganizationMemberTypeormEntity,
            GetOrganizationMemberWithCustomerRelationQueryResult,
          )
        : null;

      const specialRetirementGrantBenefit =
        source.specialRetirementGrantBenefit?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantBenefitTypeormEntity,
            GetSpecialRetirementGrantBenefitQueryResult,
          ),
        ) ?? [];

      const specialRetirementGrantLegalProceeding =
        source.specialRetirementGrantLegalProceeding?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantLegalProceedingTypeormEntity,
            GetSpecialRetirementGrantLegalProceedingQueryResult,
          ),
        ) ?? [];

      const specialRetirementGrantDocument =
        source.specialRetirementGrantDocument?.map((item) =>
          this.mapper.map(
            item,
            SpecialRetirementGrantDocumentTypeormEntity,
            GetSpecialRetirementGrantDocumentQueryResult,
          ),
        ) ?? [];

      return GetSpecialRetirementGrantWithRelationsQueryResult.build({
        id: new SpecialRetirementGrantId(source.id),
        name: source.name,
        specialActivity: source.specialActivity,
        cnisDocument: source.cnisDocument,
        specialRetirementGrantResult,
        createdBy:
          createdBy as GetOrganizationMemberWithCustomerRelationQueryResult,
        updatedBy:
          updatedBy as GetOrganizationMemberWithCustomerRelationQueryResult,
        specialRetirementGrantBenefit,
        specialRetirementGrantLegalProceeding:
          specialRetirementGrantLegalProceeding,
        specialRetirementGrantDocument,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt ?? null,
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
