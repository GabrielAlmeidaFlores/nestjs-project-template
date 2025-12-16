import { Controller, HttpStatus, RequestMethod } from '@nestjs/common';

import { GetAuthenticatedAdminDataResponseDto } from '@module/admin/account/dto/response/get-authenticated-admin-data.response.dto';
import { GetAuthenticatedAdminDataUseCase } from '@module/admin/account/use-case/get-authenticated-admin-data.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Controller('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly getAuthenticatedAdminDataUseCase: GetAuthenticatedAdminDataUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Detalhes do administrador',
    http: {
      path: 'admin',
      method: RequestMethod.GET,
    },
    tag: ['detalhes-do-administrador'],
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
}
