import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { UpsertAffiliateCustomerConfigRequestDto } from '@module/admin/affiliate-customer/dto/request/upsert-affiliate-customer-config.request.dto';
import { AffiliateCustomerConfigItemResponseDto } from '@module/admin/affiliate-customer/dto/response/affiliate-customer-config-item.response.dto';
import { AffiliateCustomerConfigCommandRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/command/affiliate-customer-config.command.repository.gateway';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';
import { AffiliateCustomerConfigEntity } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/affiliate-customer-config.entity';
import { AffiliateCustomerConfigConfigEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer-config/enum/affiliate-customer-config-config.enum';

@Injectable()
export class UpsertAffiliateCustomerConfigUseCase {
  protected readonly _type = UpsertAffiliateCustomerConfigUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerConfigQueryRepositoryGateway)
    private readonly configQueryRepository: AffiliateCustomerConfigQueryRepositoryGateway,
    @Inject(AffiliateCustomerConfigCommandRepositoryGateway)
    private readonly configCommandRepository: AffiliateCustomerConfigCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly transactionRepository: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    configKey: AffiliateCustomerConfigConfigEnum,
    dto: UpsertAffiliateCustomerConfigRequestDto,
  ): Promise<AffiliateCustomerConfigItemResponseDto> {
    const existing =
      await this.configQueryRepository.findOneByConfig(configKey);

    const configEntity = this.buildConfigEntity(configKey, dto.value, existing);
    const transaction = await this.transactionRepository.execute(
      this.persistConfig(existing, configEntity),
    );

    await transaction.commit();

    return AffiliateCustomerConfigItemResponseDto.build({
      affiliateCustomerConfigConfigEnum: configEntity.config,
      value: configEntity.value,
    });
  }

  private buildConfigEntity(
    configKey: AffiliateCustomerConfigConfigEnum,
    value: string,
    existing: AffiliateCustomerConfigEntity | null,
  ): AffiliateCustomerConfigEntity {
    const now = new Date();

    return new AffiliateCustomerConfigEntity({
      ...(existing !== null && { id: existing.id }),
      config: configKey,
      value,
      createdAt: existing?.createdAt ?? now,
      updatedAt: now,
    });
  }

  private persistConfig(
    existing: AffiliateCustomerConfigEntity | null,
    entity: AffiliateCustomerConfigEntity,
  ): ReturnType<
    AffiliateCustomerConfigCommandRepositoryGateway['createAffiliateCustomerConfig']
  > {
    if (existing === null) {
      return this.configCommandRepository.createAffiliateCustomerConfig(entity);
    }

    return this.configCommandRepository.updateAffiliateCustomerConfig(
      existing.id,
      entity,
    );
  }
}
