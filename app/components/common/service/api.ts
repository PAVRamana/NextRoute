/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import api, { baseURL } from './axios';
import axios from 'axios';

interface GetApiProps {
  run: any;
  data: any;
  isLoading: boolean;
  isResolved: boolean;
  error: any;
}

interface PostApiProps {
  run: any;
  data: any;
  isLoading: boolean;
  isResolved: boolean;
  error: any;
}

const baseData = {
  baseURL: 'https://company9994-poc.api.identitynow-demo.com/',
  headers: {
    'Content-Type': 'application/json',
  },
};

const usePostApi = (): PostApiProps => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(false);
  const [error, setError] = useState<any>();

  const setStatus = (initial?: boolean) => {
    setIsLoading(initial ? true : false);
    setIsResolved(initial ? false : true);
  };

  const run = (url: string, accessToken: string, payload: any) => {
    setStatus(true);

    axios({
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseURL}${url}`,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      data: { ...payload },
    })
      .then((response: any) => {
        setData(response.data);
        setStatus();
      })
      .catch((error: any) => {
        setStatus();
        setError(error);
      });
  };

  return {
    run,
    data,
    isLoading,
    isResolved,
    error,
  };
};

const useFetchApi = (): GetApiProps => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isResolved, setIsResolved] = useState<boolean>(false);

  const [error, setError] = useState<any>();

  const setStatus = (initial?: boolean) => {
    setIsLoading(initial ? true : false);
    setIsResolved(initial ? false : true);
  };

  const run = (url: string, payload: any) => {
    setStatus(true);
    void api
      .get(url, payload)
      .then((response) => {
        setData(response.data);
        setStatus();
      })
      .catch((error) => {
        setStatus();
        setError(error);
      });
  };

  return {
    run,
    data,
    isLoading,
    isResolved,
    error,
  };
};

export { useFetchApi, usePostApi };
