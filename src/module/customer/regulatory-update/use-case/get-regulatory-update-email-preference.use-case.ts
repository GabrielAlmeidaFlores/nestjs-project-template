import { Inject, Injectable } from '@nestjs/common';

import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { RegulatoryUpdateEmailPreferenceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity';
import { GetRegulatoryUpdateEmailPreferenceResponseDto } from '@module/customer/regulatory-update/dto/response/get-regulatory-update-email-preference.response.dto';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRegulatoryUpdateEmailPreferenceUseCase {
  protected readonly _type = GetRegulatoryUpdateEmailPreferenceUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(RegulatoryUpdateEmailPreferenceQueryRepositoryGateway)
    private readonly emailPreferenceQueryRepository: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
  ): Promise<GetRegulatoryUpdateEmailPreferenceResponseDto> {
    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const preference =
      await this.emailPreferenceQueryRepository.findOneByCustomerId(
        customer.id,
      );

    const entity =
      preference ??
      new RegulatoryUpdateEmailPreferenceEntity({
        customerId: customer.id,
        emailEnabled: false,
      });

    return GetRegulatoryUpdateEmailPreferenceResponseDto.build({
      regulatoryUpdateEmailPreferenceId: entity.id,
      emailEnabled: entity.emailEnabled,
    });
  }
}
