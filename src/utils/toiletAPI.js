import { Http } from './http';
import queryString from 'query-string';

export const TOILET_LIST = 'toiletList';
export const SI_GUN_GU_LIST = 'sigunguList';
export const TOILET_INFO = 'toiletInfo';

/**
 * @returns {Object}
 * @property {number} totalCount
 * @property {Array<Object>} toiletList
 */
export const getToiletList = async (query) => {
  const { data } = await Http.get(
    `${TOILET_LIST}?${queryString.stringify(query)}`,
  );

  return data;
};

/**
 * @description 시군구 api 리소스가 부족하여 서울시의 군구만 받도록한다.
 */
export const getGunguList = async () => {
  const { data } = await Http.get(`${SI_GUN_GU_LIST}`);

  return data.sigunguList;
};

export const getToiletInfo = async (id) => {
  const { data } = await Http.get(`${TOILET_INFO}?seq=${id}`);

  return data.toiletInfo;
};
