import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { RetirementPlanningRgpsPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period-document.typeorm.entity';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { RetirementPlanningRgpsPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period-document/retirement-planning-rgps-period-document.entity';
import { RetirementPlanningRgpsPeriodDocumentId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period-document/value-object/retirement-planning-rgps-period-document-id.value-object';

@Injectable()
export class RetirementPlanningRgpsPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsPeriodDocumentTypeormEntity,
    ): RetirementPlanningRgpsPeriodDocumentEntity => {
      const retirementPlanningRgpsPeriod = this.mapper.map(
        source.retirementPlanningRgpsPeriod,
        RetirementPlanningRgpsPeriodTypeormEntity,
        RetirementPlanningRgpsPeriodEntity,
      );

      return new RetirementPlanningRgpsPeriodDocumentEntity({
        ...source,
        id: new RetirementPlanningRgpsPeriodDocumentId(source.id),
        retirementPlanningRgpsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
      RetirementPlanningRgpsPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsPeriodDocumentEntity,
    ): RetirementPlanningRgpsPeriodDocumentTypeormEntity => {
      const retirementPlanningRgpsPeriod = this.mapper.map(
        source.retirementPlanningRgpsPeriod,
        RetirementPlanningRgpsPeriodEntity,
        RetirementPlanningRgpsPeriodTypeormEntity,
      );

      return RetirementPlanningRgpsPeriodDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        retirementPlanningRgpsPeriod,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsPeriodDocumentEntity,
      RetirementPlanningRgpsPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
