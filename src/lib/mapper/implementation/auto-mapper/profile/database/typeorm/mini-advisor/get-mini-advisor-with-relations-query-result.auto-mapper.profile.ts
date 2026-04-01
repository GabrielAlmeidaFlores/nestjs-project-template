import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { MiniAdvisorTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/mini-advisor.typeorm.entity';
import { IncompleteSourceDataForMappingError } from '@lib/mapper/error/incomplete-source-data-for-mapping.error';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { MiniAdvisorResultId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor-result/value-object/mini-advisor-result-id.value-object';
import { GetMiniAdvisorResultQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor-result/query/result/get-mini-advisor-result.query.result';
import { GetMiniAdvisorWithRelationsQueryResult } from '@module/customer/mini-advisor/domain/repository/mini-advisor/query/result/get-mini-advisor-with-relations.query.result';

@Injectable()
export class GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile {
  protected readonly _type =
    GetMiniAdvisorWithRelationsQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly _mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToQueryResult = (
      source: MiniAdvisorTypeormEntity,
    ): GetMiniAdvisorWithRelationsQueryResult => {
      if (!source.createdBy || !source.updatedBy) {
        throw new IncompleteSourceDataForMappingError({
          destinationClass: GetMiniAdvisorWithRelationsQueryResult.name,
          sourceClass: MiniAdvisorTypeormEntity.name,
        });
      }

      const miniAdvisorResult = source.miniAdvisorResult
        ? GetMiniAdvisorResultQueryResult.build({
            id: new MiniAdvisorResultId(source.miniAdvisorResult.id),
            miniAdvisorId: new MiniAdvisorId(source.id),
            chosenAnalysis: source.miniAdvisorResult.chosenAnalysis,
            benefitDescription: source.miniAdvisorResult.benefitDescription,
            attentionNote: source.miniAdvisorResult.attentionNote,
            createdAt: source.miniAdvisorResult.createdAt,
            updatedAt: source.miniAdvisorResult.updatedAt,
          })
        : null;

      return GetMiniAdvisorWithRelationsQueryResult.build({
        id: new MiniAdvisorId(source.id),
        createdById: new OrganizationMemberId(source.createdBy.id),
        updatedById: new OrganizationMemberId(source.updatedBy.id),
        clientSituation: source.clientSituation,
        clientAge: source.clientAge,
        clientGender: source.clientGender,
        clientWorkHistory: source.clientWorkHistory,
        hasContributedWithInss: source.hasContributedWithInss,
        clientHasDisabilityOrLimitations: source.clientHasDisabilityOrLimitations,
        createdAt: source.createdAt,
        updatedAt: source.updatedAt,
        miniAdvisorResult,
      });
    };

    createMap(
      this._mapper,
      MiniAdvisorTypeormEntity,
      GetMiniAdvisorWithRelationsQueryResult,
      constructUsing(convertOrmEntityToQueryResult),
    );
  }
}
