import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DatabaseModule } from '@infra/database/database.module';
import { DocumentsSentByEmailTypeormQueryRepository } from '@infra/database/implementation/typeorm/repository/documents-sent-by-email/documents-sent-by-email.typeorm.query.repository';
import { CustomerEmailSentTypeormEntity } from '@infra/database/implementation/typeorm/schema/entity/customer-email-sent.typeorm.entity';
import { EmailModule } from '@infra/email/email.module';
import { AccountModule } from '@module/customer/account/account.module';
import { ExportDocumentModule } from '@module/customer/analysis-tool/lib/export-document/export-document.module';
import { DocumentsSentByEmailController } from '@module/customer/documents-sent-by-email/documents-sent-by-email.controller';
import { DocumentsSentByEmailQueryRepositoryGateway } from '@module/customer/documents-sent-by-email/domain/repository/documents-sent-by-email/query/documents-sent-by-email.query.repository.gateway';
import { ListDocumentsSentByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/list-documents-sent-by-email/list-documents-sent-by-email.use-case';
import { SendDocumentsByEmailUseCase } from '@module/customer/documents-sent-by-email/use-case/send-documents-by-email/use-case/send-documents-by-email.use-case';
import { AuthIdentityModule } from '@module/generic/auth-identity/auth-identity.module';

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    ExportDocumentModule,
    AuthIdentityModule,
    AccountModule,
    TypeOrmModule.forFeature([CustomerEmailSentTypeormEntity]),
  ],
  controllers: [DocumentsSentByEmailController],
  providers: [
    SendDocumentsByEmailUseCase,
    ListDocumentsSentByEmailUseCase,
    {
      provide: DocumentsSentByEmailQueryRepositoryGateway,
      useClass: DocumentsSentByEmailTypeormQueryRepository,
    },
  ],
  exports: [],
})
export class DocumentsSentByEmailModule {
  protected readonly _type = DocumentsSentByEmailModule.name;
}
