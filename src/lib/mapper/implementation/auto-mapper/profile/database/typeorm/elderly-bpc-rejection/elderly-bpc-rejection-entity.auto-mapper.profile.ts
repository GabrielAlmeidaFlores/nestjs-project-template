import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ElderlyBpcRejectionResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection-result.typeorm.entity';
import { ElderlyBpcRejectionTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/elderly-bpc-rejection.typeorm.entity';
import { ElderlyBpcRejectionEntity } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/elderly-bpc-rejection.entity';
import { ElderlyBpcRejectionId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection/value-object/elderly-bpc-rejection-id/elderly-bpc-rejection-id.value-object';
import { ElderlyBpcRejectionResultId } from '@module/customer/analysis-tool/module/elderly-bpc-rejection/domain/schema/entity/elderly-bpc-rejection-result/value-object/elderly-bpc-rejection-result-id/elderly-bpc-rejection-result-id.value-object';

@Injectable()
export class ElderlyBpcRejectionEntityAutoMapperProfile {
  protected readonly _type = ElderlyBpcRejectionEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: ElderlyBpcRejectionTypeormEntity,
    ): ElderlyBpcRejectionEntity => {
      const elderlyBpcRejectionResultId =
        source.elderlyBpcRejectionResult !== undefined &&
        source.elderlyBpcRejectionResult !== null
          ? new ElderlyBpcRejectionResultId(source.elderlyBpcRejectionResult.id)
          : null;

      return new ElderlyBpcRejectionEntity({
        id: new ElderlyBpcRejectionId(source.id),
        analysisName: source.analysisName,
        category: source.category,
        maritalStatus: source.maritalStatus,
        applicantLivesAlone: source.applicantLivesAlone,
        elderlyBpcRejectionResultId,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ElderlyBpcRejectionTypeormEntity,
      ElderlyBpcRejectionEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: ElderlyBpcRejectionEntity,
    ): ElderlyBpcRejectionTypeormEntity => {
      const elderlyBpcRejectionResult =
        source.elderlyBpcRejectionResultId !== null
          ? ({
              id: source.elderlyBpcRejectionResultId.toString(),
            } as ElderlyBpcRejectionResultTypeormEntity)
          : null;

      return ElderlyBpcRejectionTypeormEntity.build({
        id: source.id.toString(),
        analysisName: source.analysisName,
        category: source.category,
        maritalStatus: source.maritalStatus,
        applicantLivesAlone: source.applicantLivesAlone,
        elderlyBpcRejectionResult,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      ElderlyBpcRejectionEntity,
      ElderlyBpcRejectionTypeormEntity,
      mappingFunction,
    );
  }
}
