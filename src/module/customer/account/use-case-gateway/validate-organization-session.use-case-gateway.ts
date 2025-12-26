import type { ValidateOrganizationSessionRequestDto } from '@module/customer/account/dto/request/validate-organization-session.request.dto';
import type { GetOrganizationSessionDataResponseDto } from '@module/customer/account/dto/response/get-organization-session-data.response.dto';

export abstract class ValidateOrganizationSessionUseCaseGateway {
  public abstract execute(
    dto: ValidateOrganizationSessionRequestDto,
  ): Promise<GetOrganizationSessionDataResponseDto>;
}
