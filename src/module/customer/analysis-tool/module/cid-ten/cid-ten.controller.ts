import { RequestMethod, HttpStatus, Query } from '@nestjs/common';

import { ListCidTenResponseDto } from '@module/customer/analysis-tool/module/cid-ten/dto/response/list-cid-ten.response.dto';
import { ListCidTenUseCase } from '@module/customer/analysis-tool/module/cid-ten/use-case/list-cid-ten.use-case';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@CustomerControllerRoute('analysis-tool/cid-ten')
export class CidTenController {
  protected readonly _type = CidTenController.name;

  public constructor(private readonly listCidTenUseCase: ListCidTenUseCase) {}

  @BuildEndpointSpecification({
    summary: 'Listar CID-10',
    userLevel: [UserLevelEnum.CUSTOMER],
    http: {
      path: '',
      method: RequestMethod.GET,
    },
    tag: ['cid-ten'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Lista de CID-10 retornada com sucesso.',
      type: ListCidTenResponseDto,
    },
  })
  public async listCidTen(
    @Query() dto: ListDataRequestDto,
  ): Promise<ListCidTenResponseDto> {
    return await this.listCidTenUseCase.execute(dto);
  }
}
