import { Http, authHttp } from './http';
import queryString from 'query-string';

export const TOILET_LIST = 'toiletList';
export const SI_DO_LIST = 'sidoList';
export const SI_GUN_GU_LIST = 'sigunguList';
export const TOILET_INFO = 'toiletInfo';

export const getSidoList = async () => {
  const { data } = await Http.get(`${SI_DO_LIST}`);

  return data.sidoList;
};

export const getSiGunguList = async (sido) => {
  const { data } = await Http.get(`${SI_GUN_GU_LIST}`, { params: { sido } });

  return data.sigunguList;
};

export const getToiletList = async (query) => {
  const { data } = await authHttp.get(`${TOILET_LIST}`, { params: query });

  return data;
};

export const getToiletInfo = async (id) => {
  const { data } = await authHttp.get(`${TOILET_INFO}?seq=${id}`);

  return data.toiletInfo;
};
