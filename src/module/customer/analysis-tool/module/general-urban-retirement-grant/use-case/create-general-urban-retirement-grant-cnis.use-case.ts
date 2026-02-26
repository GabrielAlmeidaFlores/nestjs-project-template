import { Injectable } from '@nestjs/common';

import { CreateGeneralUrbanRetirementGrantCnisRequestDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/request/create-general-urban-retirement-grant-cnis.request.dto';
import { CreateGeneralUrbanRetirementGrantCnisResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-cnis.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementGrantCnisUseCase {
  protected readonly _type = CreateGeneralUrbanRetirementGrantCnisUseCase.name;

  public async execute(
    _sessionData: SessionDataModel,
    _organizationSessionData: OrganizationSessionDataModel,
    _dto: CreateGeneralUrbanRetirementGrantCnisRequestDto,
  ): Promise<CreateGeneralUrbanRetirementGrantCnisResponseDto> {
    throw new Error(
      'CreateGeneralUrbanRetirementGrantCnisUseCase: Not implemented. Add document CNIS to general urban retirement grant analysis.',
    );
  }
}
