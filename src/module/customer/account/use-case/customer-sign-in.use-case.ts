import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { UserTempDataGateway } from '@lib/user-temp-data/user-temp-data.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id.value-object';
import { CustomerSignInRequestDto } from '@module/customer/account/dto/request/customer-sign-in.request.dto';
import { CustomerSignInResponseDto } from '@module/customer/account/dto/response/customer-sign-in.response.dto';
import { WrongSignInCredentialsError } from '@module/customer/account/error/wrong-sign-in-credentials.error';
import { NodeApplicationVariable } from '@shared/system/constant/application-variable/source/node.application-variable';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

@Injectable()
export class CustomerSignInUseCase {
  protected readonly _type = CustomerSignInUseCase.name;

  public constructor(
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly userSessionGateway: UserTempDataGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: CustomerSignInRequestDto,
  ): Promise<CustomerSignInResponseDto> {
    const identifier = dto.federalDocument ?? dto.email;

    if (!identifier) {
      throw new WrongSignInCredentialsError();
    }

    const customers =
      await this.customerQueryRepositoryGateway.findCustomersByEmailOrFederalDocument(
        identifier,
      );

    const customer = customers.find((customerData) => {
      const isPasswordRight = bcrypt.compareSync(
        dto.password,
        customerData.password.toString(),
      );

      return isPasswordRight;
    });

    if (!customer) {
      throw new WrongSignInCredentialsError();
    }

    await this.setAuthTokenCookie(reply, customer.id);

    return CustomerSignInResponseDto.build({
      userLevel: UserLevelEnum.CUSTOMER,
    });
  }

  private async setAuthTokenCookie(
    reply: FastifyReply,
    customerId: CustomerId,
  ): Promise<void> {
    const userSession =
      await this.userSessionGateway.createCustomerSession(customerId);

    const userSessionAsString = userSession.toString();
    const sevenDaysInSeconds = 604800;

    reply.setCookie('auth_token', userSessionAsString, {
      httpOnly: true,
      secure: NodeApplicationVariable.PRODUCTION_ENVIRONMENT,
      sameSite: 'lax',
      path: '/',
      maxAge: sevenDaysInSeconds,
    });
  }
}
