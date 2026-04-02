import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '@infra/database/database.module';
import { DocumentsSentByEmailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/documents-sent-by-email/documents-sent-by-email.typeorm.query.repository';
import { EmailTemplateTypeormCommandRepository } from '@infra/database/implementation/typeorm/repository/documents-sent-by-email/email-template.typeorm.command.repository';
import { EmailTemplateTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/documents-sent-by-email/email-template.typeorm.query.repository';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { EmailTemplateTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/email-template.typeorm.entity';
import { EmailModule } from '@infra/email/email.module';
import { AccountModule } from '@module/customer/account/account.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { DocumentsSentByEmailController } from '@module/customer/documents-sent-by-email/documents-sent-by-email.controller';
import { EmailTemplateCommandRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/command/email-template.command.repository.gateway';
import { EmailTemplateQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/email-template/query/email-template.query.repository.gateway';
import { DocumentsSentByEmailQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/documents-sent-by-email.query.repository.gateway';
import { CreateEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/create-email-template/create-email-template.use-case';
import { DeleteEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/delete-email-template/delete-email-template.use-case';
import { GetEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/get-email-template/get-email-template.use-case';
import { ListDocumentsSentByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/list-documents-sent-by-email/list-documents-sent-by-email.use-case';
import { ListEmailTemplatesUseCase } from '@module/customer/documents-sent-by-email/use-case/list-email-templates/list-email-templates.use-case';
import { SendDocumentsByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/send-documents-by-email/use-case/send-documents-by-email.use-case';
import { UpdateEmailTemplateUseCase } from '@module/customer/documents-sent-by-email/use-case/update-email-template/update-email-template.use-case';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    ExportDocumentModule,
    AuthIdentityModule,
    AccountModule,
    TypeOrmModule.forFeature([
      CustomerEmailSentTypeormEntity,
      EmailTemplateTypeormEntity,
    ]),
  ],
  controllers: [DocumentsSentByEmailController],
  providers: [
    SendDocumentsByEmailUseCase,
    ListDocumentsSentByEmailUseCase,
    CreateEmailTemplateUseCase,
    ListEmailTemplatesUseCase,
    GetEmailTemplateUseCase,
    UpdateEmailTemplateUseCase,
    DeleteEmailTemplateUseCase,
    {
      provide: DocumentsSentByEmailQueryRepositoryGateway,
      useClass: DocumentsSentByEmailTypeormQueryRepository,
    },
    {
      provide: EmailTemplateQueryRepositoryGateway,
      useClass: EmailTemplateTypeormQueryRepository,
    },
    {
      provide: EmailTemplateCommandRepositoryGateway,
      useClass: EmailTemplateTypeormCommandRepository,
    },
  ],
  exports: [],
})
export class DocumentsSentByEmailModule {
  protected readonly _type = DocumentsSentByEmailModule.name;
}
