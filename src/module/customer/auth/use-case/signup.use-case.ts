import { Injectable } from '@nestjs/common';

import { CustomerCommandRepositoryGateway } from '@core/domain/repository/customer/customer/customer.command.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@core/domain/repository/customer/customer/customer.query.repository.gateway';
import { CustomerEntity } from '@core/domain/schema/entity/customer/customer/customer.entity';
import { SignUpRequestDto } from '@module/customer/auth/dto/request/sign-up.request.dto';
import { CustomerEmailAlreadyInUseError } from '@module/customer/auth/error/customer-email-already-in-use.error';

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

    const addressNumberAsString = String(dto.addressNumber);

    const newCustomer = new CustomerEntity({
      ...dto,
      addressNumber: addressNumberAsString,
    });

    await this.customerCommandRepositoryGateway.createCustomer(newCustomer);
  }
}
