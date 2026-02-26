import { Injectable } from '@nestjs/common';

import { AnalyzeGeneralUrbanRetirementGrantCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/analyze-general-urban-retirement-grant-cnis.request.dto';
import { AnalyzeGeneralUrbanRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/analyze-general-urban-retirement-grant-cnis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class AnalyzePublicServiceUseCase {
  protected readonly _type = AnalyzePublicServiceUseCase.name;

  public async execute(
    _sessionData: SessionDataModel,
    _organizationSessionData: OrganizationSessionDataModel,
    _dto: AnalyzeGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<AnalyzeGeneralUrbanRetirementGrantCnisResponseDto> {
    throw new Error(
      'AnalyzePublicServiceUseCase (general-urban-retirement-grant): Not implemented.',
    );
  }
}
