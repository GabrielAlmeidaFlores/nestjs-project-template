import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-time-accelerator.typeorm.entity';
import { GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/repository/general-urban-retirement-grant-time-accelerator/query/result/get-general-urban-retirement-grant-time-accelerator.query.result';
import { GeneralUrbanRetirementGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-time-accelerator/value-object/general-urban-retirement-grant-time-accelerator-id.value-object';

@Injectable()
export class GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
    ): GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult => {
      return GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult.build({
        ...source,
        id: new GeneralUrbanRetirementGrantTimeAcceleratorId(source.id),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToQueryResult);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertQueryResultToOrmEntity = (
      source: GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult,
    ): GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity => {
      return GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity.build({
        ...source,
        id: source.id.toString(),
      });
    };

    const mappingFunction = constructUsing(convertQueryResultToOrmEntity);

    createMap(
      this.mapper,
      GetGeneralUrbanRetirementGrantTimeAcceleratorQueryResult,
      GeneralUrbanRetirementGrantTimeAcceleratorTypeormEntity,
      mappingFunction,
    );
  }
}
