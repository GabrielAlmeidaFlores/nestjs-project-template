import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialActivityInssBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity-inss-benefit.typeorm.entity';
import { SpecialActivityTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-activity.typeorm.entity';
import { SpecialActivityEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/special-activity-entity';
import { SpecialActivityInssBenefitEntity } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/special-activity-inss-benefit.entity';
import { SpecialActivityInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity-inss-benefit/value-object/special-activity-inss-benefit-id.value-object';
import { GetSpecialActivityAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/special-activity-analysis/domain/repository/special-activity-analysis-inss-benefit/query/result/get-special-activity-analysis-inss-benefit.query.result';

@Injectable()
export class SpecialActivityInssBenefitEntityAutoMapperProfile {
  protected readonly _type =
    SpecialActivityInssBenefitEntityAutoMapperProfile.name;

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
      source: SpecialActivityInssBenefitTypeormEntity,
    ): SpecialActivityInssBenefitEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityTypeormEntity,
        SpecialActivityEntity,
      );

      return new SpecialActivityInssBenefitEntity({
        ...source,
        id: new SpecialActivityInssBenefitId(source.id),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialActivityInssBenefitTypeormEntity,
      SpecialActivityInssBenefitEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: SpecialActivityInssBenefitEntity,
    ): SpecialActivityInssBenefitTypeormEntity => {
      const specialActivity = this.mapper.map(
        source.specialActivity,
        SpecialActivityEntity,
        SpecialActivityTypeormEntity,
      );

      return SpecialActivityInssBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialActivity,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      SpecialActivityInssBenefitEntity,
      SpecialActivityInssBenefitTypeormEntity,
      mappingFunction,
    );
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: SpecialActivityInssBenefitTypeormEntity,
    ): GetSpecialActivityAnalysisInssBenefitQueryResult => {
      return GetSpecialActivityAnalysisInssBenefitQueryResult.build({
        id: new SpecialActivityInssBenefitId(source.id),
        inssBenefitNumber: source.inssBenefitNumber,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      SpecialActivityInssBenefitTypeormEntity,
      GetSpecialActivityAnalysisInssBenefitQueryResult,
      mappingFunction,
    );
  }
}
