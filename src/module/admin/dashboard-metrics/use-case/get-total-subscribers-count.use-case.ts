import { Injectable } from '@nestjs/common';

import { TotalSubscribersCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/total-subscribers-count.response.dto';

@Injectable()
export class GetTotalSubscribersCountUseCase {
  protected readonly _type = GetTotalSubscribersCountUseCase.name;

  public execute(): TotalSubscribersCountResponseDto {
    const totalSubscribers = 0;

    return TotalSubscribersCountResponseDto.build({
      totalSubscribers,
    });
  }
}
