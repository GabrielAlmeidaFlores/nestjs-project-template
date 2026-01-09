import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { MessageRoleEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-role.enum';
import type { MessageTypeEnum } from '@module/customer/ai-conversation/lib/mcp-tools/enum/message-type.enum';
import type { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';

export class MessageModel extends BaseBuildableObject {
  public id: Guid;
  public conversationId: Guid;
  public role: MessageRoleEnum;
  public type: MessageTypeEnum;
  public content: string;
  public timestamp: Date;
  public paymentPlanPaidResourceType?: PaymentPlanPaidResourceTypeEnum;
  public context?: string;
  public creditCost?: number;

  protected override readonly _type = MessageModel.name;
}
