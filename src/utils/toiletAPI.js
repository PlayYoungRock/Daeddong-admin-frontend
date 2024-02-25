import { Http } from './http';

export const getToiletList = async () => {
  const { data } = await Http.get('toiletList');
  return data.toiletList;
};
