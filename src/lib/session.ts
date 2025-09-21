import 'server-only'
import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { prisma } from '../utils/prisma/prisma';
import { redirect } from 'next/navigation';

type SessionPayload = {
  userId: number
  rolId: number
  expiresAt: Date
}

const secretKey = process.env.SESSION_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('30min')
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ['HS256'],
    });

    return {
      payload,
      isAuthenticate: true
    }
  } catch (error) {
    console.log(`Failed to verify session : ${error}`);
    return {
      isAuthenticate: false
    }
  }
}

export async function createSession(userId: number, rolId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const session = await encrypt({ userId, rolId, expiresAt });

  await prisma.session.create({
    data: {
      userId,
      expiresAt
    }
  });

  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    httpOnly: true,
    secure: true,
    expires: expiresAt,
    sameSite: 'lax',
    path: '/',
  });
}

export async function getSession(getRolId: boolean = false) {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  const { payload, isAuthenticate } = await decrypt(session?.value);

  if (!isAuthenticate) {
    redirect('/');
  }

  if (getRolId) return Number(payload?.rolId)

  return Number(payload?.userId)
}

export async function validateSession() {
  return await getSession()
}