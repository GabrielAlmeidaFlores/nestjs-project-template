import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AccidentAssistanceGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.typeorm.entity';
import { AccidentAssistanceGrantResultEntity } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/accident-assistance-grant-result.entity';
import { AccidentAssistanceGrantResultId } from '@module/customer/analysis-tool/module/accident-assistance-grant/domain/schema/entity/accident-assistance-grant-result/value-object/accident-assistance-grant-result-id.value-object';

@Injectable()
export class AccidentAssistanceGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    AccidentAssistanceGrantResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantResultTypeormEntity,
    ): AccidentAssistanceGrantResultEntity => {
      return new AccidentAssistanceGrantResultEntity({
        id: new AccidentAssistanceGrantResultId(source.id),
        firstAnalysis: source.firstAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        completeAnalysis: source.completeAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantResultTypeormEntity,
      AccidentAssistanceGrantResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: AccidentAssistanceGrantResultEntity,
    ): AccidentAssistanceGrantResultTypeormEntity => {
      return AccidentAssistanceGrantResultTypeormEntity.build({
        id: source.id.toString(),
        firstAnalysis: source.firstAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        completeAnalysis: source.completeAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      AccidentAssistanceGrantResultEntity,
      AccidentAssistanceGrantResultTypeormEntity,
      constructUsing(convert),
    );
  }
}
