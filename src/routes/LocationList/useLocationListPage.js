import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { SI_LIST, GUNGU_LIST } from './constants';

import { getToiletList } from '@utils';

export const useLocationListPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    si: SI_LIST[0].value,
    gungu: GUNGU_LIST[0].value,
    value: '',
  });

  const [pageInfo, setPageInfo] = useState({ page: 1, size: 10, total: 1000 });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  const [checkList, setCheckList] = useState([]);

  const handleOnToggle = (index) => (e) => {
    setCheckList((checkList) =>
      checkList.map((check, i) =>
        index === 'all' || index === i ? e.target.checked : check,
      ),
    );
  };

  const { data: toiletList } = useQuery(['toiletList'], getToiletList);

  const handleGoDetail = useCallback(
    (locationId) => navigate(`${locationId}`),
    [navigate],
  );

  const handleOnChangePageInfo = (e) => {
    const { name, value } = e.target;

    setPageInfo((p) => ({
      ...p,
      page: name === 'size' ? 1 : Number(value),
      [name]: Number(value),
    }));
  };

  return {
    filter,
    checkList,
    toiletList,
    pageInfo,
    handleOnChange,
    handleOnToggle,
    handleGoDetail,
    handleOnChangePageInfo,
  };
};
