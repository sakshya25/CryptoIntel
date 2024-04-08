import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoExchangesHeaders = {
  'X-RapidAPI-Key': 'b50f0efcd6mshfb6c8c5d3c38ffap1c8a0ajsn00988bbb242f',
  'X-RapidAPI-Host': 'coingecko.p.rapidapi.com',
};

export const cryptoExchangesApi = createApi({
  reducerPath: 'cryptoExchangesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://coingecko.p.rapidapi.com/' }),
  endpoints: (builder) => ({
    getCryptoExchanges: builder.query({
      query: () => ({
        url: 'exchanges',
        headers: cryptoExchangesHeaders,
      }),
    }),
  }),
});

export const { useGetCryptoExchangesQuery } = cryptoExchangesApi;
