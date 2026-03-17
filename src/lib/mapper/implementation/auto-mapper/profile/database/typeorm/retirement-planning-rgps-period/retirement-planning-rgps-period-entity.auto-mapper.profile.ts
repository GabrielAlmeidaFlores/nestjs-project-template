import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { RetirementPlanningRgpsPeriodTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps-period.typeorm.entity';
import { RetirementPlanningRgpsTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/retirement-planning-rgps.typeorm.entity';
import { RetirementPlanningRgpsEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/retirement-planning-rgps.entity';
import { RetirementPlanningRgpsPeriodEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/retirement-planning-rgps-period.entity';
import { ValidContributionTimeEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/valid-contribution-time/valid-contribution-time.entity';
import { RetirementPlanningRgpsPeriodId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-period/value-object/retirement-planning-rgps-period-id.value-object';

function parseValidContributionTime(
  json: string | null,
): ValidContributionTimeEntity | null {
  if (json === null || json === '') {
    return null;
  }
  try {
    const parsed = JSON.parse(json) as {
      data?: { dataInicio?: string | Date; dataFim?: string | Date } | null;
      abreviado?: string;
      dias?: number;
      meses?: number;
      anos?: number;
      totalContribuicao?: string | null;
    };
    const data =
      parsed.data !== null && typeof parsed.data === 'object'
        ? {
            dataInicio:
              parsed.data.dataInicio !== undefined
                ? typeof parsed.data.dataInicio === 'string'
                  ? new Date(parsed.data.dataInicio)
                  : parsed.data.dataInicio
                : null,
            dataFim:
              parsed.data.dataFim !== undefined
                ? typeof parsed.data.dataFim === 'string'
                  ? new Date(parsed.data.dataFim)
                  : parsed.data.dataFim
                : null,
          }
        : null;
    return new ValidContributionTimeEntity({
      data,
      abreviado: parsed.abreviado ?? '',
      dias: parsed.dias ?? 0,
      meses: parsed.meses ?? 0,
      anos: parsed.anos ?? 0,
      totalContribuicao: parsed.totalContribuicao ?? null,
    });
  } catch {
    return null;
  }
}

function stringifyValidContributionTime(
  value: ValidContributionTimeEntity | null,
): string | null {
  if (value === null) {
    return null;
  }
  const plain = {
    data: value.data
      ? {
          dataInicio: value.data.dataInicio,
          dataFim: value.data.dataFim,
        }
      : null,
    abreviado: value.abreviado,
    dias: value.dias,
    meses: value.meses,
    anos: value.anos,
    totalContribuicao: value.totalContribuicao,
  };
  return JSON.stringify(plain);
}

@Injectable()
export class RetirementPlanningRgpsPeriodEntityAutoMapperProfile {
  protected readonly _type =
    RetirementPlanningRgpsPeriodEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: RetirementPlanningRgpsPeriodTypeormEntity,
    ): RetirementPlanningRgpsPeriodEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsTypeormEntity,
        RetirementPlanningRgpsEntity,
      );

      const contributionAverage =
        source.contributionAverage !== null
          ? new DecimalValue(source.contributionAverage)
          : null;

      return new RetirementPlanningRgpsPeriodEntity({
        ...source,
        id: new RetirementPlanningRgpsPeriodId(source.id),
        contributionAverage,
        retirementPlanningRgps,
        validContributionTime: parseValidContributionTime(
          source.validContributionTime ?? null,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsPeriodTypeormEntity,
      RetirementPlanningRgpsPeriodEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: RetirementPlanningRgpsPeriodEntity,
    ): RetirementPlanningRgpsPeriodTypeormEntity => {
      const retirementPlanningRgps = this.mapper.map(
        source.retirementPlanningRgps,
        RetirementPlanningRgpsEntity,
        RetirementPlanningRgpsTypeormEntity,
      );

      const contributionAverage =
        source.contributionAverage !== null
          ? source.contributionAverage.toString()
          : null;

      return RetirementPlanningRgpsPeriodTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        contributionAverage,
        retirementPlanningRgps,
        validContributionTime: stringifyValidContributionTime(
          source.validContributionTime,
        ),
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      RetirementPlanningRgpsPeriodEntity,
      RetirementPlanningRgpsPeriodTypeormEntity,
      mappingFunction,
    );
  }
}
