import { Body, HttpStatus, Param, Query, RequestMethod } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { CreateTutorialRequestDto } from '@module/admin/tutorial/dto/request/create-tutorial.request.dto';
import { UpdateTutorialRequestDto } from '@module/admin/tutorial/dto/request/update-tutorial.request.dto';
import { CreateTutorialResponseDto } from '@module/admin/tutorial/dto/response/create-tutorial.response.dto';
import { GetAdminTutorialResponseDto } from '@module/admin/tutorial/dto/response/get-admin-tutorial.response.dto';
import { ListAdminTutorialsResponseDto } from '@module/admin/tutorial/dto/response/list-admin-tutorials.response.dto';
import { CreateTutorialUseCase } from '@module/admin/tutorial/use-case/create-tutorial.use-case';
import { DeleteTutorialUseCase } from '@module/admin/tutorial/use-case/delete-tutorial.use-case';
import { GetAdminTutorialUseCase } from '@module/admin/tutorial/use-case/get-tutorial.use-case';
import { ListAdminTutorialsUseCase } from '@module/admin/tutorial/use-case/list-admin-tutorials.use-case';
import { UpdateTutorialUseCase } from '@module/admin/tutorial/use-case/update-tutorial.use-case';
import { TutorialId } from '@module/customer/tutorial/domain/schema/entity/tutorial/value-object/tutorial-id/tutorial-id.value-object';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('tutorial')
export class AdminTutorialController {
  protected readonly _type = AdminTutorialController.name;

  public constructor(
    private readonly createTutorialUseCase: CreateTutorialUseCase,
    private readonly getAdminTutorialUseCase: GetAdminTutorialUseCase,
    private readonly listAdminTutorialsUseCase: ListAdminTutorialsUseCase,
    private readonly updateTutorialUseCase: UpdateTutorialUseCase,
    private readonly deleteTutorialUseCase: DeleteTutorialUseCase,
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

  @BuildEndpointSpecification({
    summary: 'Listar tutoriais',
    userLevel: [UserLevelEnum.ADMIN],
    http: { path: '', method: RequestMethod.GET },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de tutoriais obtida com sucesso.',
      type: ListAdminTutorialsResponseDto,
    },
    guard: [AuthGuard],
  })
  public async listTutorials(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListAdminTutorialsResponseDto> {
    return this.listAdminTutorialsUseCase.execute(new ListDataInputModel(dto));
  }

  @BuildEndpointSpecification({
    summary: 'Buscar tutorial por ID',
    userLevel: [UserLevelEnum.ADMIN],
    http: { path: ':tutorialId', method: RequestMethod.GET },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Tutorial encontrado com sucesso.',
      type: GetAdminTutorialResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getTutorial(
    @Param('tutorialId', new ParseValueObjectPipe(TutorialId))
    tutorialId: TutorialId,
  ): Promise<GetAdminTutorialResponseDto> {
    return this.getAdminTutorialUseCase.execute(tutorialId);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar tutorial',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: ':tutorialId',
      method: RequestMethod.PATCH,
      type: UpdateTutorialRequestDto,
    },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Tutorial atualizado com sucesso.',
      type: CreateTutorialResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateTutorial(
    @Param('tutorialId', new ParseValueObjectPipe(TutorialId))
    tutorialId: TutorialId,
    @Body() dto: UpdateTutorialRequestDto,
  ): Promise<CreateTutorialResponseDto> {
    return this.updateTutorialUseCase.execute(tutorialId, dto);
  }

  @BuildEndpointSpecification({
    summary: 'Deletar tutorial',
    userLevel: [UserLevelEnum.ADMIN],
    http: { path: ':tutorialId', method: RequestMethod.DELETE },
    tag: ['tutorial'],
    successResponse: {
      statusCode: HttpStatus.NO_CONTENT,
      description: 'Tutorial deletado com sucesso.',
    },
    guard: [AuthGuard],
  })
  public async deleteTutorial(
    @Param('tutorialId', new ParseValueObjectPipe(TutorialId))
    tutorialId: TutorialId,
  ): Promise<void> {
    await this.deleteTutorialUseCase.execute(tutorialId);
  }
}
