import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { SpecialRetirementGrantBenefitTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/special-retirement-grant-benefit.entity';
import { GetSpecialRetirementGrantBenefitQueryResult } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/repository/special-retirement-grant/query/result/get-special-retirement-grant-benefit.query.result';
import { SpecialRetirementGrantBenefitId } from '@module/customer/analysis-tool/module/special-retirement-grant/domain/schema/entity/special-retirement-grant-benefit/value-object/special-retirement-grant-benefit-id/special-retirement-grant-benefit-id.value-object';

@Injectable()
export class GetSpecialRetirementGrantBenefitQueryResultAutoMapperProfile {
  protected readonly _type =
    GetSpecialRetirementGrantBenefitQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: SpecialRetirementGrantBenefitTypeormEntity,
    ): GetSpecialRetirementGrantBenefitQueryResult => {
      return GetSpecialRetirementGrantBenefitQueryResult.build({
        ...source,
        id: new SpecialRetirementGrantBenefitId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      SpecialRetirementGrantBenefitTypeormEntity,
      GetSpecialRetirementGrantBenefitQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetSpecialRetirementGrantBenefitQueryResult,
    ): SpecialRetirementGrantBenefitTypeormEntity => {
      return SpecialRetirementGrantBenefitTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        specialRetirementGrant: undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetSpecialRetirementGrantBenefitQueryResult,
      SpecialRetirementGrantBenefitTypeormEntity,
      mappingFunction,
    );
  }
}
