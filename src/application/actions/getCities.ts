import 'server-only';
import { cache } from 'react';
import { getService } from 'application/utils';
import { CITY_SERVICE } from 'application/abstractions';

const cityService = getService(CITY_SERVICE);

/**
 * Получение списка городов
 */
export const getCities = cache(() => cityService.getCities());
