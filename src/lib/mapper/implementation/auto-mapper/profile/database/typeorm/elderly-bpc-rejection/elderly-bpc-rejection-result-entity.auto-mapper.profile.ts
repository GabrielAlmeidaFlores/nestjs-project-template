import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ElderlyBpcRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-result.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/elderly-bpc-rejection-result.entity';
import { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

@Injectable()
export class ElderlyBpcRejectionResultEntityAutoMapperProfile {
  protected readonly _type =
    ElderlyBpcRejectionResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ElderlyBpcRejectionResultTypeormEntity,
    ): ElderlyBpcRejectionResultEntity => {
      if (!source.elderlyBpcRejection) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: ElderlyBpcRejectionResultEntity.name,
          sourceClass: ElderlyBpcRejectionResultTypeormEntity.name,
        });
      }

      return new ElderlyBpcRejectionResultEntity({
        id: new ElderlyBpcRejectionResultId(source.id),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        elderlyBpcRejectionId: new ElderlyBpcRejectionId(
          source.elderlyBpcRejection.id,
        ),
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ElderlyBpcRejectionResultTypeormEntity,
      ElderlyBpcRejectionResultEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ElderlyBpcRejectionResultEntity,
    ): ElderlyBpcRejectionResultTypeormEntity => {
      const elderlyBpcRejection = {
        id: source.elderlyBpcRejectionId.toString(),
      } as ElderlyBpcRejectionTypeormEntity;

      return ElderlyBpcRejectionResultTypeormEntity.build({
        id: source.id.toString(),
        inssDecisionAnalysis: source.inssDecisionAnalysis,
        completeAnalysis: source.completeAnalysis,
        simplifiedAnalysis: source.simplifiedAnalysis,
        elderlyBpcRejection,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      ElderlyBpcRejectionResultEntity,
      ElderlyBpcRejectionResultTypeormEntity,
      mappingFunction,
    );
  }
}
