import { Inject, Injectable } from '@nestjs/common';

import { AffiliateCustomerConfigItemResponseDto } from '@module/admin/affiliate-customer/dto/response/affiliate-customer-config-item.response.dto';
import { ListAffiliateCustomerConfigsResponseDto } from '@module/admin/affiliate-customer/dto/response/list-affiliate-customer-configs.response.dto';
import { AffiliateCustomerConfigQueryRepositoryGateway } from '@module/customer/affiliate-customer/domain/repository/affiliate-customer-config/query/affiliate-customer-config.query.repository.gateway';

@Injectable()
export class ListAffiliateCustomerConfigsUseCase {
  protected readonly _type = ListAffiliateCustomerConfigsUseCase.name;

  public constructor(
    @Inject(AffiliateCustomerConfigQueryRepositoryGateway)
    private readonly configQueryRepository: AffiliateCustomerConfigQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<ListAffiliateCustomerConfigsResponseDto> {
    const configs = await this.configQueryRepository.findAll();

    return ListAffiliateCustomerConfigsResponseDto.build({
      configs: configs.map((config) =>
        AffiliateCustomerConfigItemResponseDto.build({
          affiliateCustomerConfigConfigEnum: config.config,
          value: config.value,
        }),
      ),
    });
  }
}
