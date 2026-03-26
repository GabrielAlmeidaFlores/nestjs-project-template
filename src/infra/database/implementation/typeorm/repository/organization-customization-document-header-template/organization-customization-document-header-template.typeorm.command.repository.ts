import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationCustomizationDocumentHeaderTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-header-template.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-header-template/command/organization-customization-document-header-template.command.repository.gateway';
import { OrganizationCustomizationDocumentHeaderTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/organization-customization-document-header-template.entity';
import { OrganizationCustomizationDocumentHeaderTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-header-template/value-object/organization-customization-document-header-template-id/organization-customization-document-header-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentHeaderTemplateTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCustomizationDocumentHeaderTemplateTypeormEntity>
  implements
    OrganizationCustomizationDocumentHeaderTemplateCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationDocumentHeaderTemplateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    )
    repository: Repository<OrganizationCustomizationDocumentHeaderTemplateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationCustomizationDocumentHeaderTemplate(
    props: OrganizationCustomizationDocumentHeaderTemplateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationDocumentHeaderTemplateEntity,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationCustomizationDocumentHeaderTemplate(
    id: OrganizationCustomizationDocumentHeaderTemplateId,
    props: OrganizationCustomizationDocumentHeaderTemplateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationDocumentHeaderTemplateEntity,
      OrganizationCustomizationDocumentHeaderTemplateTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
