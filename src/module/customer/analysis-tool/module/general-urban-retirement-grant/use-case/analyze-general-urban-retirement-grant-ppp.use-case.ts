import { Injectable } from '@nestjs/common';

import { AnalyzeGeneralUrbanRetirementGrantPppRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/analyze-general-urban-retirement-grant-ppp.request.dto';
import { AnalyzeGeneralUrbanRetirementGrantPppResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/analyze-general-urban-retirement-grant-ppp.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzeGeneralUrbanRetirementGrantPppUseCase {
  protected readonly _type = AnalyzeGeneralUrbanRetirementGrantPppUseCase.name;

  public async execute(
    _sessionData: SessionDataModel,
    _organizationSessionData: OrganizationSessionDataModel,
    _dto: AnalyzeGeneralUrbanRetirementGrantPppRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantPppResponseDto> {
    throw new Error(
      'AnalyzeGeneralUrbanRetirementGrantPppUseCase: Not implemented.',
    );
  }
}
