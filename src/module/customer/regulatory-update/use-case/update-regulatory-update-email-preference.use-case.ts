import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { CustomerNotFoundError } from '@module/customer/account/error/customer-not-found-error.error';
import { RegulatoryUpdateEmailPreferenceCommandRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/command/regulatory-update-email-preference.command.repository.gateway';
import { RegulatoryUpdateEmailPreferenceQueryRepositoryGateway } from '@module/customer/regulatory-update/domain/repository/regulatory-update-email-preference/query/regulatory-update-email-preference.query.repository.gateway';
import { RegulatoryUpdateEmailPreferenceEntity } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/regulatory-update-email-preference.entity';
import { UpdateRegulatoryUpdateEmailPreferenceRequestDto } from '@module/customer/regulatory-update/dto/request/update-regulatory-update-email-preference.request.dto';
import { UpdateRegulatoryUpdateEmailPreferenceResponseDto } from '@module/customer/regulatory-update/dto/response/update-regulatory-update-email-preference.response.dto';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRegulatoryUpdateEmailPreferenceUseCase {
  protected readonly _type = UpdateRegulatoryUpdateEmailPreferenceUseCase.name;

  public constructor(
    @Inject(CustomerQueryRepositoryGateway)
    private readonly customerQueryRepository: CustomerQueryRepositoryGateway,
    @Inject(RegulatoryUpdateEmailPreferenceQueryRepositoryGateway)
    private readonly emailPreferenceQueryRepository: RegulatoryUpdateEmailPreferenceQueryRepositoryGateway,
    @Inject(RegulatoryUpdateEmailPreferenceCommandRepositoryGateway)
    private readonly emailPreferenceCommandRepository: RegulatoryUpdateEmailPreferenceCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    dto: UpdateRegulatoryUpdateEmailPreferenceRequestDto,
  ): Promise<UpdateRegulatoryUpdateEmailPreferenceResponseDto> {
    const customer =
      await this.customerQueryRepository.findOneByAuthIdentityIdOrFail(
        sessionData.authIdentityId,
        CustomerNotFoundError,
      );

    const existing =
      await this.emailPreferenceQueryRepository.findOneByCustomerId(
        customer.id,
      );

    const entity = new RegulatoryUpdateEmailPreferenceEntity({
      ...(existing && { id: existing.id }),
      customerId: customer.id,
      emailEnabled: dto.emailEnabled,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.emailPreferenceCommandRepository.upsertByCustomerId(
        customer.id,
        entity,
      ),
    );

    await transaction.commit();

    return UpdateRegulatoryUpdateEmailPreferenceResponseDto.build({
      regulatoryUpdateEmailPreferenceId: entity.id,
    });
  }
}
