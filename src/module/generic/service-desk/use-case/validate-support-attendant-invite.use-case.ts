import { Inject, Injectable } from '@nestjs/common';

import { CacheStorageGateway } from '@infra/cache-storage/cache-storage.gateway';
import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportAttendantInviteNotFoundError } from '@module/customer/service-desk/error/support-attendant-invite-not-found.error';
import { ValidateSupportAttendantInviteRequestDto } from '@module/generic/service-desk/dto/request/validate-support-attendant-invite.request.dto';
import { ValidateSupportAttendantInviteResponseDto } from '@module/generic/service-desk/dto/response/validate-support-attendant-invite.response.dto';

interface InviteDataInterface {
  name: string;
  email: string;
  supportType: SupportTypeEnum;
}

@Injectable()
export class ValidateSupportAttendantInviteUseCase {
  protected readonly _type = ValidateSupportAttendantInviteUseCase.name;

  public constructor(
    @Inject(CacheStorageGateway)
    private readonly cacheStorageGateway: CacheStorageGateway,
  ) {}

  public async execute(
    dto: ValidateSupportAttendantInviteRequestDto,
  ): Promise<ValidateSupportAttendantInviteResponseDto> {
    const inviteData = await this.fetchInviteDataOrThrow(dto.inviteCode);

    return ValidateSupportAttendantInviteResponseDto.build({
      name: inviteData.name,
      email: inviteData.email,
      supportType: inviteData.supportType,
    });
  }

  private async fetchInviteDataOrThrow(
    inviteCode: string,
  ): Promise<InviteDataInterface> {
    const raw = await this.cacheStorageGateway.getData(
      this.buildInviteDataKey(inviteCode),
    );

    if (raw === null) {
      throw new SupportAttendantInviteNotFoundError();
    }

    return JSON.parse(raw) as InviteDataInterface;
  }

  private buildInviteDataKey(code: string): string {
    return `supportInviteData:${code}`;
  }
}
