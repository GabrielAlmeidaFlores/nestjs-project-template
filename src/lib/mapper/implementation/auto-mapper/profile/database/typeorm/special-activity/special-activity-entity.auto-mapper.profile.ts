import { constructUsing, createMap, Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-documents.typeorm.entity';
import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { SpecialActivityLegalProceedingTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-legal-proceeding.typeorm.entity';
import { SpecialActivityResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-result.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { SpecialActivityResultEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-result/special-activity-result.entity';
import { GetSpecialActivityAnalysisWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis/query/result/get-special-activity-analysis-with-relations.query.result';
import { GetSpecialActivityAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-document/query/result/get-special-activity-analysis-document.query.result';
import { GetSpecialActivityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/query/result/get-special-activity-analysis-inss-benefit.query.result';
import { GetSpecialActivityAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-legal-proceeding/query/result/get-special-activity-analysis-legal-proceeding.query.result';
import { GetSpecialActivityAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-result/query/result/get-special-activity-analysis-result.query.result';

@Injectable()
export class SpecialActivityEntityAutoMapperProfile {
  protected readonly _type = SpecialActivityEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialActivityTypeormEntity,
    ): SpecialActivityEntity => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultTypeormEntity,
            SpecialActivityResultEntity,
          )
        : null;

      return new SpecialActivityEntity({
        id: new SpecialActivityId(source.id),
        specialActivityResult,
        specialActivityDocuments: null,
        specialActivityInssBenefit: null,
        specialActivityLegalProceeding: null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityTypeormEntity,
      SpecialActivityEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityEntity,
    ): SpecialActivityTypeormEntity => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultEntity,
            SpecialActivityResultTypeormEntity,
          )
        : null;

      return SpecialActivityTypeormEntity.build({
        id: source.id.toString(),
        specialActivityResult,
        specialActivityDocuments: null,
        specialActivityInssBenefit: undefined,
        specialActivityLegalProceeding: undefined,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityEntity,
      SpecialActivityTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityTypeormEntity,
    ): GetSpecialActivityAnalysisWithRelationsQueryResult => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultTypeormEntity,
            GetSpecialActivityAnalysisResultQueryResult,
          )
        : null;

      const specialActivityDocuments =
        source.specialActivityDocuments?.map((doc) =>
          this.mapper.map(
            doc,
            SpecialActivityDocumentTypeormEntity,
            GetSpecialActivityAnalysisDocumentQueryResult,
          ),
        ) ?? [];

      const specialActivityInssBenefit =
        source.specialActivityInssBenefit?.map((benefit) =>
          this.mapper.map(
            benefit,
            SpecialActivityInssBenefitTypeormEntity,
            GetSpecialActivityAnalysisInssBenefitQueryResult,
          ),
        ) ?? [];

      const specialActivityLegalProceeding =
        source.specialActivityLegalProceeding?.map((proceeding) =>
          this.mapper.map(
            proceeding,
            SpecialActivityLegalProceedingTypeormEntity,
            GetSpecialActivityAnalysisLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetSpecialActivityAnalysisWithRelationsQueryResult.build({
        id: new SpecialActivityId(source.id),
        specialActivityResult,
        specialActivityDocuments,
        specialActivityInssBenefit,
        specialActivityLegalProceeding,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityTypeormEntity,
      GetSpecialActivityAnalysisWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
