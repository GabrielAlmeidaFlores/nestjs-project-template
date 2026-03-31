import { Inject, Injectable } from '@nestjs/common';

import { SupportAttendantQueryRepositoryGateway } from '@module/customer/service-desk/domain/repository/support-attendant/query/support-attendant.query.repository.gateway';
import { GetSupportAttendantProfileResponseDto } from '@module/customer/service-desk/dto/response/get-support-attendant-profile.response.dto';
import { SupportAttendantNotFoundError } from '@module/customer/service-desk/error/support-attendant-not-found.error';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class GetSupportAttendantProfileUseCase {
  protected readonly _type = GetSupportAttendantProfileUseCase.name;

  public constructor(
    @Inject(SupportAttendantQueryRepositoryGateway)
    private readonly supportAttendantQueryRepositoryGateway: SupportAttendantQueryRepositoryGateway,
  ) {}

  public async execute(
    authIdentityId: AuthIdentityId,
  ): Promise<GetSupportAttendantProfileResponseDto> {
    const attendant =
      await this.supportAttendantQueryRepositoryGateway.findOneSupportAttendantByAuthIdentityId(
        authIdentityId,
      );

    if (!attendant) {
      throw new SupportAttendantNotFoundError();
    }

    return GetSupportAttendantProfileResponseDto.build({
      supportAttendantId: attendant.id,
      name: attendant.name,
      email: attendant.email,
      supportType: attendant.supportType,
    });
  }
}
