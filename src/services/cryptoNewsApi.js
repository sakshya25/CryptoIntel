import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const cryptoNewsHeaders = {
  'X-RapidAPI-Key': 'b50f0efcd6mshfb6c8c5d3c38ffap1c8a0ajsn00988bbb242f',
  'X-RapidAPI-Host': 'cryptocurrency-news2.p.rapidapi.com'
};

export const cryptoNewsApi = createApi({
  reducerPath: 'cryptoNewsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://cryptocurrency-news2.p.rapidapi.com/v1' }),
  endpoints: (builder) => ({
    getCryptoNews: builder.query({
      query: () => ({
        url: '/coindesk',
        headers: cryptoNewsHeaders
      }),
    }),
  }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;
