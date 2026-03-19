import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { CreateTutorialRequestDto } from '@module/admin/tutorial/dto/request/create-tutorial.request.dto';
import { CreateTutorialResponseDto } from '@module/admin/tutorial/dto/response/create-tutorial.response.dto';
import { CreateTutorialUseCase } from '@module/admin/tutorial/use-case/create-tutorial.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('tutorial')
export class AdminTutorialController {
  protected readonly _type = AdminTutorialController.name;

  public constructor(
    private readonly createTutorialUseCase: CreateTutorialUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Criar tutorial',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: '',
      method: RequestMethod.POST,
      type: CreateTutorialRequestDto,
    },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.CREATED,
      description: 'Tutorial criado com sucesso.',
      type: CreateTutorialResponseDto,
    },
    guard: [AuthGuard],
  })
  public async createTutorial(
    @Body() dto: CreateTutorialRequestDto,
  ): Promise<CreateTutorialResponseDto> {
    return this.createTutorialUseCase.execute(dto);
  }
}
