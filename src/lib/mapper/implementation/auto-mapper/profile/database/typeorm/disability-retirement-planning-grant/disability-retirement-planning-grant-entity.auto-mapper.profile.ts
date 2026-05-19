import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DisabilityRetirementPlanningGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant-result.typeorm.entity';
import { DisabilityRetirementPlanningGrantTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/disability-retirement-planning-grant.typeorm.entity';
import { DisabilityRetirementPlanningGrantEntity } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/disability-retirement-planning-grant.entity';
import { DisabilityRetirementPlanningGrantId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant/value-object/disability-retirement-planning-grant-id.value-object';
import { DisabilityRetirementPlanningGrantResultId } from '@module/customer/analysis-tool/module/disability-retirement-planning-grant/domain/schema/entity/disability-retirement-planning-grant-result/value-object/disability-retirement-planning-grant-result-id.value-object';

@Injectable()
export class DisabilityRetirementPlanningGrantEntityAutoMapperProfile {
  protected readonly _type =
    DisabilityRetirementPlanningGrantEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningGrantTypeormEntity,
    ): DisabilityRetirementPlanningGrantEntity => {
      const resultId =
        source.disabilityRetirementPlanningGrantResult !== null &&
        source.disabilityRetirementPlanningGrantResult !== undefined
          ? new DisabilityRetirementPlanningGrantResultId(
              source.disabilityRetirementPlanningGrantResult.id,
            )
          : null;

      return new DisabilityRetirementPlanningGrantEntity({
        id: new DisabilityRetirementPlanningGrantId(source.id),
        category: source.category,
        analysisName: source.analysisName,
        longPrizeDisability: source.longPrizeDisability,
        disabilityRetirementPlanningGrantResultId: resultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantTypeormEntity,
      DisabilityRetirementPlanningGrantEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: DisabilityRetirementPlanningGrantEntity,
    ): DisabilityRetirementPlanningGrantTypeormEntity => {
      const disabilityRetirementPlanningGrantResult =
        source.disabilityRetirementPlanningGrantResultId !== null
          ? DisabilityRetirementPlanningGrantResultTypeormEntity.build({
              id: source.disabilityRetirementPlanningGrantResultId.toString(),
            } as DisabilityRetirementPlanningGrantResultTypeormEntity)
          : undefined;

      return DisabilityRetirementPlanningGrantTypeormEntity.build({
        id: source.id.toString(),
        category: source.category,
        analysisName: source.analysisName,
        longPrizeDisability: source.longPrizeDisability,
        disabilityRetirementPlanningGrantResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      DisabilityRetirementPlanningGrantEntity,
      DisabilityRetirementPlanningGrantTypeormEntity,
      constructUsing(convert),
    );
  }
}
