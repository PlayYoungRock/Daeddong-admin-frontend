import { useCallback, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { TOILET_INFO, getToiletInfo } from '@utils';

import { HOME_PAGE, LOCATION_LIST_PAGE } from '../router';
import { OPTION_LIST } from './constants';

export const useLocationDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { seq } = useParams();

  const text = useMemo(
    () => ({
      title: `장소${seq ? '수정' : '등록'}`,
      submitButton: seq ? '수정' : '등록',
    }),
    [seq],
  );

  const [form, setForm] = useState({
    name: '',
    address: '',
    latitude: 37.3595704,
    longitude: 127.105399,
    openTime: '00:00',
    closeTime: '23:59',
    toiletType: '',
    countMan: '',
    countWomen: '',
    babyYn: 'N',
    unusualYn: 'N',
    cctvYn: 'N',
    alarmYn: 'N',
    pwdYn: 'N',
    etc: '',
    openYn: 'N',
  });

  const fieldList = useMemo(
    () => [
      {
        type: 'input',
        label: '장소명',
        name: 'name',
        value: form.name,
      },
      {
        type: 'customMap',
        label: '주소',
        name: 'coord',
        value: [form.latitude, form.longitude, form.address],
        onClick: ({ x, y }) => setForm((f) => ({ ...f, latitude: y, longitude: x })),
      },
      {
        type: 'time',
        label: '개방시간',
        name: 'time',
        value: [form.openTime, form.closeTime],
      },
      {
        type: 'select',
        label: '화장실 종류',
        name: 'toiletType',
        value: form.toiletType,
        options: OPTION_LIST.toiletType,
      },
      {
        type: 'count',
        label: '화장실 개수',
        name: 'count',
        value: [form.countMan, form.countWomen],
      },
      {
        type: 'select',
        label: '기저귀 교환대 여부',
        name: 'babyYn',
        value: form.babyYn,
        options: OPTION_LIST.babyYn,
      },
      {
        type: 'select',
        label: '장애인 화장실 여부',
        name: 'unusualYn',
        value: form.unusualYn,
        options: OPTION_LIST.unusualYn,
      },
      {
        type: 'select',
        label: 'CCTV 여부',
        name: 'cctvYn',
        value: form.cctvYn,
        options: OPTION_LIST.cctvYn,
      },
      {
        type: 'select',
        label: '비상벨 여부',
        name: 'alarmYn',
        value: form.alarmYn,
        options: OPTION_LIST.alarmYn,
      },
      {
        type: 'select',
        label: '비밀번호 여부',
        name: 'pwdYn',
        value: form.pwdYn,
        options: OPTION_LIST.pwdYn,
      },
      {
        type: 'input',
        label: '비고',
        name: 'etc',
        value: form.etc,
      },
      {
        type: 'radio',
        label: '승인여부',
        name: 'openYn',
        value: form.openYn,
        options: OPTION_LIST.openYn,
      },
    ],
    [form],
  );
  // Script
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleOnSubmit = useCallback(() => {
    console.log(form);
    if (seq) {
      // TODO 수정api
    }
    // TODO 생성 api
  }, [form, seq]);

  const handleGoList = useCallback(() => {
    if (state?.previousUrl) {
      navigate(-1);
      return;
    }
    navigate(`${HOME_PAGE}${LOCATION_LIST_PAGE}`);
  }, [state, navigate]);
  // API
  useQuery([TOILET_INFO, seq], () => getToiletInfo(seq), {
    enabled: !!seq,
    onSuccess: ({ openTime, closeTime, unusualYn, ...data }) => {
      setForm({
        ...data,
        openTime: openTime.split('~')[0],
        closeTime: closeTime.split('~')[1] === '24:00' ? '00:00' : closeTime.split('~')[1],
        unusualYn: !!unusualYn ? 'Y' : 'N',
      });
    },
  });

  const isDisabledSubmitButton = useMemo(
    () => !form.name || !form.address || !form.latitude || !form.longitude,
    [form.name, form.address, form.latitude, form.longitude],
  );

  return {
    text,
    fieldList,
    isDisabledSubmitButton,
    handleOnChange,
    handleOnSubmit,
    handleGoList,
  };
};
