import { createMap, Mapper, constructUsing } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { ConversationTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/conversation.typeorm.entity';
import { LegalPleadingResultTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/legal-pleading-result.typeorm.entity';
import { GetConversationQueryResult } from '@module/ai/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import { GetLegalPleadingResultQueryResult } from '@module/customer/analysis-tool/domain/repository/legal-pleading-result/query/result/get-legal-pleading-result.query.result';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';

@Injectable()
export class GetLegalPleadingResultQueryResultAutoMapperProfile {
  protected readonly _type =
    GetLegalPleadingResultQueryResultAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: LegalPleadingResultTypeormEntity,
    ): GetLegalPleadingResultQueryResult => {
      const conversation = this.mapper.map(
        source.conversation,
        ConversationTypeormEntity,
        GetConversationQueryResult,
      );

      return GetLegalPleadingResultQueryResult.build({
        ...source,
        id: new LegalPleadingResultId(source.id),
        conversation,
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      LegalPleadingResultTypeormEntity,
      GetLegalPleadingResultQueryResult,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: GetLegalPleadingResultQueryResult,
    ): LegalPleadingResultTypeormEntity => {
      const conversation = this.mapper.map(
        source.conversation,
        GetConversationQueryResult,
        ConversationTypeormEntity,
      );

      return LegalPleadingResultTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        conversation,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      GetLegalPleadingResultQueryResult,
      LegalPleadingResultTypeormEntity,
      mappingFunction,
    );
  }
}
