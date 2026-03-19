import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GetGeneralUrbanRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-with-relations.query.result';
import { GeneralUrbanRetirementGrantEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/general-urban-retirement-grant.entity';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';
import { GeneralUrbanRetirementGrantInssBenefitId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/value-object/general-urban-retirement-grant-inss-benefit-id.value-object';
import { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
import { GeneralUrbanRetirementGrantLegalProceedingId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/value-object/general-urban-retirement-grant-legal-proceeding-id.value-object';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantResultEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-result/general-urban-retirement-grant-result.entity';

@Injectable()
export class GetGeneralUrbanRetirementGrantWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantTypeormEntity,
    ): GetGeneralUrbanRetirementGrantWithRelationsQueryResult => {
      const generalUrbanRetirementGrantResult =
        source.generalUrbanRetirementGrantResult !== undefined
          ? this.mapper.map(
              source.generalUrbanRetirementGrantResult,
              GeneralUrbanRetirementGrantResultTypeormEntity,
              GeneralUrbanRetirementGrantResultEntity,
            )
          : null;

      const grantEntity = this.mapper.map(
        source,
        GeneralUrbanRetirementGrantTypeormEntity,
        GeneralUrbanRetirementGrantEntity,
      );

      const generalUrbanRetirementGrantPeriod = this.mapper.mapArray(
        source.generalUrbanRetirementGrantPeriod ?? [],
        GeneralUrbanRetirementGrantPeriodTypeormEntity,
        GeneralUrbanRetirementGrantPeriodEntity,
      );

      const generalUrbanRetirementGrantBenefit = (
        source.generalUrbanRetirementGrantBenefit ?? []
      ).map(
        (b) =>
          new GeneralUrbanRetirementGrantInssBenefitEntity({
            id: new GeneralUrbanRetirementGrantInssBenefitId(b.id),
            inssBenefitNumber: b.inssBenefitNumber,
            generalUrbanRetirementGrant: grantEntity,
          }),
      );

      const generalUrbanRetirementGrantLegalProceeding = (
        source.generalUrbanRetirementGrantLegalProceeding ?? []
      ).map(
        (lp) =>
          new GeneralUrbanRetirementGrantLegalProceedingEntity({
            id: new GeneralUrbanRetirementGrantLegalProceedingId(lp.id),
            legalProceedingNumber: lp.legalProceedingNumber,
            generalUrbanRetirementGrant: grantEntity,
          }),
      );

      return GetGeneralUrbanRetirementGrantWithRelationsQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantId(source.id),
        generalUrbanRetirementGrantResult,
        generalUrbanRetirementGrantPeriod,
        generalUrbanRetirementGrantBenefit,
        generalUrbanRetirementGrantLegalProceeding,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantTypeormEntity,
      GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
    ): GeneralUrbanRetirementGrantTypeormEntity => {
      const generalUrbanRetirementGrantResult =
        source.generalUrbanRetirementGrantResult !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantResult,
              GeneralUrbanRetirementGrantResultEntity,
              GeneralUrbanRetirementGrantResultTypeormEntity,
            )
          : undefined;

      const generalUrbanRetirementGrantPeriod = this.mapper.mapArray(
        source.generalUrbanRetirementGrantPeriod ?? [],
        GeneralUrbanRetirementGrantPeriodEntity,
        GeneralUrbanRetirementGrantPeriodTypeormEntity,
      );

      const generalUrbanRetirementGrantBenefit = this.mapper.mapArray(
        source.generalUrbanRetirementGrantBenefit ?? [],
        GeneralUrbanRetirementGrantInssBenefitEntity,
        GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
      );

      const generalUrbanRetirementGrantLegalProceeding = this.mapper.mapArray(
        source.generalUrbanRetirementGrantLegalProceeding ?? [],
        GeneralUrbanRetirementGrantLegalProceedingEntity,
        GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
      );

      return GeneralUrbanRetirementGrantTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrantResult,
        generalUrbanRetirementGrantPeriod,
        generalUrbanRetirementGrantBenefit,
        generalUrbanRetirementGrantLegalProceeding,
      } as GeneralUrbanRetirementGrantTypeormEntity);
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantWithRelationsQueryResult,
      GeneralUrbanRetirementGrantTypeormEntity,
      mappingFunction,
    );
  }
}
