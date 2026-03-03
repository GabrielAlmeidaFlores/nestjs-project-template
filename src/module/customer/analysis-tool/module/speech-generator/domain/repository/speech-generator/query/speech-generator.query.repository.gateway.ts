import type { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import type { ListDataOutputModel } from '@core/domain/repository/base/query/model/output/list-data.output.model';
import type { NotFoundError } from '@core/error/not-found.error';
import type { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import type { GetSpeechGeneratorWithRelationsQueryResult } from '@module/customer/analysis-tool/module/speech-generator/domain/repository/speech-generator/query/result/get-speech-generator-with-relations.query.result';
import type { SpeechGeneratorId } from '@module/customer/analysis-tool/module/speech-generator/domain/schema/entity/speech-generator/value-object/speech-generator-id/speech-generator-id.value-object';
import type { ConstructorType } from '@shared/system/type/constructor.type';

export abstract class SpeechGeneratorQueryRepositoryGateway {
  public abstract findOneBySpeechGeneratorIdAndOrganizationIdWithRelationsOrFail(
    id: SpeechGeneratorId,
    organizationId: OrganizationId,
    err: ConstructorType<NotFoundError>,
  ): Promise<GetSpeechGeneratorWithRelationsQueryResult>;

  public abstract listByOrganizationId(
    organizationId: OrganizationId,
    listData: ListDataInputModel,
  ): Promise<ListDataOutputModel<GetSpeechGeneratorWithRelationsQueryResult>>;
}
