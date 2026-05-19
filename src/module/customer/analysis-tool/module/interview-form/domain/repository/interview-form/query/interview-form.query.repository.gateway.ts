import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { GetInterviewFormQueryResult } from '@module/customer/analysis-tool/module/interview-form/domain/repository/interview-form/query/result/get-interview-form.query.result';
import type { InterviewFormId } from '@module/customer/analysis-tool/module/interview-form/domain/schema/entity/interview-form/value-object/interview-form-id/interview-form-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class InterviewFormQueryRepositoryGateway {
  public abstract findOneByInterviewFormIdAndOrganizationIdOrFail(
    id: InterviewFormId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetInterviewFormQueryResult>;

  public abstract findOneByAnalysisToolClientIdAndOrganizationId(
    analysisToolClientId: AnalysisToolClientId,
    organizationId: OrganizationId,
  ): Promise<GetInterviewFormQueryResult | null>;
}
