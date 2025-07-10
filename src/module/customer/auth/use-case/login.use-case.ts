import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { FastifyReply } from 'fastify';

import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { LoginRequestDto } from '@module/customer/auth/dto/request/login.request.dto';
import { InvalidLoginCredentialsError } from '@module/customer/auth/error/invalid-login-credentials.error';

@Injectable()
export class LoginUseCase {
  protected readonly _type = LoginUseCase.name;

  public constructor(
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
  ) {}

  public async execute(
    reply: FastifyReply,
    dto: LoginRequestDto,
  ): Promise<void> {
    const identifier = dto.email ?? dto.federalDocument;

    if (!identifier) {
      throw new InvalidLoginCredentialsError();
    }

    const customer =
      await this.customerQueryRepositoryGateway.findCustomerByEmailOrFederalDocument(
        identifier,
      );

    if (!customer) {
      throw new InvalidLoginCredentialsError();
    }

    const isPasswordRight = await bcrypt.compare(
      dto.password,
      customer.password.toString(),
    );

    if (!isPasswordRight) {
      throw new InvalidLoginCredentialsError();
    }
  }
}
