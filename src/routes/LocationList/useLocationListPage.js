import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { getToiletList } from '@utils';

import { SI_LIST, GUNGU_LIST, DEFAULT_PAGE_INFO } from './constants';

/**
 * @description 페이지 정보를 세팅 해준다.
 */
const usePagination = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState({ page: 0, size: 0 });

  useEffect(() => {
    const page = searchParams.get('page');
    const size = searchParams.get('size');
    const origin = { page, size };
    const current = { ...origin };

    if (isNaN(page) || !Number(page)) {
      current.page = DEFAULT_PAGE_INFO.page;
    }
    if (isNaN(size) || !Number(size)) {
      current.size = DEFAULT_PAGE_INFO.size;
    }

    if (!isEqual(origin, current)) {
      setSearchParams(current);
    }
  }, [searchParams]);

  useEffect(() => {
    const convert = (key) => {
      const value = searchParams.get(key);
      if (isNaN(value) || !Number(value)) {
        return null;
      }
      return Number(value);
    };

    setPageInfo({ page: convert('page'), size: convert('size') });
  }, [searchParams]);

  return {
    page: pageInfo.page,
    size: pageInfo.size,
    setSearchParams,
  };
};

export const useLocationListPage = () => {
  const navigate = useNavigate();

  // View
  const [filter, setFilter] = useState({
    si: SI_LIST[0].value,
    gungu: GUNGU_LIST[0].value,
    value: '',
  });
  const [checkList, setCheckList] = useState([]);
  const { page, size, setSearchParams } = usePagination();
  const [total, setTotal] = useState(0);
  // Script
  const handleOnToggle = (index) => (e) => {
    setCheckList((checkList) =>
      checkList.map((check, i) =>
        index === 'all' || index === i ? e.target.checked : check,
      ),
    );
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  const handleGoDetail = useCallback(
    (locationId) => navigate(`${locationId}`),
    [navigate],
  );

  const handleOnChangePageInfo = useCallback(
    (e) => {
      const { name, value } = e.target;

      setSearchParams({
        page: name === 'size' ? DEFAULT_PAGE_INFO.page : Number(value),
        size: name === 'page' ? size : Number(value),
      });
    },
    [size],
  );

  // API
  const { data: toiletListData } = useQuery(
    ['toiletList', page, size],
    () => getToiletList({ index: page - 1, count: size }),
    {
      enabled: !!page && !!size,
      onSuccess: ({ totalCount, toiletList }) => {
        setCheckList(Array.from({ length: toiletList.length }, () => false));
        setTotal(totalCount);
      },
    },
  );
  return {
    filter,
    checkList,
    toiletList: toiletListData?.toiletList,
    page,
    size,
    total,
    handleOnChange,
    handleOnToggle,
    handleGoDetail,
    handleOnChangePageInfo,
  };
};
