import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MaternityPayGrantResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/maternity-pay-grant-result.typeorm.entity';
import { MaternityPayGrantResultEntity } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/maternity-pay-grant-result.entity';
import { MaternityPayGrantResultId } from '@module/customer/analysis-tool/module/maternity-pay-grant/domain/schema/entity/maternity-pay-grant-result/value-object/maternity-pay-grant-result-id.value-object';

@Injectable()
export class MaternityPayGrantResultEntityAutoMapperProfile {
  protected readonly _type =
    MaternityPayGrantResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    createMap(
      this.mapper,
      MaternityPayGrantResultTypeormEntity,
      MaternityPayGrantResultEntity,
      constructUsing(
        (
          source: MaternityPayGrantResultTypeormEntity,
        ): MaternityPayGrantResultEntity =>
          new MaternityPayGrantResultEntity({
            id: new MaternityPayGrantResultId(source.id),
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            simplifiedAnalysis: source.simplifiedAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    createMap(
      this.mapper,
      MaternityPayGrantResultEntity,
      MaternityPayGrantResultTypeormEntity,
      constructUsing(
        (
          source: MaternityPayGrantResultEntity,
        ): MaternityPayGrantResultTypeormEntity =>
          MaternityPayGrantResultTypeormEntity.build({
            id: source.id.toString(),
            firstAnalysis: source.firstAnalysis,
            completeAnalysis: source.completeAnalysis,
            simplifiedAnalysis: source.simplifiedAnalysis,
            completeAnalysisDownload: source.completeAnalysisDownload,
            createdAt: source.createdAt,
            updatedAt: source.updatedAt,
            deletedAt: source.deletedAt,
          }),
      ),
    );
  }
}
