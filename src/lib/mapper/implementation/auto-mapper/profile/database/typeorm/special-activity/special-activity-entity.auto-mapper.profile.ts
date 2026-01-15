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
import { GetSpecialActivityWithRelationsQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity/query/result/get-special-activity-with-relations.query.result';
import { GetSpecialActivityDocumentQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-document/query/result/get-special-activity-document.query.result';
import { GetSpecialActivityInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-inss-benefit/query/result/get-special-activity-inss-benefit.query.result';
import { GetSpecialActivityLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-legal-proceeding/query/result/get-special-activity-legal-proceeding.query.result';
import { GetSpecialActivityResultQueryResult } from '@module/customer/analysis-tool/module/special-activity/domain/repository/special-activity-result/query/result/get-special-activity-result.query.result';

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
    ): GetSpecialActivityWithRelationsQueryResult => {
      const specialActivityResult = source.specialActivityResult
        ? this.mapper.map(
            source.specialActivityResult,
            SpecialActivityResultTypeormEntity,
            GetSpecialActivityResultQueryResult,
          )
        : null;

      const specialActivityDocuments =
        source.specialActivityDocuments?.map((doc) =>
          this.mapper.map(
            doc,
            SpecialActivityDocumentTypeormEntity,
            GetSpecialActivityDocumentQueryResult,
          ),
        ) ?? [];

      const specialActivityInssBenefit =
        source.specialActivityInssBenefit?.map((benefit) =>
          this.mapper.map(
            benefit,
            SpecialActivityInssBenefitTypeormEntity,
            GetSpecialActivityInssBenefitQueryResult,
          ),
        ) ?? [];

      const specialActivityLegalProceeding =
        source.specialActivityLegalProceeding?.map((proceeding) =>
          this.mapper.map(
            proceeding,
            SpecialActivityLegalProceedingTypeormEntity,
            GetSpecialActivityLegalProceedingQueryResult,
          ),
        ) ?? [];

      return GetSpecialActivityWithRelationsQueryResult.build({
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
      GetSpecialActivityWithRelationsQueryResult,
      mappingFunction,
    );
  }
}
