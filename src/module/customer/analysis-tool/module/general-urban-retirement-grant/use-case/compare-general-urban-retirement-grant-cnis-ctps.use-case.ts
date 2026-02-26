import { Injectable } from '@nestjs/common';

import { CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/compare-general-urban-retirement-grant-cnis-ctps.request.dto';
import { CompareGeneralUrbanRetirementGrantCnisCtpsResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/compare-general-urban-retirement-grant-cnis-ctps.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CompareGeneralUrbanRetirementGrantCnisCtpsUseCase {
  protected readonly _type =
    CompareGeneralUrbanRetirementGrantCnisCtpsUseCase.name;

  public async execute(
    _sessionData: SessionDataModel,
    _organizationSessionData: OrganizationSessionDataModel,
    _dto: CompareGeneralUrbanRetirementGrantCnisCtpsRequestDto,
  ): Promise<CompareGeneralUrbanRetirementGrantCnisCtpsResponseDto> {
    throw new Error(
      'CompareGeneralUrbanRetirementGrantCnisCtpsUseCase: Not implemented. Compare CNIS and CTPS for general urban retirement grant analysis.',
    );
  }
}
