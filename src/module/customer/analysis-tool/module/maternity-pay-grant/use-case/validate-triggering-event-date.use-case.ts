import { Injectable } from '@nestjs/common';

import { ValidateTriggeringEventDateRequestDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/request/validate-triggering-event-date.request.dto';
import { ValidateTriggeringEventDateResponseDto } from '@module/customer/analysis-tool/module/maternity-pay-grant/dto/response/validate-triggering-event-date.response.dto';

@Injectable()
export class ValidateTriggeringEventDateUseCase {
  protected readonly _type = ValidateTriggeringEventDateUseCase.name;

  private readonly maxYears = 5;

  public execute(
    dto: ValidateTriggeringEventDateRequestDto,
  ): ValidateTriggeringEventDateResponseDto {
    const isValid = this.isWithinFiveYears(dto.triggeringEventDate);

    return ValidateTriggeringEventDateResponseDto.build({ isValid });
  }

  private isWithinFiveYears(date: Date): boolean {
    const today = new Date();
    const limitDate = new Date(today);
    limitDate.setFullYear(today.getFullYear() - this.maxYears);

    return date >= limitDate && date <= today;
  }
}
