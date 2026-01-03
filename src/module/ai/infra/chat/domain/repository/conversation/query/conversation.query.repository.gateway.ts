import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { ConversationQueryParam } from '@module/ai/infra/chat/domain/repository/conversation/query/param/conversation.query.param';
import type { GetConversationWithRelationsQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation-with-relation.query.result';
import type { GetConversationQueryResult } from '@module/ai/infra/chat/domain/repository/conversation/query/result/get-conversation.query.result';
import type { ConversationId } from '@module/ai/infra/chat/domain/schema/entity/conversation/value-object/conversation-id/conversation-id.value-object';
import type { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';

export abstract class ConversationQueryRepositoryGateway {
  public abstract findById(
    id: ConversationId,
  ): Promise<GetConversationQueryResult | null>;

  public abstract findByIdAndCustomerId(
    id: ConversationId,
    customerId: CustomerId,
  ): Promise<GetConversationWithRelationsQueryResult | null>;

  public abstract listConversationById(
    listData: ConversationQueryParam,
  ): Promise<ListDataOutputModel<GetConversationQueryResult>>;
}
