import { Injectable } from '@nestjs/common';

// import { CustomerSignUpRequestDto } from '@module/customer/account/dto/request/customer-sign-up.request.dto';
// import { CustomerSignUpResponseDto } from '@module/customer/account/dto/response/customer-sign-up.response.dto';

@Injectable()
export class CustomerSignUpUseCase {
  protected readonly _type = CustomerSignUpUseCase.name;

  // public execute(
  //   dto: CustomerSignUpRequestDto,
  // ): Promise<CustomerSignUpResponseDto> {}
}
