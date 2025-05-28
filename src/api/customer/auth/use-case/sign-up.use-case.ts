import { Injectable } from '@nestjs/common';

import { SignUpRequestDto } from '@api/customer/auth/dto/request/signup.request.dto';
import { CustomerEmailAlreadyInUseError } from '@api/customer/auth/error/customer-email-already-in-use.error';
import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer.entity';

@Injectable()
export class SignUpUseCase {
  protected readonly _type = SignUpUseCase.name;

  public constructor(
    private readonly customerQueryRepositoryGateway: CustomerQueryRepositoryGateway,
    private readonly customerCommandRepositoryGateway: CustomerCommandRepositoryGateway,
  ) {}

  public async execute(dto: SignUpRequestDto): Promise<void> {
    const customerAlreadyExists =
      await this.customerQueryRepositoryGateway.findCustomerByEmail(dto.email);

    if (customerAlreadyExists) {
      throw new CustomerEmailAlreadyInUseError();
    }

    // const newCustomer = CustomerEntity.build(dto);

    // await this.customerCommandRepositoryGateway.createCustomer(newCustomer);
  }
}
