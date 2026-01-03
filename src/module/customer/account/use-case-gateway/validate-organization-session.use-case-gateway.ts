import type { ValidateOrganizationSessionRequestDto } from '@module/customer/account/dto/request/validate-organization-session.request.dto';
import type { GetOrganizationResponseDto } from '@module/customer/account/dto/response/get-organization.response.dto';

export abstract class ValidateOrganizationSessionUseCaseGateway {
  public abstract execute(
    dto: ValidateOrganizationSessionRequestDto,
  ): Promise<GetOrganizationResponseDto>;
}
