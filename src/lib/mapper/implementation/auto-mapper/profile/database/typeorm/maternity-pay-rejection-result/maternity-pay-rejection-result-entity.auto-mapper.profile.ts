import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-rejection-result.typeorm.entity';
import { MaternityPayRejectionResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/maternity-pay-rejection-result.entity';
import { MaternityPayRejectionResultId } from '@module/customer/analysis-tool/module/maternity-pay-rejection/domain/schema/entity/maternity-pay-rejection-result/value-object/maternity-pay-rejection-result-id.value-object';

@Injectable()
export class MaternityPayRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayRejectionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convert = (
      source: MaternityPayRejectionResultTypeormEntity,
    ): MaternityPayRejectionResultEntity => {
      return new MaternityPayRejectionResultEntity({
        id: new MaternityPayRejectionResultId(source.id),
        firstAnalysis: source.firstAnalysis,
        secondAnalysis: source.secondAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionResultTypeormEntity,
      MaternityPayRejectionResultEntity,
      constructUsing(convert),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convert = (
      source: MaternityPayRejectionResultEntity,
    ): MaternityPayRejectionResultTypeormEntity => {
      return MaternityPayRejectionResultTypeormEntity.build({
        id: source.id.toString(),
        firstAnalysis: source.firstAnalysis,
        secondAnalysis: source.secondAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MaternityPayRejectionResultEntity,
      MaternityPayRejectionResultTypeormEntity,
      constructUsing(convert),
    );
  }
}
