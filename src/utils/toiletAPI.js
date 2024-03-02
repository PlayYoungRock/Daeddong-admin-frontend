import { Http } from './http';
import queryString from 'query-string';

/**
 * @returns {Object}
 * @property {number} totalCount
 * @property {Array<Object>} toiletList
 */
export const getToiletList = async (query) => {
  const { data } = await Http.get(`toiletList?${queryString.stringify(query)}`);

  return data;
};
