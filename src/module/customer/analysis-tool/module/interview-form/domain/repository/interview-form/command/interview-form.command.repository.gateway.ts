import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { InterviewFormEntity } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/interview-form.entity';
import type { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';

export abstract class InterviewFormCommandRepositoryGateway {
  public abstract createInterviewForm(
    props: InterviewFormEntity,
  ): TransactionType;

  public abstract updateInterviewForm(
    id: InterviewFormId,
    props: InterviewFormEntity,
  ): TransactionType;

  public abstract deleteInterviewForm(id: InterviewFormId): TransactionType;
}
