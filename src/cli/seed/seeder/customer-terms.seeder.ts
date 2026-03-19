import { Inject } from '@nestjs/common';

import { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import { CustomerTermsCommandRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/command/customer-terms.command.repository.gateway';
import { CustomerTermsQueryRepositoryGateway } from '@module/customer/account/domain/repository/customer-terms/query/customer-terms.query.repository.gateway';
import { CustomerTermsEntity } from '@module/customer/account/domain/schema/entity/customer-terms/customer-terms.entity';

import type { SeederInterface } from '@cli/seed/interface/seeder.interface';

export class CustomerTermsSeeder implements SeederInterface {
  public static readonly content = `
<html lang="pt-BR">
  <body>

    <p>
      Bem-vindo à AgilizaPrevi. Ao criar uma conta, enviar documentos ou utilizar qualquer funcionalidade da plataforma, você concorda com os presentes Termos e Condições de Uso.
    </p>

    <h2>1. Objetivo da Plataforma</h2>
    <p>
      A AgilizaPrevi é uma plataforma que permite a criação de contas de usuário, o envio de documentos e a análise automatizada desses arquivos para geração de relatórios e pareceres destinados aos clientes.
    </p>

    <h2>2. Aceitação dos Termos</h2>
    <p>
      O uso da plataforma implica na aceitação integral e irrestrita destes Termos e Condições. Caso você não concorde com algum dos termos aqui descritos, deverá interromper o uso imediatamente.
    </p>

    <h2>3. Cadastro e Responsabilidade do Usuário</h2>
    <ul>
      <li>O usuário deve fornecer informações verdadeiras, completas e atualizadas no momento do cadastro.</li>
      <li>O usuário é responsável por manter a confidencialidade de suas credenciais de acesso (login e senha).</li>
      <li>A AgilizaPrevi não se responsabiliza por acessos indevidos decorrentes de negligência do usuário.</li>
    </ul>

    <h2>4. Envio e Processamento de Documentos</h2>
    <ul>
      <li>Ao enviar documentos para análise, o usuário declara possuir direitos legais sobre os arquivos ou autorização para compartilhá-los.</li>
      <li>Os documentos enviados serão utilizados exclusivamente para fins de análise automatizada e geração de relatórios.</li>
      <li>A AgilizaPrevi poderá armazenar os arquivos de forma temporária ou permanente, conforme política de privacidade vigente.</li>
    </ul>

    <h2>5. Relatórios e Resultados de Análise</h2>
    <p>
      Os relatórios gerados pela AgilizaPrevi são produzidos de forma automatizada, com base nas informações contidas nos documentos enviados pelo usuário. A precisão das análises depende da qualidade e veracidade dos dados fornecidos.
    </p>

    <h2>6. Privacidade e Proteção de Dados</h2>
    <p>
      A AgilizaPrevi se compromete a proteger os dados pessoais e documentos enviados, em conformidade com a Lei nº 13.709/2018 (Lei Geral de Proteção de Dados - LGPD). Para mais informações, consulte nossa <a href="#">Política de Privacidade</a>.
    </p>

    <h2>7. Propriedade Intelectual</h2>
    <p>
      Todo o conteúdo, design, logotipo e código da plataforma AgilizaPrevi são de propriedade exclusiva da empresa e protegidos por leis de direitos autorais e propriedade intelectual.
    </p>

    <h2>8. Limitação de Responsabilidade</h2>
    <p>
      A AgilizaPrevi não se responsabiliza por danos diretos, indiretos ou consequentes decorrentes do uso da plataforma, de falhas técnicas, erros de sistema ou uso inadequado por parte do usuário.
    </p>

    <h2>9. Alterações nos Termos</h2>
    <p>
      Estes Termos e Condições podem ser alterados a qualquer momento, mediante publicação da nova versão neste mesmo endereço eletrônico. O uso contínuo da plataforma após a alteração representa aceitação das novas condições.
    </p>

    <h2>10. Contato</h2>
    <p>
      Em caso de dúvidas, entre em contato com nossa equipe pelo e-mail: <a href="mailto:contato@agilizaprevi.com.br">contato@agilizaprevi.com.br</a>.
    </p>

  </body>
</html>
    `;

  protected readonly _type = CustomerTermsSeeder.name;

  public constructor(
    @Inject(CustomerTermsCommandRepositoryGateway)
    public readonly customerTermsCommandRepositoryGateway: CustomerTermsCommandRepositoryGateway,
    @Inject(CustomerTermsQueryRepositoryGateway)
    public readonly customerTermsQueryRepositoryGateway: CustomerTermsQueryRepositoryGateway,
  ) {}

  public async execute(): Promise<Array<TransactionType>> {
    const currentCustomerTerms =
      await this.customerTermsQueryRepositoryGateway.findOneByStatus(true);

    const transactions = [];

    if (
      currentCustomerTerms !== null &&
      currentCustomerTerms.content !== CustomerTermsSeeder.content
    ) {
      const updateCustomerTermsTransaction = new CustomerTermsEntity({
        ...currentCustomerTerms,
        isActive: false,
      });

      transactions.push(
        this.customerTermsCommandRepositoryGateway.updateCustomerTerms(
          currentCustomerTerms.id,
          updateCustomerTermsTransaction,
        ),
      );

      const newCustomerTerms = new CustomerTermsEntity({
        content: CustomerTermsSeeder.content,
        isActive: true,
      });

      transactions.push(
        this.customerTermsCommandRepositoryGateway.createCustomerTerms(
          newCustomerTerms,
        ),
      );
    } else if (currentCustomerTerms === null) {
      const customerTerms = new CustomerTermsEntity({
        content: CustomerTermsSeeder.content,
        isActive: true,
      });

      const customerTermsTransaction =
        this.customerTermsCommandRepositoryGateway.createCustomerTerms(
          customerTerms,
        );

      transactions.push(customerTermsTransaction);
    }

    return transactions;
  }
}
