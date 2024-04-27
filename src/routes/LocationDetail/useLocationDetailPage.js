import { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';

import {
  TOILET_INFO,
  getToiletInfo,
  postToiletInfo,
  patchToiletInfo,
  deleteToiletInfo,
} from '@utils';
import { useScript } from '@hooks';
import { NAVER_MAP_SDK_URL } from '@constants';

import { HOME_PAGE, LOCATION_LIST_PAGE } from '../router';
import { INITIAL_FORM, OPTION_LIST } from './constants';

export const useLocationDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { seq } = useParams();
  const [isLoadingNaverMapSDK] = useScript({ src: NAVER_MAP_SDK_URL });
  const [isLoadingSubmodule, setIsLoadingSubmodule] = useState(isLoadingNaverMapSDK);

  useEffect(() => {
    if (isLoadingNaverMapSDK) return;

    naver.maps.onJSContentLoaded = () => {
      setIsLoadingSubmodule(false);
    };
  }, [isLoadingNaverMapSDK]);

  const [form, setForm] = useState(null);

  // NOTE 화장실 정보 세팅 로직 생성
  useEffect(() => {
    if (seq) return;
    setForm(INITIAL_FORM);
  }, [seq]);

  // NOTE 화장실 정보 세팅 로직 수정
  const { refetch: refetchToiletInfo } = useQuery([TOILET_INFO, seq], () => getToiletInfo(seq), {
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

  const { mutate: createToilet, isLoading: isLoadingPostToiletInfo } = useMutation(
    (form) => postToiletInfo(form),
    {
      onSuccess: ({ resultCode }) => {
        if (resultCode === '0000') {
          alert('생성이 완료되었습니다.');
          navigate(`${HOME_PAGE}${LOCATION_LIST_PAGE}`);
        }
      },
      retry: 1,
    },
  );

  const { mutate: updateToilet } = useMutation((form) => patchToiletInfo(form), {
    onSuccess: ({ resultCode }) => {
      if (resultCode === '0000') {
        alert('수정이 완료되었습니다.');
        refetchToiletInfo();
      }
    },
    retry: 1,
  });

  const { mutate: deleteToilet } = useMutation((id) => deleteToiletInfo(id), {
    onSuccess: ({ resultCode }) => {
      if (resultCode === '0000') {
        alert('삭제가 완료되었습니다.');
        navigate(`${HOME_PAGE}${LOCATION_LIST_PAGE}`);
      }
    },
    retry: 1,
  });

  const text = useMemo(
    () => ({
      title: `장소${seq ? '수정' : '등록'}`,
      submitButton: seq ? '수정' : '등록',
    }),
    [seq],
  );

  const fieldList = useMemo(() => {
    return form
      ? [
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
            isLoading: isLoadingSubmodule,
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
        ]
      : [];
  }, [form, isLoadingSubmodule]);

  const isDisabledSubmitButton = useMemo(
    () =>
      !form?.name ||
      !form?.address ||
      !form?.latitude ||
      !form?.longitude ||
      isLoadingPostToiletInfo,
    [form, isLoadingPostToiletInfo],
  );

  const handleOnSubmit = useCallback(
    () => (seq ? updateToilet({ ...form, seq }) : createToilet(form)),
    [form, seq, createToilet, updateToilet],
  );

  const handleGoList = useCallback(() => {
    if (state?.previousUrl) {
      navigate(-1);
      return;
    }
    navigate(`${HOME_PAGE}${LOCATION_LIST_PAGE}`);
  }, [state, navigate]);

  const buttonList = useMemo(() => {
    const createButton = [
      {
        size: 'large',
        disabled: isDisabledSubmitButton,
        onClick: handleOnSubmit,
        children: text.submitButton,
      },
      { size: 'large', buttonType: 'outlined', onClick: handleGoList, children: '취소' },
    ];

    return seq
      ? [
          {
            size: 'large',
            variant: 'error',
            onClick: () => deleteToilet(seq),
            children: '삭제',
          },
          ...createButton,
        ]
      : createButton;
  }, [isDisabledSubmitButton, seq, handleOnSubmit, handleGoList, deleteToilet]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return {
    text,
    fieldList,
    buttonList,
    handleOnChange,
  };
};
