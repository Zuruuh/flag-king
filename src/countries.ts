import { createResource } from 'solid-js';
import { record, string, parseAsync } from 'valibot';
import { shuffle } from 'remeda';
import { normalizeCountryName } from './utils';

const CountriesSchema = record(string(), string());

export const createCountriesResource = () =>
  createResource(async () => {
    const response = await fetch('/countries.json');
    const json = await response.json();

    return parseAsync(CountriesSchema, json).then((countries) =>
      shuffle(
        Object.entries(countries)
          .map(([key, value]) => ({
            code: key,
            name: value,
            normalizedName: normalizeCountryName(value),
          }))
          .filter(
            ({ code }) =>
              code.length === 2 &&
              ![
                'eu',
                'un',
                'gs',
                'tf',
                'io',
                'um',
                'bq',
                'sj',
                'vi',
                'wf',
                'hk',
                'yt',
                'hm',
                'vg',
                'sm',
              ].includes(code),
          ),
      ),
    );
  });
