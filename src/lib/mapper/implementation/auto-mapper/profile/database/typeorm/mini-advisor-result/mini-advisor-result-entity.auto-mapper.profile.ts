import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MiniAdvisorResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor-result.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { MiniAdvisorResultEntity } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/mini-advisor-result.entity';
import { MiniAdvisorResultId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { MiniAdvisorId } from '@module/customer/analysis-tool/module/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';

@Injectable()
export class MiniAdvisorResultEntityAutoMapperProfile {
  protected readonly _type = MiniAdvisorResultEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: MiniAdvisorResultTypeormEntity,
    ): MiniAdvisorResultEntity => {
      if (!source.miniAdvisor) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: MiniAdvisorResultEntity.name,
          sourceClass: MiniAdvisorResultTypeormEntity.name,
        });
      }

      return new MiniAdvisorResultEntity({
        id: new MiniAdvisorResultId(source.id),
        miniAdvisorId: new MiniAdvisorId(source.miniAdvisor.id),
        chosenAnalysis: source.chosenAnalysis,
        benefitDescription: source.benefitDescription,
        attentionNote: source.attentionNote,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorResultTypeormEntity,
      MiniAdvisorResultEntity,
      constructUsing(convertOrmEntityToDomainEntity),
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: MiniAdvisorResultEntity,
    ): MiniAdvisorResultTypeormEntity => {
      return MiniAdvisorResultTypeormEntity.build({
        id: source.id.toString(),
        chosenAnalysis: source.chosenAnalysis,
        benefitDescription: source.benefitDescription,
        attentionNote: source.attentionNote,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        deletedAt: source.deletedAt,
      });
    };

    createMap(
      this.mapper,
      MiniAdvisorResultEntity,
      MiniAdvisorResultTypeormEntity,
      constructUsing(convertDomainEntityToOrmEntity),
    );
  }
}
