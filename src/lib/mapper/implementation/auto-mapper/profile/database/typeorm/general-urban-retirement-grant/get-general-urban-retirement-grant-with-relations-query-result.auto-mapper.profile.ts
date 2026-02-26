import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-inss-benefit.typeorm.entity';
import { GeneralUrbanRetirementGrantLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-legal-proceeding.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-result.typeorm.entity';
import { GeneralUrbanRetirementGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant.typeorm.entity';
import { GetGeneralUrbanRetirementGrantWithRelationsQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant/query/result/get-general-urban-retirement-grant-with-relations.query.result';
import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { GeneralUrbanRetirementGrantInssBenefitEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-inss-benefit/general-urban-retirement-grant-inss-benefit.entity';
import { GeneralUrbanRetirementGrantLegalProceedingEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-legal-proceeding/general-urban-retirement-grant-legal-proceeding.entity';
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

      const generalUrbanRetirementGrantPeriod = this.mapper.mapArray(
        source.generalUrbanRetirementGrantPeriod ?? [],
        GeneralUrbanRetirementGrantPeriodTypeormEntity,
        GeneralUrbanRetirementGrantPeriodEntity,
      );

      const generalUrbanRetirementGrantBenefit = this.mapper.mapArray(
        source.generalUrbanRetirementGrantBenefit ?? [],
        GeneralUrbanRetirementGrantInssBenefitTypeormEntity,
        GeneralUrbanRetirementGrantInssBenefitEntity,
      );

      const generalUrbanRetirementGrantLegalProceeding = this.mapper.mapArray(
        source.generalUrbanRetirementGrantLegalProceeding ?? [],
        GeneralUrbanRetirementGrantLegalProceedingTypeormEntity,
        GeneralUrbanRetirementGrantLegalProceedingEntity,
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
      } as any);
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
