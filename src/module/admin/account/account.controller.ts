import { Body, HttpStatus, RequestMethod } from '@nestjs/common';

import { UpdateAdminRequestDto } from '@module/admin/account/dto/request/update-admin.request.dto';
import { GetAuthenticatedAdminDataResponseDto } from '@module/admin/account/dto/response/get-authenticated-admin-data.response.dto';
import { UpdateAdminResponseDto } from '@module/admin/account/dto/response/update-admin.response.dto';
import { GetAuthenticatedAdminDataUseCase } from '@module/admin/account/use-case/get-authenticated-admin-data.use-case';
import { UpdateAdminUseCase } from '@module/admin/account/use-case/update-admin.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { AdminControllerRoute } from '@shared/api/util/decorator/class/controller-route/admin-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@AdminControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly getAuthenticatedAdminDataUseCase: GetAuthenticatedAdminDataUseCase,
    private readonly updateAdminUseCase: UpdateAdminUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Detalhes do administrador',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'admin',
      method: RequestMethod.GET,
    },
    tag: ['conta-do-administrador'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do administrador autenticado retornados com sucesso.',
      type: GetAuthenticatedAdminDataResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getAuthenticatedAdminData(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetAuthenticatedAdminDataResponseDto> {
    return await this.getAuthenticatedAdminDataUseCase.execute(sessionData);
  }

  @BuildEndpointSpecification({
    summary: 'Atualizar dados do administrador',
    userLevel: [UserLevelEnum.ADMIN],
    http: {
      path: 'admin',
      method: RequestMethod.PATCH,
      type: UpdateAdminRequestDto,
    },
    tag: ['conta-do-administrador'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Dados do administrador atualizados com sucesso.',
      type: UpdateAdminResponseDto,
    },
    guard: [AuthGuard],
  })
  public async updateAdmin(
    @GetSessionData() sessionData: SessionDataModel,
    @Body() dto: UpdateAdminRequestDto,
  ): Promise<UpdateAdminResponseDto> {
    return await this.updateAdminUseCase.execute(sessionData, dto);
  }
}
