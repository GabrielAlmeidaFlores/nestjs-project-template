import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { DeathBenefitGrantTimeAcceleratorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/death-benefit-grant-time-accelerator.typeorm.entity';
import { GetDeathBenefitGrantTimeAcceleratorQueryResult } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/repository/death-benefit-grant-time-accelerator/query/result/get-death-benefit-grant-time-accelerator.query.result';
import { DeathBenefitGrantTimeAcceleratorId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-time-accelerator/value-object/death-benefit-grant-time-accelerator-id.value-object';

@Injectable()
export class GetDeathBenefitGrantTimeAcceleratorQueryResultAutoMapperProfile {
  protected readonly _type =
    GetDeathBenefitGrantTimeAcceleratorQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    createMap(
      this.mapper,
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
      GetDeathBenefitGrantTimeAcceleratorQueryResult,
      constructUsing(
        (
          source: DeathBenefitGrantTimeAcceleratorTypeormEntity,
        ): GetDeathBenefitGrantTimeAcceleratorQueryResult =>
          GetDeathBenefitGrantTimeAcceleratorQueryResult.build({
            id: new DeathBenefitGrantTimeAcceleratorId(source.id),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapQueryResultToOrmEntity(): void {
    createMap(
      this.mapper,
      GetDeathBenefitGrantTimeAcceleratorQueryResult,
      DeathBenefitGrantTimeAcceleratorTypeormEntity,
      constructUsing(
        (
          source: GetDeathBenefitGrantTimeAcceleratorQueryResult,
        ): DeathBenefitGrantTimeAcceleratorTypeormEntity =>
          DeathBenefitGrantTimeAcceleratorTypeormEntity.build({
            id: source.id.toString(),
            type: source.type,
            recognitionInss: source.recognitionInss,
            recognitionJudicial: source.recognitionJudicial,
            viability: source.viability,
            technicalNote: source.technicalNote,
            startDate: source.startDate,
            endDate: source.endDate,
            institution: source.institution,
            affectsQualifyingPeriod: source.affectsQualifyingPeriod,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
