import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown.typeorm.entity';
import { RetirementPermanentDisabilityRevisionDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-document.typeorm.entity';
import { RetirementPermanentDisabilityRevisionInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-inss-benefit.typeorm.entity';
import { RetirementPermanentDisabilityRevisionLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-legal-proceeding.typeorm.entity';
import { RetirementPermanentDisabilityRevisionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-result.typeorm.entity';
import { RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision-work-periods.typeorm.entity';
import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision/query/result/get-retirement-permanent-disability-revision-with-relations.query.result';
import { GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-concession-letter-breakdown/query/result/get-retirement-permanent-disability-revision-concession-letter-breakdown.query.result';
import { GetRetirementPermanentDisabilityRevisionDocumentQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-document/query/result/get-retirement-permanent-disability-revision-document.query.result';
import { GetRetirementPermanentDisabilityRevisionInssBenefitQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-inss-benefit/query/result/get-retirement-permanent-disability-revision-inss-benefit.query.result';
import { GetRetirementPermanentDisabilityRevisionLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-legal-proceeding/query/result/get-retirement-permanent-disability-revision-legal-proceeding.query.result';
import { GetRetirementPermanentDisabilityRevisionResultQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-result/query/result/get-retirement-permanent-disability-revision-result.query.result';
import { GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/repository/retirement-permanent-disability-revision-work-periods/query/result/get-retirement-permanent-disability-revision-work-periods.query.result';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';
import { RetirementPermanentDisabilityRevisionWorkPeriodsId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-work-periods/value-object/retirement-permanent-disability-revision-work-periods-id.value-object';

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

      const revisionId = new RetirementPermanentDisabilityRevisionId(source.id);

      const retirementPermanentDisabilityRevisionWorkPeriods = (
        source.retirementPermanentDisabilityRevisionWorkPeriods ?? []
      ).map(
        (wp: RetirementPermanentDisabilityRevisionWorkPeriodsTypeormEntity) =>
          GetRetirementPermanentDisabilityRevisionWorkPeriodsQueryResult.build({
            retirementPermanentDisabilityRevisionWorkPeriodsId:
              new RetirementPermanentDisabilityRevisionWorkPeriodsId(wp.id),
            bondOrigin: wp.bondOrigin,
            startDate: wp.startDate,
            endDate: wp.endDate,
            category: wp.category,
            competenceBelowTheMinimum: wp.competenceBelowTheMinimum,
            pendencyReason: wp.pendencyReason,
            periodConsideration: wp.periodConsideration,
            contributionAverage:
              wp.contributionAverage !== null
                ? new DecimalValue(wp.contributionAverage)
                : null,
            status: wp.status,
            gracePeriod: wp.gracePeriod,
            retirementPermanentDisabilityRevisionId: revisionId,
            createdAt: wp.createdAt,
            updatedAt: wp.updatedAt,
            deletedAt: wp.deletedAt,
          }),
      );

      const concessionLetterBreakdown = (
        source.retirementPermanentDisabilityRevisionConcessionLetterBreakdown ??
        []
      ).map(
        (
          item: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownTypeormEntity,
        ) =>
          GetRetirementPermanentDisabilityRevisionConcessionLetterBreakdownQueryResult.build(
            {
              id: new RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId(
                item.id,
              ),
              competence: item.competence,
              amount: new DecimalValue(item.amount),
              reasonNotConsidered: item.reasonNotConsidered,
              action: item.action,
              retirementPermanentDisabilityRevisionId: revisionId,
              createdAt: item.createdAt,
              updatedAt: item.updatedAt,
              ...(item.deletedAt !== null && { deletedAt: item.deletedAt }),
            },
          ),
      );

      return GetRetirementPermanentDisabilityRevisionWithRelationsQueryResult.build(
        {
          id: revisionId,
          analysisName: source.analysisName,
          category: source.category,
          myInssPassword: source.myInssPassword,
          result,
          benefit,
          legalProceeding,
          document,
          concessionLetterBreakdown,
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
