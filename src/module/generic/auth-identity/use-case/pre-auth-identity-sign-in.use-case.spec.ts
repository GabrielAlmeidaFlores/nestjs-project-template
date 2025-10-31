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
import { AnalysisToolClientInssBenefitCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/command/analysis-tool-client-inss-benefit.command.repository.gateway';
import { GetAnalysisToolClientInssBenefitQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-inss-benefit/query/result/get-analysis-tool-client-inss-benefit.query.result';
import { AnalysisToolClientLegalProceedingCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/command/analysis-tool-client-legal-proceeding.command.repository.gateway';
import { GetAnalysisToolClientLegalProceedingQueryResult } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client-legal-proceeding/query/result/get-analysis-tool-client-legal-proceeding.query.result';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AnalysisToolClientInssBenefitId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-inss-benefit/value-object/analysis-tool-client-inss-benefit-id/analysis-tool-client-inss-benefit-id.value-object';
import { AnalysisToolClientLegalProceedingId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client-legal-proceeding/value-object/analysis-tool-client-legal-proceeding-id/analysis-tool-client-legal-proceeding-id.value-object';
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
import type { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';

describe(UpdateAnalysisToolClientUseCase.name, () => {
  let useCase: UpdateAnalysisToolClientUseCase;

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndAuthIdentityId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
    };

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const analysisToolClientCommandRepositoryGateway: jest.Mocked<AnalysisToolClientCommandRepositoryGateway> =
    {
      updateAnalysisToolClient: jest.fn(),
      createAnalysisToolClient: jest.fn(),
      deleteAnalysisToolClient: jest.fn(),
    };

  const analysisToolClientQueryRepositoryGateway: jest.Mocked<AnalysisToolClientQueryRepositoryGateway> =
    {
      findOneByAnalysisToolClientAndOrganizationIdOrFail: jest.fn(),
      findOneByEmail: jest.fn(),
      findOneByFederalDocument: jest.fn(),
      listByOrganizationId: jest.fn(),
      findOneByAnalysisToolClientIdOrFail: jest.fn(),
    };

  const analysisToolClientInssBenefitCommandRepositoryGateway: jest.Mocked<AnalysisToolClientInssBenefitCommandRepositoryGateway> =
    {
      createAnalysisToolClientInssBenefit: jest.fn(),
      deleteAnalysisToolClientInssBenefit: jest.fn(),
    };

  const analysisToolClientLegalProceedingCommandRepositoryGateway: jest.Mocked<AnalysisToolClientLegalProceedingCommandRepositoryGateway> =
    {
      createAnalysisToolClientLegalProceeding: jest.fn(),
      deleteAnalysisToolClientLegalProceeding: jest.fn(),
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
    options: {
      updateBasicInfo?: boolean;
      updateBenefits?: boolean;
      updateProceedings?: boolean;
    } = {},
  ): UpdateAnalysisToolClientRequestDto => {
    const dtoData: Partial<UpdateAnalysisToolClientRequestDto> = {};
    if (options.updateBasicInfo === true) {
      dtoData.name = 'Nome Atualizado';
      dtoData.email = new Email('email.novo@teste.com');
      dtoData.federalDocument = new FederalDocument('222.222.222-22');
    }
    if (options.updateBenefits === true) {
      dtoData.inssBenefitNumber = ['1111111111', '2222222222'];
    }
    if (options.updateProceedings === true) {
      dtoData.legalProceedingNumber = ['3333333333', '4444444444'];
    }
    return UpdateAnalysisToolClientRequestDto.build(dtoData);
  };

  const buildOrganizationMember = (): GetOrganizationMemberQueryResult =>
    ({
      id: new OrganizationMemberId(),
    }) as unknown as GetOrganizationMemberQueryResult;

  const buildResponsibleMock =
    (): GetOrganizationMemberWithCustomerRelationQueryResult =>
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

  const buildClientQueryResult = (
    id: AnalysisToolClientId,
  ): GetAnalysisToolClientWithRelationsQueryResult => {
    const responsible = buildResponsibleMock();

    return GetAnalysisToolClientWithRelationsQueryResult.build({
      id: id,
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
      analysisToolClientInssBenefit: [
        GetAnalysisToolClientInssBenefitQueryResult.build({
          id: new AnalysisToolClientInssBenefitId(),
          inssBenefitNumber: '9999999999',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
      analysisToolClientLegalProceeding: [
        GetAnalysisToolClientLegalProceedingQueryResult.build({
          id: new AnalysisToolClientLegalProceedingId(),
          legalProceedingNumber: '8888888888',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        }),
      ],
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
        {
          provide: AnalysisToolClientInssBenefitCommandRepositoryGateway,
          useValue: analysisToolClientInssBenefitCommandRepositoryGateway,
        },
        {
          provide: AnalysisToolClientLegalProceedingCommandRepositoryGateway,
          useValue: analysisToolClientLegalProceedingCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(UpdateAnalysisToolClientUseCase);
    jest.clearAllMocks();
  });

  it('deve atualizar todos os campos e substituir entidades relacionadas', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({
      updateBasicInfo: true,
      updateBenefits: true,
      updateProceedings: true,
    });
    const member = buildOrganizationMember();
    const client = buildClientQueryResult(clientId);
    const transaction = buildTransaction();
    const TOTAL_TRANSACTIONS = 7;

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
    analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    analysisToolClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit.mockReturnValue(
      {} as TransactionType,
    );
    analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding.mockReturnValue(
      {} as TransactionType,
    );
    analysisToolClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding.mockReturnValue(
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
    expect(
      analysisToolClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(1);
    expect(
      analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit,
    ).toHaveBeenCalledTimes(2);
    expect(
      analysisToolClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding,
    ).toHaveBeenCalledTimes(1);
    expect(
      analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding,
    ).toHaveBeenCalledTimes(2);

    const [[, capturedEntity]] = analysisToolClientCommandRepositoryGateway
      .updateAnalysisToolClient.mock.calls as [
      [AnalysisToolClientId, AnalysisToolClientEntity],
    ];
    expect(capturedEntity.name).toBe(dto.name);
    expect(capturedEntity.email).toBe(dto.email);
    expect(capturedEntity.updatedBy).toBe(member.id);

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(TOTAL_TRANSACTIONS);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve atualizar apenas informações básicas se os arrays de relação não forem fornecidos', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ updateBasicInfo: true });
    const member = buildOrganizationMember();
    const client = buildClientQueryResult(clientId);
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

    await useCase.execute(clientId, sessionData, orgSessionData, dto);

    expect(
      analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    expect(
      analysisToolClientInssBenefitCommandRepositoryGateway.deleteAnalysisToolClientInssBenefit,
    ).not.toHaveBeenCalled();
    expect(
      analysisToolClientInssBenefitCommandRepositoryGateway.createAnalysisToolClientInssBenefit,
    ).not.toHaveBeenCalled();
    expect(
      analysisToolClientLegalProceedingCommandRepositoryGateway.deleteAnalysisToolClientLegalProceeding,
    ).not.toHaveBeenCalled();
    expect(
      analysisToolClientLegalProceedingCommandRepositoryGateway.createAnalysisToolClientLegalProceeding,
    ).not.toHaveBeenCalled();

    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    const [[transactions]] = baseTransactionRepositoryGateway.execute.mock
      .calls as [[TransactionType[]]];
    expect(transactions).toHaveLength(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar AnalysisToolClientEmailAlreadyInUseError se o e-mail já estiver em uso por OUTRO cliente', async () => {
    const clientId = new AnalysisToolClientId();
    const conflictingClientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ updateBasicInfo: true });
    const member = buildOrganizationMember();
    const client = buildClientQueryResult(clientId);
    const existingClient = buildClientQueryResult(conflictingClientId);

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      existingClient,
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(AnalysisToolClientEmailAlreadyInUseError);
  });

  it('deve lançar AnalysisToolClientFederalDocumentAlreadyInUseError se o documento já estiver em uso por OUTRO cliente', async () => {
    const clientId = new AnalysisToolClientId();
    const conflictingClientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ updateBasicInfo: true });
    const member = buildOrganizationMember();
    const client = buildClientQueryResult(clientId);
    const existingClient = buildClientQueryResult(conflictingClientId);

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
      existingClient,
    );

    await expect(
      useCase.execute(clientId, sessionData, orgSessionData, dto),
    ).rejects.toBeInstanceOf(
      AnalysisToolClientFederalDocumentAlreadyInUseError,
    );
  });

  it('NÃO deve lançar erro se o e-mail encontrado pertencer ao PRÓPRIO cliente', async () => {
    const clientId = new AnalysisToolClientId();
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const dto = buildDto({ updateBasicInfo: true });
    const member = buildOrganizationMember();
    const client = buildClientQueryResult(clientId);
    const transaction = buildTransaction();

    organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId.mockResolvedValueOnce(
      member,
    );
    analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByEmail.mockResolvedValueOnce(
      client,
    );
    analysisToolClientQueryRepositoryGateway.findOneByFederalDocument.mockResolvedValueOnce(
      null,
    );
    analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    await useCase.execute(clientId, sessionData, orgSessionData, dto);

    expect(
      analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient,
    ).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
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
