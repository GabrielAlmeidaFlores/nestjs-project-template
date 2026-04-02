import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import type { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';
import type { CustomerEmailSentAttachmentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent-attachment/value-object/customer-email-sent-attachment-id/customer-email-sent-attachment-id.value-object';

export interface CustomerEmailSentAttachmentEntityPropsInterface extends BaseEntityPropsInterface<CustomerEmailSentAttachmentId> {
  customerEmailSent: CustomerEmailSentId;
  analysisToolRecord: AnalysisToolRecordId;
}
