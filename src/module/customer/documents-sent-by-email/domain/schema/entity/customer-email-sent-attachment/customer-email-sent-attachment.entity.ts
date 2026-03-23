import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { CustomerEmailSentAttachmentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent-attachment/value-object/customer-email-sent-attachment-id/customer-email-sent-attachment-id.value-object';

import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';
import type { CustomerEmailSentAttachmentEntityPropsInterface } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent-attachment/customer-email-sent-attachment.entity.props.interface';

export class CustomerEmailSentAttachmentEntity extends BaseEntity<CustomerEmailSentAttachmentId> {
  public readonly customerEmailSent: CustomerEmailSentId;
  public readonly analysisToolRecord: AnalysisToolRecordId;

  protected readonly _type = CustomerEmailSentAttachmentEntity.name;

  public constructor(props: CustomerEmailSentAttachmentEntityPropsInterface) {
    super(CustomerEmailSentAttachmentId, props);

    this.customerEmailSent = props.customerEmailSent;
    this.analysisToolRecord = props.analysisToolRecord;
  }
}
