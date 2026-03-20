import { HttpStatus, Param, RequestMethod, Res } from '@nestjs/common';
import { FastifyReply } from 'fastify';

import { GetPublicAffiliateCustomerResponseDto } from '@module/customer/affiliate-customer/dto/response/get-public-affiliate-customer.response.dto';
import { AffiliateCustomerId } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/value-object/affiliate-customer-id/affiliate-customer-id.value-object';
import { GetPublicAffiliateCustomerUseCase } from '@module/customer/affiliate-customer/use-case/get-public-affiliate-customer.use-case';
import { CustomerControllerRoute } from '@shared/api/util/decorator/class/controller-route/customer-controller-route.decorator';
import { BuildEndpointSpecification } from '@shared/api/util/decorator/method/build-endpoint-specification/build-endpoint-specification.decorator';
import { ParseValueObjectPipe } from '@shared/api/util/pipe/parse-value-object.pipe';

@CustomerControllerRoute('affiliate-customer')
export class AffiliateCustomerController {
  protected readonly _type = AffiliateCustomerController.name;

  public constructor(
    private readonly getPublicAffiliateCustomerUseCase: GetPublicAffiliateCustomerUseCase,
  ) {}

  @BuildEndpointSpecification({
    summary: 'Buscar informações públicas do afiliado e registrar cookie de indicação',
    http: {
      path: ':affiliateCustomerId',
      method: RequestMethod.GET,
    },
    tag: ['affiliate-customer'],
    successResponse: {
      statusCode: HttpStatus.OK,
      description: 'Informações públicas do afiliado retornadas e cookie de indicação registrado.',
      type: GetPublicAffiliateCustomerResponseDto,
    },
  })
  public async getPublicAffiliateCustomer(
    @Res({ passthrough: true }) reply: FastifyReply,
    @Param('affiliateCustomerId', new ParseValueObjectPipe(AffiliateCustomerId))
    affiliateCustomerId: AffiliateCustomerId,
  ): Promise<GetPublicAffiliateCustomerResponseDto> {
    return this.getPublicAffiliateCustomerUseCase.execute(reply, affiliateCustomerId);
  }
}
