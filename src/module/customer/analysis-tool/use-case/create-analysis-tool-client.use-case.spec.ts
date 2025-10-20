import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { CreateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/create-analysis-tool-client.request.dto';
import { CreateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/create-analysis-tool-client.response';
import { AnalysisToolClientEmailAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-email-already-in-use.error';
import { AnalysisToolClientFederalDocumentAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-federal-document-already-in-use.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { CreateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/create-analysis-tool-client.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';
import type { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';

describe(CreateAnalysisToolClientUseCase.name, () => {
  let useCase: CreateAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    };

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByEmail: jest.fn(),
      findOneByFederalDocument: jest.fn(),
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
      listByOrganizationId: jest.fn(),
    };

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      createAnalysisToolClient: jest.fn(),
      updateAnalysisToolClient: jest.fn(),
      deleteAnalysisToolClient: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const buildSessionData = (): SessionDataModel =>
    SessionDataModel.build({
      authIdentityId: new AuthIdentityId(),
      sessionId: new Guid(),
      userLevel: UserLevelEnum.CUSTOMER,
    });

  const buildOrganizationSessionData = (): OrganizationSessionDataModel =>
    OrganizationSessionDataModel.build({
      organizationId: new OrganizationId(),
    });

  const buildDto = (
    options: { withEmail?: boolean; withDocument?: boolean } = {},
  ): CreateAnalysisToolClientRequestDto =>
    CreateAnalysisToolClientRequestDto.build({
      name: 'João da Silva',
      email:
        options.withEmail !== undefined ? new Email('joao@teste.com') : null,
      federalDocument:
        options.withDocument !== undefined
          ? new FederalDocument('111.111.111-11')
          : null,
      birthDate: new Date('1985-10-20'),
      clientType: null,
      gender: null,
      phoneNumber: null,
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateAnalysisToolClientUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
        {
          provide: AnalysisToolClientCommandRepositoryGateway,
          useValue: analysisToolClientCommandRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(CreateAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('deve criar um cliente com sucesso quando não há conflitos', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withEmail: true, withDocument: true });
    const organizationMember = buildOrganizationMember();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      null,
    );
    analysisToolClientQueryRepositoryGateway.findOneByFederalDocument.mockResolvedValueOnce(
      null,
    );
    analysisToolClientCommandRepositoryGateway.createAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(sessionData, orgSessionData, dto);

    expect(result).toBeInstanceOf(CreateAnalysisToolClientResponseDto);
    expect(result.analysisToolClientId).toBeDefined();
    expect(
      analysisToolClientQueryRepositoryGateway.findOneByEmail,
    ).toHaveBeenCalledWith(dto.email, orgSessionData.organizationId);
    expect(
      analysisToolClientQueryRepositoryGateway.findOneByFederalDocument,
    ).toHaveBeenCalledWith(dto.federalDocument, orgSessionData.organizationId);
    expect(
      analysisToolClientCommandRepositoryGateway.createAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar AnalysisToolClientEmailAlreadyInUseError se o e-mail já estiver em uso', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withEmail: true });
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      {} as GetAnalysisToolClientWithRelationsQueryResult,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientEmailAlreadyInUseError);
    expect(
      analysisToolClientCommandRepositoryGateway.createAnalysisToolClient,
    ).not.toHaveBeenCalled();
  });

  it('deve lançar AnalysisToolClientFederalDocumentAlreadyInUseError se o documento já estiver em uso', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ withDocument: true });
    const organizationMember = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      organizationMember,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      null,
    );
    analysisToolClientQueryRepositoryGateway.findOneByFederalDocument.mockResolvedValueOnce(
      {} as GetAnalysisToolClientWithRelationsQueryResult,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(
      AnalysisToolClientFederalDocumentAlreadyInUseError,
    );
    expect(
      analysisToolClientCommandRepositoryGateway.createAnalysisToolClient,
    ).not.toHaveBeenCalled();
  });

  it('deve lançar OrganizationMemberNotFoundError quando o membro não for encontrado', async () => {
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });
});
