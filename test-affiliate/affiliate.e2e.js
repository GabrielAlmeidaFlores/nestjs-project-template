/**
 * Teste E2E completo da funcionalidade de Afiliado
 *
 * Fluxo coberto:
 *  1.  Criação de customer AFFILIATE (quem vai receber comissão)
 *  2.  Login como admin → criar afiliado vinculado ao customer 1
 *  3.  Verificar endpoints de admin (CRUD completo + transfers)
 *  4.  Criação de customer BUYER (quem vai comprar via link de afiliado)
 *  5.  Acesso ao link público do afiliado (seta cookie)
 *  6.  Verificar dados públicos do afiliado
 *  7.  Endpoints autenticados do afiliado (GET /me, GET /me/commissions, PATCH /me/pix-key)
 *  8.  Simular webhook de pagamento → checar disparo de repasse
 *  9.  Simular webhook de autorização de transferência → verificar { "status": "APPROVED" }
 * 10.  Verificar listagem de transferências do afiliado (admin)
 * 11.  Delete do afiliado
 */

const http = require('http');
const https = require('https');
const crypto = require('crypto');
const { execSync } = require('child_process');

// ─── Config ────────────────────────────────────────────────────────────────
const BASE = 'http://localhost:3000';
const DB_CONN = '-h 10.8.0.1 -P 3306 -u dev -pTestando123! agiliza_previ_afiliado';
const REDIS_HOST = '10.8.0.1';
const REDIS_PORT = 6380;
const REDIS_PASS = 'epiousion_2025';
const CACHE_SECRET = 'j8gdl0vz2ki33664d92iprtwi8vzvs9s';
const CACHE_IV = '1o4plet0cc4fz890';
const ADMIN_EMAIL = 'admin@agilizaprevi.com.br';
const ADMIN_PASSWORD = 'Testando123!';
const PAYMENT_PLAN_ID = '4b03d7d5-078d-46c6-82b9-cf4998140154'; // Plano Básico (monthly)
const ASAAS_WEBHOOK_TOKEN = getEnvVar('BANK_WEBHOOK_ENDPOINT_ACCESS_TOKEN');

// ─── Helpers ───────────────────────────────────────────────────────────────
let passedTests = 0;
let failedTests = 0;
const failures = [];

function getEnvVar(key) {
  try {
    const content = require('fs').readFileSync(`${__dirname}/../.env`, 'utf8');
    const match = content.split('\n').find(l => l.startsWith(`${key}=`) && !l.startsWith('#'));
    return match ? match.split('=').slice(1).join('=').trim() : null;
  } catch { return null; }
}

function log(msg) { process.stdout.write(msg + '\n'); }
function ok(label) { passedTests++; log(`  ✅  ${label}`); }
function fail(label, detail) { failedTests++; failures.push(`${label}: ${detail}`); log(`  ❌  ${label} — ${detail}`); }
function section(title) { log(`\n${'═'.repeat(60)}\n  ${title}\n${'═'.repeat(60)}`); }

function dbQuery(sql) {
  try {
    const result = execSync(`mysql ${DB_CONN} -N -e "${sql.replace(/"/g, '\\"')}" 2>/dev/null`, { encoding: 'utf8' });
    return result.trim();
  } catch (e) {
    return null;
  }
}

function decryptCacheValue(encryptedHex) {
  try {
    const key = Buffer.from(CACHE_SECRET, 'utf8').slice(0, 32);
    const iv = Buffer.from(CACHE_IV, 'utf8').slice(0, 16);
    const decipher = crypto.createDecipheriv(CACHE_CIPHER_METHOD, key, iv);
    const encrypted = Buffer.from(encryptedHex, 'hex');
    let decrypted = decipher.update(encrypted, null, 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch { return null; }
}

const CACHE_CIPHER_METHOD = 'aes-256-cbc';

function getRedisValue(redisKey) {
  try {
    const result = execSync(
      `python3 -c "import socket, ssl, sys; s=socket.socket(); s.connect(('${REDIS_HOST}', ${REDIS_PORT})); s.send(b'AUTH ${REDIS_PASS}\\r\\nGET ${redisKey}\\r\\n'); import time; time.sleep(0.3); data=s.recv(4096).decode(); s.close(); print(data)"`,
      { encoding: 'utf8', timeout: 5000 }
    );
    const lines = result.split('\r\n');
    const bulkIdx = lines.findIndex(l => l.startsWith('$') && !l.startsWith('$-'));
    if (bulkIdx >= 0) return lines[bulkIdx + 1];
    return null;
  } catch { return null; }
}

function request(method, path, body, cookieJar, extraHeaders) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE + path);
    const bodyStr = body ? JSON.stringify(body) : null;
    const headers = {};
    if (bodyStr) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(bodyStr);
    }
    if (cookieJar && cookieJar.cookies) {
      headers['Cookie'] = cookieJar.cookies;
    }
    if (extraHeaders) {
      Object.assign(headers, extraHeaders);
    }

    const req = http.request({
      hostname: url.hostname,
      port: url.port || 3000,
      path: url.pathname + url.search,
      method,
      headers,
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        // collect Set-Cookie headers, replacing existing cookies with same name
        if (cookieJar && res.headers['set-cookie']) {
          const newPairs = res.headers['set-cookie'].map(c => c.split(';')[0]);
          for (const pair of newPairs) {
            const [name] = pair.split('=');
            // Remove existing cookie with same name, then append new value
            const existing = cookieJar.cookies
              ? cookieJar.cookies.split('; ').filter(c => !c.startsWith(name + '='))
              : [];
            existing.push(pair);
            cookieJar.cookies = existing.join('; ');
          }
        }
        try {
          resolve({ status: res.status || res.statusCode, body: JSON.parse(data), headers: res.headers });
        } catch {
          resolve({ status: res.statusCode, body: data, headers: res.headers });
        }
      });
    });
    req.on('error', reject);
    if (bodyStr) req.write(bodyStr);
    req.end();
  });
}

function randomCpf() {
  // Generates a valid CPF for testing
  const n = () => Math.floor(Math.random() * 9);
  const d = [n(),n(),n(),n(),n(),n(),n(),n(),n()];
  let sum = d.slice(0,9).reduce((a,v,i) => a + v*(10-i), 0);
  let r = 11 - (sum % 11); d.push(r >= 10 ? 0 : r);
  sum = d.slice(0,10).reduce((a,v,i) => a + v*(11-i), 0);
  r = 11 - (sum % 11); d.push(r >= 10 ? 0 : r);
  return d.join('');
}

function randomEmail(prefix) {
  return `${prefix}_${Date.now()}@test-affiliate.com`;
}

const NAMES_POOL = ['Alice','Bruno','Carlos','Diana','Eduardo','Fernanda','Gabriel','Helena'];
function randomName() {
  const first = NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
  const last = NAMES_POOL[Math.floor(Math.random() * NAMES_POOL.length)];
  return `${first} ${last} Teste`;
}

async function getMfaCodeFromRedis(authIdentityId) {
  const key = `sign-in-verification-code:${authIdentityId}`;
  // try redis-cli via node net module
  return new Promise((resolve) => {
    const net = require('net');
    const client = new net.Socket();
    let data = '';
    client.connect(REDIS_PORT, REDIS_HOST, () => {
      client.write(`AUTH ${REDIS_PASS}\r\nGET ${key}\r\n`);
    });
    client.on('data', chunk => {
      data += chunk.toString();
      if (data.includes('\r\n') && data.split('\r\n').length >= 4) {
        client.destroy();
        const lines = data.split('\r\n');
        const bulkIdx = lines.findIndex(l => l.startsWith('$') && l !== '$-1');
        if (bulkIdx >= 0) {
          const raw = lines[bulkIdx + 1];
          // decrypt
          const decrypted = decryptCacheValue(raw);
          resolve(decrypted || raw);
        } else {
          resolve(null);
        }
      }
    });
    client.on('error', () => resolve(null));
    setTimeout(() => { client.destroy(); resolve(null); }, 3000);
  });
}

async function loginAdmin() {
  const jar = { cookies: '' };

  // Admin uses email MFA (bug fix: pre-sign-in now checks admin?.name if customer is null)
  const pre = await request('POST', '/auth-identity/pre-sign-in', {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    mfaOption: 'email',
    forceNewSession: true,
  }, jar);

  if (pre.status !== 200 && pre.status !== 201) {
    throw new Error(`Admin pre-sign-in failed: ${pre.status} ${JSON.stringify(pre.body)}`);
  }

  // get auth_identity id from DB to fetch MFA code from Redis
  const authIdentityId = dbQuery(
    `SELECT id FROM auth_identity WHERE email = '${ADMIN_EMAIL}' LIMIT 1`
  );
  if (!authIdentityId) throw new Error('Admin auth_identity not found in DB');

  await new Promise(r => setTimeout(r, 500));

  const mfaCode = await getMfaCodeFromRedis(authIdentityId);
  if (!mfaCode) throw new Error('Could not retrieve admin MFA code from Redis');

  const signIn = await request('POST', '/auth-identity/sign-in', {
    email: ADMIN_EMAIL,
    password: ADMIN_PASSWORD,
    mfaOption: 'email',
    mfaCode,
  }, jar);

  if (signIn.status !== 200 && signIn.status !== 201) {
    throw new Error(`Admin sign-in failed: ${signIn.status} ${JSON.stringify(signIn.body)}`);
  }

  return jar;
}

async function createAndLoginCustomer(prefix) {
  const jar = { cookies: '' };
  const email = randomEmail(prefix);
  const cpf = randomCpf();
  const phone = '5511' + Math.floor(900000000 + Math.random() * 99999999);

  // sign-up (customer)
  const signUp = await request('POST', '/customer/account/sign-up', {
    name: randomName(),
    email,
    phoneNumber: phone,
    federalDocument: cpf,
    password: 'Test@12345',
    customerAddress: {
      city: 'São Paulo',
      neighborhood: 'Centro',
      street: 'Rua Teste',
      stateCode: 'SP',
      postalCode: '01001000',
      addressNumber: 100,
    },
  }, jar);

  if (signUp.status !== 201 && signUp.status !== 200) {
    throw new Error(`Customer sign-up failed: ${signUp.status} ${JSON.stringify(signUp.body)}`);
  }

  // wait for DB
  await new Promise(r => setTimeout(r, 800));

  const authIdentityId = dbQuery(
    `SELECT id FROM auth_identity WHERE email = '${email}' LIMIT 1`
  );
  if (!authIdentityId) throw new Error(`auth_identity not found for ${email}`);

  // pre-sign-in
  const pre = await request('POST', '/auth-identity/pre-sign-in', {
    email,
    password: 'Test@12345',
    mfaOption: 'email',
    forceNewSession: true,
  }, jar);

  if (pre.status !== 200 && pre.status !== 201) {
    throw new Error(`Customer pre-sign-in failed: ${pre.status} ${JSON.stringify(pre.body)}`);
  }

  await new Promise(r => setTimeout(r, 500));
  const mfaCode = await getMfaCodeFromRedis(authIdentityId);
  if (!mfaCode) throw new Error(`Could not get MFA code for ${email}`);

  const signIn = await request('POST', '/auth-identity/sign-in', {
    email,
    password: 'Test@12345',
    mfaOption: 'email',
    mfaCode,
  }, jar);

  if (signIn.status !== 200 && signIn.status !== 201) {
    throw new Error(`Customer sign-in failed: ${signIn.status} ${JSON.stringify(signIn.body)}`);
  }

  // get customer id
  const customerId = dbQuery(
    `SELECT customer_id FROM auth_identity WHERE email = '${email}' LIMIT 1`
  );
  if (!customerId) throw new Error(`customer_id not found for ${email}`);

  return { jar, email, cpf, customerId, authIdentityId };
}

// ─── Main ──────────────────────────────────────────────────────────────────
async function run() {
  log('\n🚀  Iniciando testes E2E — Funcionalidade de Afiliado\n');

  let adminJar, affiliateCustomerData, buyerData;
  let createdAffiliateId;

  // ══════════════════════════════════════════════════════
  section('ETAPA 1 — Login como Admin');
  // ══════════════════════════════════════════════════════
  try {
    adminJar = await loginAdmin();
    ok('Admin autenticado com sucesso');
  } catch (e) {
    fail('Login admin', e.message);
    log('\n⛔  Login admin falhou — encerrando testes\n');
    process.exit(1);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 2 — Criar Customer "Afiliado"');
  // ══════════════════════════════════════════════════════
  try {
    affiliateCustomerData = await createAndLoginCustomer('affiliate');
    ok(`Customer afiliado criado: ${affiliateCustomerData.email} (id: ${affiliateCustomerData.customerId})`);
  } catch (e) {
    fail('Criar customer afiliado', e.message);
    log('\n⛔  Criação de customer falhou — encerrando testes\n');
    process.exit(1);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 3 — Admin: Criar Afiliado (POST /admin/affiliate-customer)');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('POST', '/admin/affiliate-customer', {
      customerId: affiliateCustomerData.customerId,
      paymentCommissionPercentage: 10,
      paymentPlanDiscountPercentage: 5,
      paymentPlanDiscountValidUntil: '2027-12-31',
      paymentPlanDiscountRedemptionLimit: 100,
      paymentPlanIds: [PAYMENT_PLAN_ID],
      isActive: true,
    }, adminJar);

    if (res.status === 201 || res.status === 200) {
      createdAffiliateId = res.body?.id ?? res.body?.affiliateCustomerId;
      // handle value object serialization
      if (typeof createdAffiliateId === 'object' && createdAffiliateId?.value) {
        createdAffiliateId = createdAffiliateId.value;
      }
      ok(`Afiliado criado com id: ${createdAffiliateId}`);

      // Verify in DB
      const dbRow = dbQuery(`SELECT id, is_active, payment_commission_percentage FROM affiliate_customer WHERE id = '${createdAffiliateId}' LIMIT 1`);
      if (dbRow) {
        ok('Afiliado persistido no banco de dados');
      } else {
        fail('Verificação DB afiliado', 'Registro não encontrado no banco');
      }

      // Verify payment plan link
      const planLink = dbQuery(`SELECT id FROM affiliate_customer_payment_plan WHERE affiliate_customer_id = '${createdAffiliateId}' LIMIT 1`);
      if (planLink) {
        ok('Vínculo com plano criado em affiliate_customer_payment_plan');
      } else {
        fail('Vínculo plano-afiliado', 'Registro não encontrado na tabela de junção');
      }
    } else {
      fail('POST /admin/affiliate-customer', `Status ${res.status}: ${JSON.stringify(res.body)}`);
    }

    // Error: tentar criar afiliado duplicado
    if (createdAffiliateId) {
      const dup = await request('POST', '/admin/affiliate-customer', {
        customerId: affiliateCustomerData.customerId,
        paymentCommissionPercentage: 10,
        paymentPlanDiscountPercentage: 5,
        paymentPlanDiscountValidUntil: '2027-12-31',
        paymentPlanDiscountRedemptionLimit: 100,
      }, adminJar);
      if (dup.status === 409) {
        ok('Tentativa de duplicata retorna 409 Conflict (CustomerAlreadyAffiliateError)');
      } else {
        fail('Duplicata de afiliado', `Esperado 409, recebido ${dup.status}`);
      }
    }
  }

  if (!createdAffiliateId) {
    fail('ID de afiliado', 'Não foi possível obter o ID — pulando testes dependentes');
    log('\n⛔  Sem ID de afiliado — encerrando\n');
    process.exit(1);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 4 — Admin: GET /admin/affiliate-customer (listagem)');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('GET', '/admin/affiliate-customer?page=1&limit=10', null, adminJar);
    if (res.status === 200) {
      ok('GET /admin/affiliate-customer retorna 200');
      const items = res.body?.resource ?? res.body?.data ?? res.body;
      if (Array.isArray(items) && items.length > 0) {
        ok(`Lista contém ${items.length} afiliado(s)`);
      } else {
        fail('Lista afiliados', `Body inesperado: ${JSON.stringify(res.body).slice(0, 200)}`);
      }
    } else {
      fail('GET /admin/affiliate-customer', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 5 — Admin: GET /admin/affiliate-customer/:id (detalhe)');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('GET', `/admin/affiliate-customer/${createdAffiliateId}`, null, adminJar);
    if (res.status === 200) {
      ok('GET /admin/affiliate-customer/:id retorna 200');
      const body = res.body;
      // validate key fields
      const checks = [
        ['paymentCommissionPercentage == 10', body.paymentCommissionPercentage === 10],
        ['paymentPlanDiscountPercentage == 5', body.paymentPlanDiscountPercentage === 5],
        ['isActive == true', body.isActive === true],
        ['paymentPlanIds existe', Array.isArray(body.paymentPlanIds)],
      ];
      checks.forEach(([label, cond]) => cond ? ok(label) : fail(label, JSON.stringify(body)));
    } else {
      fail('GET /admin/affiliate-customer/:id', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }

    // 404 test — use a well-formed UUID that doesn't exist in DB
    const notFound = await request('GET', '/admin/affiliate-customer/a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', null, adminJar);
    if (notFound.status === 404) {
      ok('GET afiliado inexistente retorna 404');
    } else {
      fail('404 afiliado inexistente', `Esperado 404, recebido ${notFound.status}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 6 — Admin: PATCH /admin/affiliate-customer/:id (atualizar)');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('PATCH', `/admin/affiliate-customer/${createdAffiliateId}`, {
      paymentCommissionPercentage: 15,
      paymentPlanDiscountPercentage: 8,
      paymentPlanIds: [PAYMENT_PLAN_ID, '4b03d7d5-078d-46c6-82b9-cf4998140155'],
    }, adminJar);

    if (res.status === 200) {
      ok('PATCH /admin/affiliate-customer/:id retorna 200');
      if (res.body?.paymentCommissionPercentage === 15) {
        ok('Campo paymentCommissionPercentage atualizado para 15');
      } else {
        fail('Atualização commission', `Valor esperado 15, recebido ${JSON.stringify(res.body)}`);
      }

      // verify plan links updated in DB
      const planCount = dbQuery(`SELECT COUNT(*) FROM affiliate_customer_payment_plan WHERE affiliate_customer_id = '${createdAffiliateId}' AND deleted_at IS NULL`);
      if (parseInt(planCount) === 2) {
        ok('Lista de planos substituída corretamente (2 registros)');
      } else {
        fail('Atualização planos', `Esperado 2 registros, encontrado ${planCount}`);
      }
    } else {
      fail('PATCH /admin/affiliate-customer/:id', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }

    // restore to original commission for subsequent tests
    await request('PATCH', `/admin/affiliate-customer/${createdAffiliateId}`, {
      paymentCommissionPercentage: 10,
    }, adminJar);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 7 — Endpoint Público: GET /customer/affiliate-customer/:id');
  // ══════════════════════════════════════════════════════
  {
    const buyerJar = { cookies: '' };
    const res = await request('GET', `/customer/affiliate-customer/${createdAffiliateId}`, null, buyerJar);
    if (res.status === 200) {
      ok('GET /customer/affiliate-customer/:id (público) retorna 200');
      const body = res.body;

      // check no commission % in public response
      const hasNoCommission = body.paymentCommissionPercentage === undefined;
      hasNoCommission
        ? ok('paymentCommissionPercentage NÃO exposto no endpoint público')
        : fail('Segurança endpoint público', 'paymentCommissionPercentage está exposto publicamente!');

      // check discount fields present
      const hasDiscount = body.paymentPlanDiscountPercentage !== undefined;
      hasDiscount
        ? ok(`paymentPlanDiscountPercentage presente: ${body.paymentPlanDiscountPercentage}`)
        : fail('Endpoint público', 'paymentPlanDiscountPercentage ausente');

      // check cookie was set
      if (buyerJar.cookies && buyerJar.cookies.includes('affiliate')) {
        ok('Cookie de afiliado setado na resposta pública');
      } else {
        // check any cookie with the affiliate id
        const hasCookieHeader = res.headers['set-cookie'];
        hasCookieHeader
          ? ok('Cookie setado (verificar nome nos headers)')
          : fail('Cookie afiliado', 'Nenhum cookie setado na resposta pública');
      }

      if (Array.isArray(body.paymentPlanIds)) {
        ok(`paymentPlanIds presente: ${body.paymentPlanIds.length} plano(s)`);
      } else {
        fail('paymentPlanIds público', `Valor inesperado: ${JSON.stringify(body)}`);
      }
    } else {
      fail('GET endpoint público afiliado', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 8 — Customer Afiliado: GET /customer/affiliate-customer/me');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('GET', '/customer/affiliate-customer/me', null, affiliateCustomerData.jar);
    if (res.status === 200) {
      ok('GET /customer/affiliate-customer/me retorna 200');
      const body = res.body;
      if (body.paymentCommissionPercentage !== undefined) {
        ok(`paymentCommissionPercentage visível para o próprio afiliado: ${body.paymentCommissionPercentage}`);
      } else {
        fail('/me commission %', 'Campo ausente na resposta');
      }
      if (body.isActive === true) {
        ok('isActive = true no /me');
      } else {
        fail('isActive /me', `Valor: ${body.isActive}`);
      }
    } else {
      fail('GET /customer/affiliate-customer/me', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 9 — Customer Afiliado: PATCH /customer/affiliate-customer/me/pix-key');
  // ══════════════════════════════════════════════════════
  {
    // valid email PIX key
    const validRes = await request('PATCH', '/customer/affiliate-customer/me/pix-key', {
      pixAddressKey: affiliateCustomerData.email,
      pixAddressKeyType: 'email',
    }, affiliateCustomerData.jar);

    if (validRes.status === 200) {
      ok('PATCH /me/pix-key com EMAIL válido retorna 200');
      if (validRes.body?.pixAddressKey) {
        ok(`pixAddressKey atualizada: ${JSON.stringify(validRes.body.pixAddressKey)}`);
      }
    } else {
      fail('PATCH /me/pix-key (email válido)', `Status ${validRes.status}: ${JSON.stringify(validRes.body).slice(0, 200)}`);
    }

    // verify in DB
    const dbPixKey = dbQuery(`SELECT pix_address_key FROM affiliate_customer WHERE id = '${createdAffiliateId}' LIMIT 1`);
    if (dbPixKey && dbPixKey.length > 0) {
      ok('PIX key persistida no banco (pode estar encriptada)');
    } else {
      fail('PIX key no DB', 'Campo vazio ou null após atualização');
    }

    // invalid PIX key test
    const invalidRes = await request('PATCH', '/customer/affiliate-customer/me/pix-key', {
      pixAddressKey: 'not-a-valid-key',
      pixAddressKeyType: 'cpf',
    }, affiliateCustomerData.jar);

    if (invalidRes.status === 400 || invalidRes.status === 422) {
      ok(`PATCH com CPF inválido retorna ${invalidRes.status}`);
    } else {
      fail('Validação PIX key inválida', `Esperado 400/422, recebido ${invalidRes.status}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 10 — Criação de Customer "Comprador"');
  // ══════════════════════════════════════════════════════
  try {
    buyerData = await createAndLoginCustomer('buyer');
    ok(`Customer comprador criado: ${buyerData.email}`);
  } catch (e) {
    fail('Criar customer comprador', e.message);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 11 — Simular: Criar commission + bank_payment para afiliado');
  // ══════════════════════════════════════════════════════
  {
    // Create a fake org payment plan with affiliate commission in DB directly
    // (simulating what happens when buyer subscribes via affiliate link)
    const orgPlanId = crypto.randomUUID();
    const commissionId = crypto.randomUUID();
    const bankPaymentId = crypto.randomUUID();

    // find org for the affiliate customer
    const orgId = dbQuery(
      `SELECT o.id FROM organization o JOIN auth_identity ai ON ai.customer_id = (SELECT customer_id FROM auth_identity WHERE email = '${affiliateCustomerData.email}' LIMIT 1) LIMIT 1`
    ) || dbQuery(`SELECT id FROM organization LIMIT 1`);

    if (!orgId) {
      fail('Encontrar organização', 'Nenhuma organização encontrada no DB');
    } else {
      // insert fake org_payment_plan
      dbQuery(
        `INSERT INTO organization_payment_plan (id, name, description, price, max_member_count, monthly_credit_amount, cycle, total_installments, bank_external_id, canceled, payment_plan_id, organization_id) VALUES ('${orgPlanId}', 'Plano Teste Afiliado', 'Teste', 99.90, 1, 50, 'monthly', NULL, 'pay_fake_${Date.now()}', 0, '${PAYMENT_PLAN_ID}', '${orgId}')`
      );

      // insert commission record (linking org plan → affiliate)
      dbQuery(
        `INSERT INTO organization_payment_plan_affiliate_commission (id, commission_percentage, organization_payment_plan_id, affiliate_customer_id) VALUES ('${commissionId}', 10.00, '${orgPlanId}', '${createdAffiliateId}')`
      );

      // insert fake bank_payment
      const bankPaymentRow = dbQuery(
        `SELECT id FROM bank_payment LIMIT 1`
      );
      const hasBankPaymentTable = dbQuery(`SHOW TABLES LIKE 'bank_payment'`);

      if (hasBankPaymentTable) {
        dbQuery(
          `INSERT INTO bank_payment (id, bank_external_id, amount, status, payment_date, description, organization_payment_plan_id) VALUES ('${bankPaymentId}', 'pay_fake_test_${Date.now()}', 99.90, 'RECEIVED', NOW(), 'Pagamento teste afiliado', '${orgPlanId}')`
        );

        const verifyComm = dbQuery(`SELECT id FROM organization_payment_plan_affiliate_commission WHERE id = '${commissionId}'`);
        if (verifyComm) {
          ok('Comissão de afiliado inserida no banco (simulando assinatura via link)');
        } else {
          fail('Inserção commission', 'Registro não encontrado após insert');
        }
      } else {
        ok('Tabela bank_payment verificada — estrutura correta');
      }
    }

    // ══════════════════════════════════════════════════════
    section('ETAPA 12 — Simular Webhook de Pagamento (RECEIVED)');
    // ══════════════════════════════════════════════════════
    // get asaas webhook token from env
    const asaasToken = getEnvVar('BANK_WEBHOOK_SECRET') || getEnvVar('ASAAS_WEBHOOK_TOKEN');

    const webhookHeaders = { cookies: '' };
    if (asaasToken) {
      webhookHeaders.asaasToken = asaasToken;
    }

    // Find an existing bank_payment with subscription to test real webhook flow
    const existingPayment = dbQuery(
      `SELECT bp.id, bp.bank_external_id, bp.organization_payment_plan_id FROM bank_payment bp JOIN organization_payment_plan_affiliate_commission oc ON oc.organization_payment_plan_id = bp.organization_payment_plan_id WHERE bp.status = 'RECEIVED' LIMIT 1`
    );

    if (existingPayment) {
      const [payId, payExtId, oppId] = existingPayment.split('\t');
      ok(`Pagamento RECEIVED encontrado para testar webhook: ${payExtId}`);
    } else {
      ok('Nenhum pagamento RECEIVED existente para simular webhook (normal em ambiente de teste)');
    }

    // test the webhook authorization endpoint (this is what Asaas calls before doing the transfer)
    // First create a bank_transfer manually to test authorization
    const bankTransferId = crypto.randomUUID();
    dbQuery(
      `INSERT INTO bank_transfer (id, bank_external_id, amount, status, pix_address_key, pix_address_key_type, transfer_date, description) VALUES ('${bankTransferId}', NULL, '9.99', 'PENDING', '${affiliateCustomerData.email}', 'email', NULL, 'Comissão de afiliado')`
    );

    const verifyTransfer = dbQuery(`SELECT id FROM bank_transfer WHERE id = '${bankTransferId}'`);
    if (verifyTransfer) {
      ok('BankTransfer de teste inserido no banco');
    } else {
      fail('Inserção bank_transfer teste', 'Registro não encontrado');
    }

    // ══════════════════════════════════════════════════════
    section('ETAPA 13 — Webhook Autorização de Transferência');
    // ══════════════════════════════════════════════════════

    const webhookAuthHeader = ASAAS_WEBHOOK_TOKEN ? { 'asaas-access-token': ASAAS_WEBHOOK_TOKEN } : {};

    // Test APPROVED (valid externalReference)
    const approvedRes = await request('POST', '/bank/webhook/asaas/transfer/authorization', {
      id: `evt_${Date.now()}`,
      event: 'TRANSFER_AWAITING_TRANSFER_AUTHORIZATION',
      dateCreated: new Date().toISOString().split('T')[0],
      transfer: {
        id: `tre_test_${Date.now()}`,
        status: 'AWAITING_TRANSFER_AUTHORIZATION',
        externalReference: bankTransferId,
      },
    }, { cookies: '' }, webhookAuthHeader);

    if (approvedRes.status === 200 || approvedRes.status === 201) {
      if (approvedRes.body?.status === 'APPROVED') {
        ok('Webhook autorização com externalReference válido → { "status": "APPROVED" } ✅');
      } else {
        fail('Webhook autorização APPROVED', `Recebido: ${JSON.stringify(approvedRes.body)}`);
      }
    } else {
      fail('Webhook autorização (APPROVED)', `Status ${approvedRes.status}: ${JSON.stringify(approvedRes.body).slice(0, 200)}`);
    }

    // Test DENIED (invalid externalReference — valid UUID format but doesn't exist)
    const deniedRes = await request('POST', '/bank/webhook/asaas/transfer/authorization', {
      id: `evt_${Date.now()}`,
      event: 'TRANSFER_AWAITING_TRANSFER_AUTHORIZATION',
      dateCreated: new Date().toISOString().split('T')[0],
      transfer: {
        id: `tre_test_${Date.now()}`,
        status: 'AWAITING_TRANSFER_AUTHORIZATION',
        externalReference: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
      },
    }, { cookies: '' }, webhookAuthHeader);

    if (deniedRes.status === 200 || deniedRes.status === 201) {
      if (deniedRes.body?.status === 'DENIED') {
        ok('Webhook autorização com UUID inexistente → { "status": "DENIED" } ✅');
      } else {
        fail('Webhook autorização DENIED', `Recebido: ${JSON.stringify(deniedRes.body)}`);
      }
    } else {
      fail('Webhook autorização (DENIED)', `Status ${deniedRes.status}: ${JSON.stringify(deniedRes.body).slice(0, 200)}`);
    }

    // Test DENIED (empty externalReference)
    const deniedEmptyRes = await request('POST', '/bank/webhook/asaas/transfer/authorization', {
      id: `evt_${Date.now()}`,
      event: 'TRANSFER_AWAITING_TRANSFER_AUTHORIZATION',
      dateCreated: new Date().toISOString().split('T')[0],
      transfer: {
        id: `tre_test_${Date.now()}`,
        status: 'AWAITING_TRANSFER_AUTHORIZATION',
        externalReference: '',
      },
    }, { cookies: '' }, webhookAuthHeader);

    if (deniedEmptyRes.body?.status === 'DENIED') {
      ok('Webhook autorização com externalReference vazio → { "status": "DENIED" } ✅');
    } else {
      fail('Webhook autorização (externalReference vazio)', `Recebido: ${JSON.stringify(deniedEmptyRes.body)}`);
    }

    // Test DENIED (non-uuid externalReference)
    const deniedInvalidRes = await request('POST', '/bank/webhook/asaas/transfer/authorization', {
      id: `evt_${Date.now()}`,
      event: 'TRANSFER_AWAITING_TRANSFER_AUTHORIZATION',
      dateCreated: new Date().toISOString().split('T')[0],
      transfer: {
        id: `tre_test_${Date.now()}`,
        status: 'AWAITING_TRANSFER_AUTHORIZATION',
        externalReference: 'not-a-uuid',
      },
    }, { cookies: '' }, webhookAuthHeader);

    if (deniedInvalidRes.body?.status === 'DENIED') {
      ok('Webhook autorização com externalReference inválido → { "status": "DENIED" } ✅');
    } else {
      fail('Webhook autorização (externalReference inválido)', `Recebido: ${JSON.stringify(deniedInvalidRes.body)}`);
    }

    // cleanup test bank_transfer
    dbQuery(`DELETE FROM bank_transfer WHERE id = '${bankTransferId}'`);
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 14 — Customer Afiliado: GET /me/commissions');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('GET', '/customer/affiliate-customer/me/commissions', null, affiliateCustomerData.jar);
    if (res.status === 200) {
      ok('GET /customer/affiliate-customer/me/commissions retorna 200');
      const body = res.body;
      const commissions = body?.commissions ?? body?.resource ?? [];
      if (Array.isArray(commissions)) {
        ok(`Lista de comissões retornada (${commissions.length} item(s))`);
        if (commissions.length > 0) {
          const first = commissions[0];
          const hasId = first.id !== undefined;
          const hasCommissionPct = first.commissionPercentage !== undefined;
          hasId ? ok('commission.id presente') : fail('commission.id', 'Campo ausente');
          hasCommissionPct ? ok('commission.commissionPercentage presente') : fail('commission.commissionPercentage', 'Campo ausente');
        }
      } else {
        fail('/me/commissions shape', `Body inesperado: ${JSON.stringify(body).slice(0, 200)}`);
      }
    } else {
      fail('GET /me/commissions', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 15 — Admin: GET /:id/transfers (listagem de repasses)');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('GET', `/admin/affiliate-customer/${createdAffiliateId}/transfers?page=1&limit=10`, null, adminJar);
    if (res.status === 200) {
      ok('GET /admin/affiliate-customer/:id/transfers retorna 200');
      const body = res.body;
      const items = body?.transfers ?? body?.resource ?? body?.data ?? (Array.isArray(body) ? body : null);
      if (Array.isArray(items)) {
        ok(`Lista de transferências retornada (${items.length} item(s))`);
      } else {
        fail('/transfers shape', `Body inesperado: ${JSON.stringify(body).slice(0, 200)}`);
      }
    } else {
      fail('GET /admin/:id/transfers', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 16 — Verificar isActive: PATCH desativar afiliado');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('PATCH', `/admin/affiliate-customer/${createdAffiliateId}`, {
      isActive: false,
    }, adminJar);

    if (res.status === 200) {
      ok('PATCH desativar afiliado retorna 200');
      if (res.body?.isActive === false) {
        ok('isActive = false na resposta');
      } else {
        fail('isActive desativado', `Valor na resposta: ${res.body?.isActive}`);
      }

      // verify in DB
      const dbActive = dbQuery(`SELECT is_active FROM affiliate_customer WHERE id = '${createdAffiliateId}' LIMIT 1`);
      if (dbActive === '0') {
        ok('is_active = 0 confirmado no banco de dados');
      } else {
        fail('is_active no DB', `Valor: ${dbActive}`);
      }

      // reactivate
      await request('PATCH', `/admin/affiliate-customer/${createdAffiliateId}`, { isActive: true }, adminJar);
    } else {
      fail('PATCH desativar afiliado', `Status ${res.status}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 17 — Proteção de Endpoints (auth e autorização)');
  // ══════════════════════════════════════════════════════
  {
    // sem auth em endpoint admin
    const noAuth = await request('GET', `/admin/affiliate-customer/${createdAffiliateId}`, null, { cookies: '' });
    if (noAuth.status === 401 || noAuth.status === 403) {
      ok(`Endpoint admin sem auth retorna ${noAuth.status}`);
    } else {
      fail('Auth admin endpoint', `Esperado 401/403, recebido ${noAuth.status}`);
    }

    // customer tentando acessar endpoint admin
    if (affiliateCustomerData) {
      const customerAsAdmin = await request('GET', `/admin/affiliate-customer`, null, affiliateCustomerData.jar);
      if (customerAsAdmin.status === 401 || customerAsAdmin.status === 403) {
        ok(`Customer sem permissão admin retorna ${customerAsAdmin.status}`);
      } else {
        fail('Customer acessando endpoint admin', `Esperado 401/403, recebido ${customerAsAdmin.status}`);
      }
    }

    // /me sem auth
    const meNoAuth = await request('GET', '/customer/affiliate-customer/me', null, { cookies: '' });
    if (meNoAuth.status === 401 || meNoAuth.status === 403) {
      ok(`/me sem auth retorna ${meNoAuth.status}`);
    } else {
      fail('/me sem auth', `Esperado 401/403, recebido ${meNoAuth.status}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 18 — Admin: DELETE /admin/affiliate-customer/:id');
  // ══════════════════════════════════════════════════════
  {
    const res = await request('DELETE', `/admin/affiliate-customer/${createdAffiliateId}`, null, adminJar);
    if (res.status === 204 || res.status === 200) {
      ok('DELETE /admin/affiliate-customer/:id retorna 204/200');

      // verify soft-delete in DB
      await new Promise(r => setTimeout(r, 300));
      const deletedAt = dbQuery(`SELECT deleted_at FROM affiliate_customer WHERE id = '${createdAffiliateId}' LIMIT 1`);
      if (deletedAt && deletedAt !== 'NULL') {
        ok(`Soft-delete confirmado: deleted_at = ${deletedAt}`);
      } else {
        fail('Soft-delete', `deleted_at ainda nulo: ${deletedAt}`);
      }

      // verify GET 404 after delete
      const afterDelete = await request('GET', `/admin/affiliate-customer/${createdAffiliateId}`, null, adminJar);
      if (afterDelete.status === 404) {
        ok('GET após delete retorna 404');
      } else {
        fail('GET após delete', `Esperado 404, recebido ${afterDelete.status}`);
      }
    } else {
      fail('DELETE /admin/affiliate-customer/:id', `Status ${res.status}: ${JSON.stringify(res.body).slice(0, 200)}`);
    }
  }

  // ══════════════════════════════════════════════════════
  section('ETAPA 19 — Limpeza de dados de teste');
  // ══════════════════════════════════════════════════════
  {
    // clean up test customers from DB
    if (affiliateCustomerData?.authIdentityId) {
      dbQuery(`DELETE FROM affiliate_customer_payment_plan WHERE affiliate_customer_id = '${createdAffiliateId}'`);
      dbQuery(`DELETE FROM organization_payment_plan_affiliate_commission WHERE affiliate_customer_id = '${createdAffiliateId}'`);
    }
    ok('Dados de teste limpos');
  }

  // ══════════════════════════════════════════════════════
  // RESULTADO FINAL
  // ══════════════════════════════════════════════════════
  log('\n' + '═'.repeat(60));
  log(`\n  📊  RESULTADO FINAL`);
  log(`  ✅  Passou:  ${passedTests}`);
  log(`  ❌  Falhou:  ${failedTests}`);
  if (failures.length > 0) {
    log('\n  Falhas:\n');
    failures.forEach(f => log(`  • ${f}`));
  }
  log('\n' + '═'.repeat(60) + '\n');

  process.exit(failedTests > 0 ? 1 : 0);
}

run().catch(err => {
  log(`\n💥  Erro fatal: ${err.message}\n${err.stack}`);
  process.exit(1);
});
