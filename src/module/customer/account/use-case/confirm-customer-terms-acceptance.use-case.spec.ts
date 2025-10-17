import { Test } from '@nestjs/testing';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { TransactionOutputModel } from '@core/domain/repository/base/transaction/model/output/transaction.output.model';
import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { CustomerQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer/query/customer.query.repository.gateway';
import { GetCustomerWithAuthIdentityRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-auth-identity-relation.query.result';
import { GetCustomerWithCustomerAddressRelationQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer-with-customer-address-relation.query.result';
import { GetCustomerAddressQueryResult } from '@module/customer/account/domain/repository/customer-address/query/result/get-customer-address.query.result';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { GetCustomerTermsQueryResult } from '@module/customer/account/domain/repository/customer-terms/query/result/get-customer-terms.query.result';
import { CustomerTermsAcceptanceCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/command/customer-terms-acceptance.command.repository.gateway';
import { CustomerTermsAcceptanceQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/customer-terms-acceptance.query.repository.gateway';
import { GetCustomerTermsAcceptanceQueryResult } from '@module/customer/account/domain/repository/customer-terms-acceptance/query/result/get-customer-terms-acceptance.query.result';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-and-organization-relations.query.result';
import { CustomerId } from '@module/customer/account/domain/schema/entity/customer/value-object/customer-id/customer-id.value-object';
import { CustomerAddressId } from '@module/customer/account/domain/schema/entity/customer-address/value-object/customer-address-id/customer-address-id.value-object';
import { CustomerTermsId } from '@module/customer/account/domain/schema/entity/customer-terms/value-object/customer-terms-id/customer-terms-id.value-object';
import { CustomerTermsAcceptanceId } from '@module/customer/account/domain/schema/entity/customer-terms-acceptance/value-object/organization-member-id/customer-terms-acceptance-id.value-object';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import { CustomerTermsAcceptanceResponseDto } from '@module/customer/account/dto/response/customer-terms-acceptance.response.dto';
import { CustomerTermsAcceptanceError } from '@module/customer/account/error/customer-terms-acceptance.error';
import { CustomerTermsNotFoundError } from '@module/customer/account/error/customer-terms-not-found.error';
import { InvalidOrganizationSessionError } from '@module/customer/account/error/invalid-organization-session.error';
import { ConfirmCustomerTermsAcceptanceUseCase } from '@module/customer/account/use-case/confirm-customer-terms-acceptance.use-case';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';
import { UserLevelEnum } from '@shared/system/enum/user-level.enum';

import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { GetCustomerQueryResult } from '@module/customer/account/domain/repository/customer/query/result/get-customer.query.result';
import type { GetOrganizationQueryResult } from '@module/customer/account/domain/repository/organization/query/result/get-organization.query.result';
import type { GetAuthIdentityQueryResult } from '@module/generic/auth-identity/domain/repository/auth-identity/query/result/get-auth-identity.query.result';

describe(ConfirmCustomerTermsAcceptanceUseCase.name, () => {
  let useCase: ConfirmCustomerTermsAcceptanceUseCase;

  const baseTransactionRepositoryGateway: jest.Mocked<BaseTransactionRepositoryGateway> =
    {
      execute: jest.fn(),
    };

  const customerQueryRepositoryGateway: jest.Mocked<CustomerQueryRepositoryGateway> =
    {
      findOneByAuthIdentityIdWithCustomerAddressRelationOrFail: jest.fn(),
      findOneByAuthIdentityIdOrFail: jest.fn(),
      findOneByCustomerId: jest.fn(),
    };

  const organizationMemberQueryRepositoryGateway: jest.Mocked<OrganizationMemberQueryRepositoryGateway> =
    {
      findOneByCustomerAndOrganizationIdWithRelations: jest.fn(),
      findOneByCustomerAndAuthIdentityId: jest.fn(),
      findOneByCustomerAndOrganizationId: jest.fn(),
      findOneByOrganizationMemberId: jest.fn(),
    };

  const customerTermsQueryRepositoryGateway: jest.Mocked<CustomerTermsQueryRepositoryGateway> =
    {
      findOneByStatus: jest.fn(),
    };

  const customerTermsAcceptanceQueryRepositoryGateway: jest.Mocked<CustomerTermsAcceptanceQueryRepositoryGateway> =
    {
      findOneByTermsIdAndCustomerId: jest.fn(),
    };

  const customerTermsAcceptanceCommandRepositoryGateway: jest.Mocked<CustomerTermsAcceptanceCommandRepositoryGateway> =
    {
      createCustomerTermsAcceptance: jest.fn(),
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

  const buildTransaction = (): jest.Mocked<TransactionOutputModel> =>
    new TransactionOutputModel(
      jest.fn().mockResolvedValue(undefined),
      jest.fn().mockResolvedValue(undefined),
    ) as jest.Mocked<TransactionOutputModel>;

  const addressQueryResult = GetCustomerAddressQueryResult.build({
    id: new CustomerAddressId(),
    postalCode: new PostalCode('12345-678'),
    stateCode: StateCodeEnum.SP,
    city: 'São Paulo',
    neighborhood: 'Centro',
    street: 'Avenida Paulista',
    addressNumber: 1000,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const customerWithAddressResult =
    GetCustomerWithCustomerAddressRelationQueryResult.build({
      id: new CustomerId(),
      name: 'Test Customer',
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      customerAddress: addressQueryResult,
    });

  const customerWithAuthIdentityResult =
    GetCustomerWithAuthIdentityRelationQueryResult.build({
      id: customerWithAddressResult.id,
      name: 'Test Customer',
      profilePicture: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      authIdentity: {} as GetAuthIdentityQueryResult,
    });

  const orgMemberQueryResult =
    GetOrganizationMemberWithCustomerAndOrganizationRelationsQueryResult.build({
      id: new OrganizationMemberId(),
      owner: true,
      createdAt: new Date(),
      updatedAt: new Date(),
      deletedAt: null,
      customer: customerWithAuthIdentityResult,
      organization: {} as GetOrganizationQueryResult,
    });

  const termsQueryResult = GetCustomerTermsQueryResult.build({
    id: new CustomerTermsId(),
    content: '<p>Terms</p>',
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: null,
  });

  const termsAcceptanceQueryResult =
    GetCustomerTermsAcceptanceQueryResult.build({
      id: new CustomerTermsAcceptanceId(),
      customer: {} as GetCustomerQueryResult,
      customerTerms: termsQueryResult,
    });

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        ConfirmCustomerTermsAcceptanceUseCase,
        {
          provide: BaseTransactionRepositoryGateway,
          useValue: baseTransactionRepositoryGateway,
        },
        {
          provide: CustomerQueryRepositoryGateway,
          useValue: customerQueryRepositoryGateway,
        },
        {
          provide: OrganizationMemberQueryRepositoryGateway,
          useValue: organizationMemberQueryRepositoryGateway,
        },
        {
          provide: CustomerTermsQueryRepositoryGateway,
          useValue: customerTermsQueryRepositoryGateway,
        },
        {
          provide: CustomerTermsAcceptanceQueryRepositoryGateway,
          useValue: customerTermsAcceptanceQueryRepositoryGateway,
        },
        {
          provide: CustomerTermsAcceptanceCommandRepositoryGateway,
          useValue: customerTermsAcceptanceCommandRepositoryGateway,
        },
      ],
    }).compile();

    useCase = module.get(ConfirmCustomerTermsAcceptanceUseCase);
    jest.clearAllMocks();
  });

  it('deve confirmar o aceite dos termos com sucesso', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();
    const transaction = buildTransaction();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customerWithAddressResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      null,
    );
    customerTermsAcceptanceCommandRepositoryGateway.createCustomerTermsAcceptance.mockReturnValue(
      {} as TransactionType,
    );
    baseTransactionRepositoryGateway.execute.mockResolvedValueOnce(transaction);

    // Act
    const result = await useCase.execute(sessionData, orgSessionData);

    // Assert
    expect(result).toBeInstanceOf(CustomerTermsAcceptanceResponseDto);
    expect(result.customerTermsAcceptance).toBeDefined();
    expect(
      customerTermsAcceptanceCommandRepositoryGateway.createCustomerTermsAcceptance,
    ).toHaveBeenCalledTimes(1);
    expect(baseTransactionRepositoryGateway.execute).toHaveBeenCalledTimes(1);
    expect(transaction.commit).toHaveBeenCalledTimes(1);
  });

  it('deve lançar CustomerTermsAcceptanceError se os termos já foram aceitos', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customerWithAddressResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      termsQueryResult,
    );
    customerTermsAcceptanceQueryRepositoryGateway.findOneByTermsIdAndCustomerId.mockResolvedValueOnce(
      termsAcceptanceQueryResult,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerTermsAcceptanceError);
  });

  it('deve lançar InvalidOrganizationSessionError se o membro não for encontrado', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customerWithAddressResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      null,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(InvalidOrganizationSessionError);
  });

  it('deve lançar CustomerTermsNotFoundError se não houver termos ativos', async () => {
    // Arrange
    const sessionData = buildSessionData();
    const orgSessionData = buildOrganizationSessionData();

    customerQueryRepositoryGateway.findOneByAuthIdentityIdWithCustomerAddressRelationOrFail.mockResolvedValueOnce(
      customerWithAddressResult,
    );
    organizationMemberQueryRepositoryGateway.findOneByCustomerAndOrganizationIdWithRelations.mockResolvedValueOnce(
      orgMemberQueryResult,
    );
    customerTermsQueryRepositoryGateway.findOneByStatus.mockResolvedValueOnce(
      null,
    );

    // Act & Assert
    await expect(
      useCase.execute(sessionData, orgSessionData),
    ).rejects.toBeInstanceOf(CustomerTermsNotFoundError);
  });
});
