import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListSystemLogsResponseDto } from '@module/admin/system-logs/dto/response/list-system-logs.response.dto';
import { ListSystemLogsErrorsUseCase } from '@module/admin/system-logs/use-case/list-system-logs-errors.use-case';
import { ListSystemLogsSuccessUseCase } from '@module/admin/system-logs/use-case/list-system-logs-success.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('system-logs')
export class SystemLogsController {
  protected readonly _type = SystemLogsController.name;

  public constructor(
    private readonly listSystemLogsSuccessUseCase: ListSystemLogsSuccessUseCase,
    private readonly listSystemLogsErrorsUseCase: ListSystemLogsErrorsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar logs de sucesso (paginado, mais recentes primeiro)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'successes',
      method: RequestMethod.GET,
    },
    tag: ['system-logs'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Logs de sucesso obtidos com sucesso.',
      type: ListSystemLogsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listSuccesses(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListSystemLogsResponseDto> {
    return this.listSystemLogsSuccessUseCase.execute(
      new ListDataInputModel(dto),
    );
  }

  @BuildEndpointSpecification({
    summary: 'Listar logs de erro (paginado, mais recentes primeiro)',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'errors',
      method: RequestMethod.GET,
    },
    tag: ['system-logs'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Logs de erro obtidos com sucesso.',
      type: ListSystemLogsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listErrors(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListSystemLogsResponseDto> {
    return this.listSystemLogsErrorsUseCase.execute(
      new ListDataInputModel(dto),
    );
  }
}
