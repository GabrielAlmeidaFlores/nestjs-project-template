import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period-document.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/general-urban-retirement-grant-period.typeorm.entity';
import { GeneralUrbanRetirementGrantPeriodEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period/general-urban-retirement-grant-period.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentEntity } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/general-urban-retirement-grant-period-document.entity';
import { GeneralUrbanRetirementGrantPeriodDocumentId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant-period-document/value-object/general-urban-retirement-grant-period-document-id.value-object';

@Injectable()
export class GeneralUrbanRetirementGrantPeriodDocumentEntityAutoMapperProfile {
  protected readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
    ): GeneralUrbanRetirementGrantPeriodDocumentEntity => {
      const generalUrbanRetirementGrantPeriod =
        source.generalUrbanRetirementGrantPeriod !== undefined &&
        source.generalUrbanRetirementGrantPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantPeriod,
              GeneralUrbanRetirementGrantPeriodTypeormEntity,
              GeneralUrbanRetirementGrantPeriodEntity,
            )
          : null;

      return new GeneralUrbanRetirementGrantPeriodDocumentEntity({
        ...source,
        id: new GeneralUrbanRetirementGrantPeriodDocumentId(source.id),
        generalUrbanRetirementGrantPeriod,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
      GeneralUrbanRetirementGrantPeriodDocumentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GeneralUrbanRetirementGrantPeriodDocumentEntity,
    ): GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity => {
      const generalUrbanRetirementGrantPeriod =
        source.generalUrbanRetirementGrantPeriod !== null
          ? this.mapper.map(
              source.generalUrbanRetirementGrantPeriod,
              GeneralUrbanRetirementGrantPeriodEntity,
              GeneralUrbanRetirementGrantPeriodTypeormEntity,
            )
          : undefined;

      return GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        generalUrbanRetirementGrantPeriod:
          generalUrbanRetirementGrantPeriod ?? null,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GeneralUrbanRetirementGrantPeriodDocumentEntity,
      GeneralUrbanRetirementGrantPeriodDocumentTypeormEntity,
      mappingFunction,
    );
  }
}
