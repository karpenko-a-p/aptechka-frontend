'use server';

import 'server-only';
import { Client } from 'pg';

const client = new Client();

export const register = async (payload: FormData) => {
  // TODO logic
};