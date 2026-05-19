import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/survivor-pension-analysis-customer-profile-identification-document.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/repository/survivor-pension-analysis-customer-profile-identification-document/command/survivor-pension-analysis-customer-profile-identification-document.command.repository.gateway';
import { SurvivorPensionAnalysisCustomerProfileIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification/value-object/survivor-pension-analysis-customer-profile-identification-id/survivor-pension-analysis-customer-profile-identification-id.value-object';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/survivor-pension-analysis-customer-profile-identification-document.entity';
import { SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-customer-profile-identification-document/value-object/survivor-pension-analysis-customer-profile-identification-document-id/survivor-pension-analysis-customer-profile-identification-document-id.value-object';

@Injectable()
export class SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormCommandRepository
  extends BaseTypeormCommandRepository<SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity>
  implements
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentCommandRepositoryGateway
{
  protected readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
    )
    repository: Repository<SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createSurvivorPensionAnalysisCustomerProfileIdentificationDocument(
    props: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentEntity,
      SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
    );

    return this.create(mappedData);
  }

  public deleteSurvivorPensionAnalysisCustomerProfileIdentificationDocument(
    id: SurvivorPensionAnalysisCustomerProfileIdentificationDocumentId,
  ): TransactionType {
    return this.delete(id.toString());
  }

  public deleteAllBySurvivorPensionAnalysisCustomerProfileIdentificationId(
    survivorPensionAnalysisCustomerProfileIdentificationId: SurvivorPensionAnalysisCustomerProfileIdentificationId,
  ): TransactionType {
    return async (executor: unknown) => {
      const manager = executor as EntityManager;
      await manager
        .getRepository(
          SurvivorPensionAnalysisCustomerProfileIdentificationDocumentTypeormEntity,
        )
        .softDelete({
          customerProfileIdentification: {
            id: survivorPensionAnalysisCustomerProfileIdentificationId.toString(),
          },
        });
    };
  }
}
