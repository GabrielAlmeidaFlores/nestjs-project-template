import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { MiniAdvisorEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/mini-advisor.entity';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';

@Injectable()
export class MiniAdvisorEntityAutoMapperProfile {
  protected readonly _type = MiniAdvisorEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MiniAdvisorTypeormEntity,
    ): MiniAdvisorEntity => {
      if (!source.analysisToolRecord?.analysisToolClient) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MiniAdvisorEntity.name,
          sourceClass: MiniAdvisorTypeormEntity.name,
        });
      }

      const miniAdvisorResult = source.miniAdvisorResult
        ? this.mapper.map(
            source.miniAdvisorResult,
            MiniAdvisorResultTypeormEntity,
            MiniAdvisorResultEntity,
          )
        : null;

      return new MiniAdvisorEntity({
        id: new MiniAdvisorId(source.id),
        analysisToolClientId: new AnalysisToolClientId(
          source.analysisToolRecord.analysisToolClient.id,
        ),
        clientSituation: source.clientSituation,
        clientAge: source.clientAge,
        clientGender: source.clientGender,
        clientWorkHistory: source.clientWorkHistory,
        hasContributedWithInss: source.hasContributedWithInss,
        clientHasDisabilityOrLimitations: source.clientHasDisabilityOrLimitations,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        miniAdvisorResult,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorTypeormEntity,
      MiniAdvisorEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MiniAdvisorEntity,
    ): MiniAdvisorTypeormEntity => {
      const miniAdvisorResult = source.miniAdvisorResult
        ? this.mapper.map(
            source.miniAdvisorResult,
            MiniAdvisorResultEntity,
            MiniAdvisorResultTypeormEntity,
          )
        : undefined;

      return MiniAdvisorTypeormEntity.build({
        id: source.id.toString(),
        clientSituation: source.clientSituation,
        clientAge: source.clientAge,
        clientGender: source.clientGender,
        clientWorkHistory: source.clientWorkHistory,
        hasContributedWithInss: source.hasContributedWithInss,
        clientHasDisabilityOrLimitations: source.clientHasDisabilityOrLimitations,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
        miniAdvisorResult,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorEntity,
      MiniAdvisorTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
