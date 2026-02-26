import { Injectable } from '@nestjs/common';

import { GeneralUrbanRetirementGrantId } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/domain/schema/entity/general-urban-retirement-grant/value-object/general-urban-retirement-grant-id.value-object';
import { CreateGeneralUrbanRetirementGrantResultResponseDto } from '@module/customer/analysis-tool/module/general-urban-retirement-grant/dto/response/create-general-urban-retirement-grant-result.response.dto';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateGeneralUrbanRetirementGrantResultUseCase {
  protected readonly _type =
    CreateGeneralUrbanRetirementGrantResultUseCase.name;

  public async execute(
    _generalUrbanRetirementGrantId: GeneralUrbanRetirementGrantId,
    _sessionData: SessionDataModel,
    _organizationSessionData: OrganizationSessionDataModel,
  ): Promise<CreateGeneralUrbanRetirementGrantResultResponseDto> {
    throw new Error(
      'CreateGeneralUrbanRetirementGrantResultUseCase: Not implemented. Create and persist general urban retirement grant analysis result.',
    );
  }
}
