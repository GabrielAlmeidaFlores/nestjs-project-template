import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPermanentDisabilityRevisionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-permanent-disability-revision.typeorm.entity';
import { RetirementPermanentDisabilityRevisionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/retirement-permanent-disability-revision.entity';
import { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import { RetirementPermanentDisabilityRevisionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-result/value-object/retirement-permanent-disability-revision-result-id/retirement-permanent-disability-revision-result-id.value-object';
import { RetirementPermanentDisabilityRevisionCategoryEnum } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/enum/retirement-permanent-disability-revision-category.enum';

@Injectable()
export class RetirementPermanentDisabilityRevisionEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPermanentDisabilityRevisionEntityAutoMapperProfile.name;

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
    ): RetirementPermanentDisabilityRevisionEntity => {
      return new RetirementPermanentDisabilityRevisionEntity({
        id: new RetirementPermanentDisabilityRevisionId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        myInssPassword: source.myInssPassword ?? null,
        retirementPermanentDisabilityRevisionResultId:
          source.retirementPermanentDisabilityRevisionResult?.id != null
            ? new RetirementPermanentDisabilityRevisionResultId(
                source.retirementPermanentDisabilityRevisionResult.id,
              )
            : null,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      RetirementPermanentDisabilityRevisionEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPermanentDisabilityRevisionEntity,
    ): RetirementPermanentDisabilityRevisionTypeormEntity => {
      return RetirementPermanentDisabilityRevisionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category:
          source.category as RetirementPermanentDisabilityRevisionCategoryEnum | null,
        myInssPassword: source.myInssPassword,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        retirementPermanentDisabilityRevisionResult:
          source.retirementPermanentDisabilityRevisionResultId != null
            ? ({
                id: source.retirementPermanentDisabilityRevisionResultId.toString(),
              } as RetirementPermanentDisabilityRevisionTypeormEntity['retirementPermanentDisabilityRevisionResult'])
            : undefined,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPermanentDisabilityRevisionEntity,
      RetirementPermanentDisabilityRevisionTypeormEntity,
      mappingFunction,
    );
  }
}
