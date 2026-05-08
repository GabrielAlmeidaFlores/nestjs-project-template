import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-legal-proceeding.typeorm.entity';
import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/result/get-retirement-permanent-disability-revision-with-relations.query.result';
import { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/query/result/get-retirement-permanent-disability-revision-inss-benefit.query.result';
import { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/query/result/get-retirement-permanent-disability-revision-legal-proceeding.query.result';
import { GetRetirementPermanentDisabilityRevisionResultQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/query/result/get-retirement-permanent-disability-revision-result.query.result';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';

@Injectable()
export class GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult => {
      const result = source.retirementPermanentDisabilityRevisionResult
        ? this.mapper.map(
            source.retirementPermanentDisabilityRevisionResult,
            RetirementPermanentDisabilityRevisionResultTypeormEntity,
            GetRetirementPermanentDisabilityRevisionResultQueryResult,
          )
        : null;

      const benefit = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionInssBenefit ?? [],
        RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
        GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
      );

      const legalProceeding = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionLegalProceeding ?? [],
        RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
        GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
      );

      const document = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionDocument ?? [],
        RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
        GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
      );

      const retirementPermanentDisabilityRevisionWorkPeriods =
        this.mapper.mapArray(
          source.retirementPermanentDisabilityRevisionWorkPeriods ?? [],
          RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity,
          GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult,
        );

      return GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult.build(
        {
          id: new RetirementPermanentDisabilityRevisionId(source.id),
          result,
          benefit,
          legalProceeding,
          document,
          concessionLetterBreakdown: [],
          retirementPermanentDisabilityRevisionWorkPeriods,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
    ): RetirementPermanentDisabilityRevisionTypeormEntity => {
      const result = source.result
        ? this.mapper.map(
            source.result,
            GetRetirementPermanentDisabilityRevisionResultQueryResult,
            RetirementPermanentDisabilityRevisionResultTypeormEntity,
          )
        : undefined;

      const benefit = this.mapper.mapArray(
        source.benefit,
        GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
        RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      );

      const legalProceeding = this.mapper.mapArray(
        source.legalProceeding,
        GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
        RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      );

      const document = this.mapper.mapArray(
        source.document,
        GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
        RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      );

      return RetirementPermanentDisabilityRevisionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: null,
        category: null,
        myInssPassword: null,
        retirementPermanentDisabilityRevisionResult: result,
        retirementPermanentDisabilityRevisionInssBenefit: benefit,
        retirementPermanentDisabilityRevisionLegalProceeding: legalProceeding,
        retirementPermanentDisabilityRevisionDocument: document,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      mappingFunction,
    );
  }
}

@Injectable()
export class GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetRetirementPermanentDisabilityRevisionWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPermanentDisabilityRevisionTypeormEntity,
    ): GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult => {
      const result = source.retirementPermanentDisabilityRevisionResult
        ? this.mapper.map(
            source.retirementPermanentDisabilityRevisionResult,
            RetirementPermanentDisabilityRevisionResultTypeormEntity,
            GetRetirementPermanentDisabilityRevisionResultQueryResult,
          )
        : null;

      const benefit = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionInssBenefit ?? [],
        RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
        GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
      );

      const legalProceeding = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionLegalProceeding ?? [],
        RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
        GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
      );

      const document = this.mapper.mapArray(
        source.retirementPermanentDisabilityRevisionDocument ?? [],
        RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
        GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
      );

      return GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult.build(
        {
          id: new RetirementPermanentDisabilityRevisionId(source.id),
          result,
          benefit,
          legalProceeding,
          document,
        },
      );
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
    ): RetirementPermanentDisabilityRevisionTypeormEntity => {
      const result = source.result
        ? this.mapper.map(
            source.result,
            GetRetirementPermanentDisabilityRevisionResultQueryResult,
            RetirementPermanentDisabilityRevisionResultTypeormEntity,
          )
        : undefined;

      const benefit = this.mapper.mapArray(
        source.benefit,
        GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult,
        RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity,
      );

      const legalProceeding = this.mapper.mapArray(
        source.legalProceeding,
        GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult,
        RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity,
      );

      const document = this.mapper.mapArray(
        source.document,
        GetRetirementPermanentDisabilityRevisionDocumentQueryResult,
        RetirementPermanentDisabilityRevisionDocumentTypeormEntity,
      );

      return RetirementPermanentDisabilityRevisionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: null,
        category: null,
        myInssPassword: null,
        retirementPermanentDisabilityRevisionResult: result,
        retirementPermanentDisabilityRevisionInssBenefit: benefit,
        retirementPermanentDisabilityRevisionLegalProceeding: legalProceeding,
        retirementPermanentDisabilityRevisionDocument: document,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      mappingFunction,
    );
  }
}
