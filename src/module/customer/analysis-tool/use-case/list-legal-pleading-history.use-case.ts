import { Injectable, Inject } from '@nestjs/common';

import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/legal-pleading-history.query.repository.gateway';
import { ListLegalPleadingHistoryQueryParam } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/param/list-legal-pleading-history.query.param';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ListLegalPleadingHistoryRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading-history.request.dto';
import {
  GetLegalPleadingHistoryItemResponseDto,
  ListLegalPleadingHistoryResponseDto,
} from '@module/customer/analysis-tool/dto/response/list-legal-pleading-history.response.dto';
import { LegalPleadingNotFoundError } from '@module/customer/analysis-tool/error/legal-pleading-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class ListLegalPleadingHistoryUseCase {
  protected readonly _type = ListLegalPleadingHistoryUseCase.name;

  public constructor(
    @Inject(LegalPleadingQueryRepositoryGateway)
    private readonly legalPleadingQueryRepositoryGateway: LegalPleadingQueryRepositoryGateway,
    @Inject(LegalPleadingHistoryQueryRepositoryGateway)
    private readonly legalPleadingHistoryQueryRepositoryGateway: LegalPleadingHistoryQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    legalPleadingId: LegalPleadingId,
    dto: ListLegalPleadingHistoryRequestDto,
  ): Promise<ListLegalPleadingHistoryResponseDto> {
    await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
      legalPleadingId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      LegalPleadingNotFoundError,
    );

    const queryParam = new ListLegalPleadingHistoryQueryParam(dto);

    const data =
      await this.legalPleadingHistoryQueryRepositoryGateway.listByLegalPleadingId(
        legalPleadingId,
        queryParam,
      );

    const resource = data.resource.map((item) =>
      GetLegalPleadingHistoryItemResponseDto.build({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      }),
    );

    return ListLegalPleadingHistoryResponseDto.build({
      ...data,
      resource,
    });
  }
}
