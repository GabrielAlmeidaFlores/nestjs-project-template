import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetAudienceQuestionGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/audience-question-generator/domain/repository/audience-question-generator/query/result/get-audience-question-generator-with-relations.query.result';
import type { AudienceQuestionGeneratorId } from '@module/customer/analysis-tool/module/audience-question-generator/domain/schema/entity/audience-question-generator/value-object/audience-question-generator-id/audience-question-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class AudienceQuestionGeneratorQueryRepositoryGateway {
  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<
    ListDataOutputModel<GetAudienceQuestionGeneratorWithRelationsQueryResult>
  >;

  public abstract findOneByAudienceQuestionGeneratorIdAndOrganizationIdOrFail(
    audienceQuestionGeneratorId: AudienceQuestionGeneratorId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetAudienceQuestionGeneratorWithRelationsQueryResult>;
}
