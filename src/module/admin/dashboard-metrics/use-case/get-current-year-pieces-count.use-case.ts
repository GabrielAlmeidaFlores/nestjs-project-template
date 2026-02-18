import { Injectable } from '@nestjs/common';

import { CurrentYearPiecesCountResponseDto } from '@module/admin/dashboard-metrics/dto/response/current-year-pieces-count.response.dto';

@Injectable()
export class GetCurrentYearPiecesCountUseCase {
  protected readonly _type = GetCurrentYearPiecesCountUseCase.name;

  public execute(): CurrentYearPiecesCountResponseDto {
    const year = new Date().getFullYear();

    // TODO: Need to query initial-petition-generator and full-opinion-generator tables
    // For now, return 0
    const totalPieces = 0;

    return CurrentYearPiecesCountResponseDto.build({
      totalPieces,
      year,
    });
  }
}
