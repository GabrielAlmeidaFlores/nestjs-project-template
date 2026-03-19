import { HttpStatus, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { ListTutorialsResponseDto } from '@module/customer/tutorial/dto/response/list-tutorials.response.dto';
import { ListTutorialsUseCase } from '@module/customer/tutorial/use-case/list-tutorials.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('tutorial')
export class CustomerTutorialController {
  protected readonly _type = CustomerTutorialController.name;

  public constructor(
    private readonly listTutorialsUseCase: ListTutorialsUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Listar tutoriais',
    userLevel: [UserLevelEnum.CUSTOMER, UserLevelEnum.ADMIN],
    http: { path: '', method: RequestMethod.GET },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de tutoriais obtida com sucesso.',
      type: ListTutorialsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTutorials(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListTutorialsResponseDto> {
    return this.listTutorialsUseCase.execute(new ListDataInputModel(dto));
  }
}
