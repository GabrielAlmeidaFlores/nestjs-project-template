import { Mapper, constructUsing, createMap } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';

import { AnalysisToolRecordTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/analysis-tool-record.typeorm.entity';
import { CustomerEmailSentAttachmentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent-attachment.typeorm.entity';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { CustomerEmailSentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent/value-object/customer-email-sent-id/customer-email-sent-id.value-object';
import { CustomerEmailSentAttachmentEntity } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent-attachment/customer-email-sent-attachment.entity';
import { CustomerEmailSentAttachmentId } from '@module/customer/documents-sent-by-email/domain/schema/entity/customer-email-sent-attachment/value-object/customer-email-sent-attachment-id/customer-email-sent-attachment-id.value-object';

@Injectable()
export class CustomerEmailSentAttachmentEntityAutoMapperProfile {
  protected readonly _type =
    CustomerEmailSentAttachmentEntityAutoMapperProfile.name;

  public constructor(@InjectMapper() private readonly mapper: Mapper) {
    this.createMappings();
  }

  private createMappings(): void {
    this.mapOrmEntityToDomainEntity();
    this.mapDomainEntityToOrmEntity();
  }

  private mapOrmEntityToDomainEntity(): void {
    const convertOrmEntityToDomainEntity = (
      source: CustomerEmailSentAttachmentTypeormEntity,
    ): CustomerEmailSentAttachmentEntity => {
      return new CustomerEmailSentAttachmentEntity({
        ...source,
        id: new CustomerEmailSentAttachmentId(source.id),
        customerEmailSent: new CustomerEmailSentId(source.customerEmailSent.id),
        analysisToolRecord: new AnalysisToolRecordId(
          source.analysisToolRecord.id,
        ),
      });
    };

    const mappingFunction = constructUsing(convertOrmEntityToDomainEntity);

    createMap(
      this.mapper,
      CustomerEmailSentAttachmentTypeormEntity,
      CustomerEmailSentAttachmentEntity,
      mappingFunction,
    );
  }

  private mapDomainEntityToOrmEntity(): void {
    const convertDomainEntityToOrmEntity = (
      source: CustomerEmailSentAttachmentEntity,
    ): CustomerEmailSentAttachmentTypeormEntity => {
      const customerEmailSent = {
        id: source.customerEmailSent.toString(),
      } as CustomerEmailSentTypeormEntity;

      const analysisToolRecord = {
        id: source.analysisToolRecord.toString(),
      } as AnalysisToolRecordTypeormEntity;

      return CustomerEmailSentAttachmentTypeormEntity.build({
        ...source,
        id: source.id.toString(),
        customerEmailSent,
        analysisToolRecord,
      });
    };

    const mappingFunction = constructUsing(convertDomainEntityToOrmEntity);

    createMap(
      this.mapper,
      CustomerEmailSentAttachmentEntity,
      CustomerEmailSentAttachmentTypeormEntity,
      mappingFunction,
    );
  }
}
