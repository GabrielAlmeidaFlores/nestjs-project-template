import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationToolPolicyTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation-tool-policy.typeorm.entity';
import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { GetConversationToolPolicyQueryResult } from '@module/ai/chat/domain/repository/conversation-tool-policy/query/result/get-conversation-tool-policy.query.result';
import { ConversationEntity } from '@module/ai/chat/domain/schema/entity/conversation/conversation.entity';
import { ConversationToolPolicyId } from '@module/ai/chat/domain/schema/entity/conversation-tool-policy/value-object/conversation-tool-policy-id/conversation-tool-policy-id.value-object';

@Injectable()
export class GetConversationToolPolicyQueryResultAutoMapperProfile {
  protected readonly _type =
    GetConversationToolPolicyQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToQueryResult();
    this.mapQueryResultToOrmEntity();
  }

  private mapOrmEntityToQueryResult(): void {
    const convertOrmEntityToDomainEntity = (
      source: ConversationToolPolicyTypeormEntity,
    ): GetConversationToolPolicyQueryResult => {
      const conversation = this.mapper.map(
        source.conversation,
        ConversationTypeormEntity,
        ConversationEntity,
      );
      return GetConversationToolPolicyQueryResult.build({
        ...source,
        id: new ConversationToolPolicyId(source.id),
        conversation,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      ConversationToolPolicyTypeormEntity,
      GetConversationToolPolicyQueryResult,
      mappingFunction,
    );
  }

  private mapQueryResultToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetConversationToolPolicyQueryResult,
    ): ConversationToolPolicyTypeormEntity => {
      const conversation = this.mapper.map(
        source.conversation,
        ConversationEntity,
        ConversationTypeormEntity,
      );

      return ConversationToolPolicyTypeormEntity.build({
        id: source.id.toString(),
        toolsEnable: source.toolsEnable ?? null,
        defaultExecutionMode: source.defaultExecutionMode ?? null,
        toolPermission: source.toolPermission ?? null,
        createdAt: source.createdAt,
        updatedAt: new Date(),
        deletedAt: null,
        conversation,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetConversationToolPolicyQueryResult,
      ConversationToolPolicyTypeormEntity,
      mappingFunction,
    );
  }
}
