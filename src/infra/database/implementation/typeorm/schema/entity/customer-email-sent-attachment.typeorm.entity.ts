import { Entity, JoinColumn, ManyToOne } from 'typeorm';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { BaseTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/base.typeorm.entity';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';

@Entity({ name: 'customer_email_sent_attachment' })
export class CustomerEmailSentAttachmentTypeormEntity extends BaseTypeormEntity {
  @ManyToOne(() => CustomerEmailSentTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'customer_email_sent_id' })
  public customerEmailSent: CustomerEmailSentTypeormEntity;

  @ManyToOne(() => AnalysisToolRecordTypeormEntity, { nullable: false })
  @JoinColumn({ name: 'analysis_tool_record_id' })
  public analysisToolRecord: AnalysisToolRecordTypeormEntity;

  protected override readonly _type =
    CustomerEmailSentAttachmentTypeormEntity.name;
}
