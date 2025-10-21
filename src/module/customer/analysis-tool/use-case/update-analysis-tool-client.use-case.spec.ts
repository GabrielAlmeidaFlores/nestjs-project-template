import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { GetAnalysisToolClientWithRelationsQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/result/get-analysis-tool-client-with-relations.query.result';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { UpdateAnalysisToolClientRequestDto } from '@module/customer/analysis-tool/dto/request/update-analysis-tool-client.request.dto';
import { UpdateAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/update-analysis-tool-client.response.dto';
import { AnalysisToolClientEmailAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-email-already-in-use.error';
import { AnalysisToolClientFederalDocumentAlreadyInUseError } from '@module/customer/analysis-tool/error/analysis-tool-client-federal-document-already-in-use.error';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { UpdateAnalysisToolClientUseCase } from '@module/customer/analysis-tool/use-case/update-analysis-tool-client.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetOrganizationMemberQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member.query.result';

describe(UpdateAnalysisToolClientUseCase.name, () => {
  let useCase: UpdateAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
    } as unknown as jest.Mocked<OrganizationMemberQueryRepositoryGateway>;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      updateAnalysisToolClient: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientCommandRepositoryGateway>;

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByFederalDocument: jest.fn(),
    } as unknown as jest.Mocked<AnalysisToolClientQueryRepositoryGateway>;

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

  const buildDto = (): UpdateAnalysisToolClientRequestDto =>
    UpdateAnalysisToolClientRequestDto.build({
      name: 'Nome Atualizado',
      email: new Email('email.novo@teste.com'),
      federalDocument: new FederalDocument('222.222.222-22'),
    });

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildClientQueryResult =
    (): GetAnalysisToolClientWithRelationsQueryResult => {
      const responsible =
        GetOrganizationMemberWithCustomerRelationQueryResult.build({
          id: new OrganizationMemberId(),
          owner: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
          customer: GetCustomerQueryResult.build({
            id: new CustomerId(),
            name: 'Test Customer',
            profilePicture: null,
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
          }),
        });

      return GetAnalysisToolClientWithRelationsQueryResult.build({
        id: new AnalysisToolClientId(),
        name: 'Nome Antigo',
        email: new Email('email.antigo@teste.com'),
        federalDocument: new FederalDocument('111.111.111-11'),
        phoneNumber: null,
        birthDate: null,
        gender: null,
        clientType: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        createdBy: responsible,
        updatedBy: responsible,
      });
    };

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateAnalysisToolClientUseCase,
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: AnalysisToolClientCommandRepositoryGateway,
          useValue: analysisToolClientCommandRepositoryGateway,
        },
        {
          provide: AnalysisToolClientQueryRepositoryGateway,
          useValue: analysisToolClientQueryRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('deve atualizar um cliente com sucesso', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const member = buildOrganizationMember();
    const client = buildClientQueryResult();
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      null,
    );
    analysisToolClientQueryRepositoryGateway.findOneByFederalDocument.mockResolvedValueOnce(
      null,
    );
    analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    const result = await useCase.execute(
      clientId,
      sessionData,
      orgSessionData,
      dto,
    );

    expect(result).toBeInstanceOf(UpdateAnalysisToolClientResponseDto);
    expect(
      analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);

    const [[, capturedEntity]] = analysisToolClientCommandRepositoryGateway
      .updateAnalysisToolClient.mock.calls as [
      [AnalysisToolClientId, AnalysisToolClientEntity],
    ];

    expect(capturedEntity).toBeInstanceOf(AnalysisToolClientEntity);
    expect(capturedEntity.name).toBe(dto.name);
    expect(capturedEntity.email).toBe(dto.email);
    expect(capturedEntity.updatedBy).toBe(member.id);

    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar AnalysisToolClientEmailAlreadyInUseError se o e-mail já estiver em uso', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const member = buildOrganizationMember();
    const client = buildClientQueryResult();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      client,
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientEmailAlreadyInUseError);
  });

  it('deve lançar AnalysisToolClientFederalDocumentAlreadyInUseError se o documento já estiver em uso', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const member = buildOrganizationMember();
    const client = buildClientQueryResult();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      null,
    );
    analysisToolClientQueryRepositoryGateway.findOneByFederalDocument.mockResolvedValueOnce(
      client,
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(
      AnalysisToolClientFederalDocumentAlreadyInUseError,
    );
  });

  it('deve lançar OrganizationMemberNotFoundError se o membro não for encontrado', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      null,
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(OrganizationMemberNotFoundError);
  });

  it('deve lançar AnalysisToolClientNotFoundError se o cliente a ser atualizado não for encontrado', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto();
    const member = buildOrganizationMember();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockRejectedValueOnce(
      new AnalysisToolClientNotFoundError(),
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientNotFoundError);
  });
});
