import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { BaseTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/base/base.typeorm.command.repository';
import { OrganizationCustomizationDocumentFooterTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/organization-customization-document-footer-template.typeorm.entity';
import { MapperGateway } from '@lib/mapper/mapper.gateway';
import { OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway } from '@module/customer/organization-customization/domain/repository/organization-customization-document-footer-template/command/organization-customization-document-footer-template.command.repository.gateway';
import { OrganizationCustomizationDocumentFooterTemplateEntity } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/organization-customization-document-footer-template.entity';
import { OrganizationCustomizationDocumentFooterTemplateId } from '@module/customer/organization-customization/domain/schema/entity/organization-customization-document-footer-template/value-object/organization-customization-document-footer-template-id/organization-customization-document-footer-template-id.value-object';

@Injectable()
export class OrganizationCustomizationDocumentFooterTemplateTypeormCommandRepository
  extends BaseTypeormCommandRepository<OrganizationCustomizationDocumentFooterTemplateTypeormEntity>
  implements
    OrganizationCustomizationDocumentFooterTemplateCommandRepositoryGateway
{
  protected readonly _type =
    OrganizationCustomizationDocumentFooterTemplateTypeormCommandRepository.name;

  public constructor(
    @InjectRepository(
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    )
    repository: Repository<OrganizationCustomizationDocumentFooterTemplateTypeormEntity>,
    private readonly mapperGateway: MapperGateway,
  ) {
    super(repository);
  }

  public createOrganizationCustomizationDocumentFooterTemplate(
    props: OrganizationCustomizationDocumentFooterTemplateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationDocumentFooterTemplateEntity,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    );

    return this.create(mappedData);
  }

  public updateOrganizationCustomizationDocumentFooterTemplate(
    id: OrganizationCustomizationDocumentFooterTemplateId,
    props: OrganizationCustomizationDocumentFooterTemplateEntity,
  ): TransactionType {
    const mappedData = this.mapperGateway.map(
      props,
      OrganizationCustomizationDocumentFooterTemplateEntity,
      OrganizationCustomizationDocumentFooterTemplateTypeormEntity,
    );

    return this.update(id.toString(), mappedData);
  }
}
