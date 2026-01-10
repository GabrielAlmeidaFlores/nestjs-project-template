import { Injectable, Inject } from '@nestjs/common';

import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { LegalPleadingHistoryQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/legal-pleading-history/query/legal-pleading-history.query.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import {
  ListLegalPleadingHistoryItemResponseDto,
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
  ): Promise<ListLegalPleadingHistoryResponseDto> {
    await this.legalPleadingQueryRepositoryGateway.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
      legalPleadingId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      LegalPleadingNotFoundError,
    );

    const historyList =
      await this.legalPleadingHistoryQueryRepositoryGateway.findManyLegalPleadingHistoryByLegalPleadingId(
        legalPleadingId,
      );

    const history = historyList.map((item) =>
      ListLegalPleadingHistoryItemResponseDto.build({
        id: item.id.toString(),
        title: item.title,
        description: item.description,
        createdAt: item.createdAt,
      }),
    );

    return ListLegalPleadingHistoryResponseDto.build({
      history,
    });
  }
}
