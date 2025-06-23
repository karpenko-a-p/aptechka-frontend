'use server';

import { cookies } from 'next/headers';
import { AUTHORIZATION_COOKIE_NAME } from 'application/constants/auth';
import { redirect } from 'next/navigation';

/**
 * Выход из аккаунта (очистка токена)
 */
export async function logout(): Promise<void> {
  const cookie = await cookies();
  cookie.delete(AUTHORIZATION_COOKIE_NAME);
  redirect('/');
}