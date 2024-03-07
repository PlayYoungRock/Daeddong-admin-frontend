import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { isEqual } from 'lodash';

import { getToiletList, SI_GUN_GU_LIST, getGunguList } from '@utils';

import { DEFAULT_PAGE_INFO } from './constants';

const DEFAULT_FILTER = { si: '', gungu: '', searchWord: '' };

const useFilter = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [origin, setOrigin] = useState(DEFAULT_FILTER);
  const [filter, setFilter] = useState(DEFAULT_FILTER);

  useEffect(() => {
    setOrigin(
      Object.keys(DEFAULT_FILTER).reduce((pre, key) => {
        const valueOfKey = searchParams.getAll(key);

        switch (valueOfKey.length) {
          case 0:
            return pre;
          case 1:
            return { ...pre, [key]: valueOfKey[0] };
          default:
            return { ...pre, [key]: valueOfKey };
        }
      }, {}),
    );
  }, [searchParams]);

  useEffect(() => setFilter(origin), [origin]);

  const handleOnSubmit = useCallback(() => {
    if (!isEqual(origin, filter)) {
      setSearchParams((searchParams) => {
        Object.entries(filter).forEach(([key, value]) => {
          searchParams.set(key, value);
        });
        searchParams.set('page', DEFAULT_PAGE_INFO.page);
        return searchParams;
      });
    }
  }, [origin, filter]);

  const handleOnReset = () => setSearchParams(DEFAULT_PAGE_INFO);

  return { origin, filter, setFilter, handleOnSubmit, handleOnReset };
};

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
      setSearchParams((searchParams) => {
        Object.entries(current).forEach(([key, value]) => {
          searchParams.set(key, value);
        });
        return searchParams;
      });
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
  const { origin, filter, setFilter, handleOnSubmit, handleOnReset } =
    useFilter();
  const { page, size, setSearchParams } = usePagination();
  const [checkList, setCheckList] = useState([]);
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

      setSearchParams((searchParams) => {
        searchParams.set(
          'page',
          name === 'page' ? Number(value) : DEFAULT_PAGE_INFO.page,
        );
        searchParams.set('size', name === 'size' ? Number(value) : size);

        return searchParams;
      });
    },
    [size, setSearchParams],
  );

  // API
  const { data: gunguList } = useQuery([SI_GUN_GU_LIST], getGunguList, {
    select: (data) => data.map(({ gungu }) => ({ label: gungu, value: gungu })),
    initialData: [],
  });

  const { data: toiletListData } = useQuery(
    ['toiletList', page, size, ...Object.values(origin)],
    () =>
      getToiletList({
        gungu: origin.gungu,
        searchWord: origin.searchWord,
        index: page - 1,
        count: size,
      }),
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
    gunguList,
    page,
    size,
    total,
    handleOnChange,
    handleOnToggle,
    handleGoDetail,
    handleOnChangePageInfo,
    handleOnSubmit,
    handleOnReset,
  };
};
