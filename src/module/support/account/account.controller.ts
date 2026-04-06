import { HttpStatus, RequestMethod } from '@nestjs/common';

import { GetAuthenticatedSupportDataResponseDto } from '@module/support/account/dto/response/get-authenticated-support-data.response.dto';
import { GetAuthenticatedSupportDataUseCase } from '@module/support/account/use-case/get-authenticated-support-data.use-case';
import { AuthGuard } from '@shared/api/gateway/guard/auth/auth.guard';
import { SupportControllerRoute } from '@shared/api/util/decorator/class/controller-route/support-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { GetSessionData } from '@shared/api/util/decorator/property/get-session-data/get-session-data.decorator';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@SupportControllerRoute('account')
export class AccountController {
  protected readonly _type = AccountController.name;

  public constructor(
    private readonly getAuthenticatedSupportDataUseCase: GetAuthenticatedSupportDataUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Detalhes da conta de suporte',
    userLevel: [UserLevelEnum.SUPPORT],
    http: {
      path: 'support',
      method: RequestMethod.GET,
    },
    tag: ['conta-do-suporte'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description:
        'Dados da conta de suporte autenticada retornados com sucesso.',
      type: GetAuthenticatedSupportDataResponseDto,
    },
    guard: [AuthGuard],
  })
  public async getAuthenticatedSupportData(
    @GetSessionData() sessionData: SessionDataModel,
  ): Promise<GetAuthenticatedSupportDataResponseDto> {
    return await this.getAuthenticatedSupportDataUseCase.execute(sessionData);
  }
}
