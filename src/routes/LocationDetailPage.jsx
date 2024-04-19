import React, { memo, useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { NAVER_MAP_SDK_URL } from '@constants';
import { Button, CheckBox, Input, Radio, Select, Text, Map } from '@components';
import { TOILET_INFO, getToiletInfo } from '@utils';
import { useScript } from '@hooks';

import { HOME_PAGE, LOCATION_LIST_PAGE } from './router';

const OPTION_LIST = {
  toiletType: [
    { label: '공중화장실', value: '공중화장실' },
    { label: '개방화장실', value: '개방화장실' },
  ],
  babyYn: [
    { label: '가능', value: 'Y' },
    { label: '불가능', value: 'N' },
  ],
  unusualYn: [
    { label: '가능', value: 'Y' },
    { label: '불가능', value: 'N' },
  ],
  cctvYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  alarmYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  pwdYn: [
    { label: '있음', value: 'Y' },
    { label: '없음', value: 'N' },
  ],
  openYn: [
    { label: '예', value: 'Y' },
    { label: '아니오', value: 'N' },
  ],
};

const useLocationDetailPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { seq } = useParams();

  const pageType = useMemo(() => (seq ? '수정' : '등록'), [seq]);

  const [form, setForm] = useState({
    name: '',
    address: '',
    latitude: 37.3595704,
    longitude: 127.105399,
    openTime: '',
    closeTime: '',
    toiletType: '',
    countMan: '',
    countWomen: '',
    babyYn: '',
    unusualYn: '',
    cctvYn: '',
    alarmYn: '',
    pwdYn: '',
    etc: '',
    openYn: '',
  });

  const fieldList = useMemo(
    () => [
      {
        type: 'input',
        label: '장소명',
        readOnly: true,
        name: 'name',
        value: form.name,
      },
      {
        type: 'customMap',
        label: '주소',
        readOnly: true,
        name: 'coord',
        value: [form.latitude, form.longitude, form.address],
        onClick: ({ x, y }) => setForm((f) => ({ ...f, latitude: y, longitude: x })),
      },
      {
        type: 'time',
        label: '개방시간',
        readOnly: true,
        name: 'time',
        value: [form.openTime, form.closeTime],
      },
      {
        type: 'select',
        label: '화장실 종류',
        readOnly: true,
        name: 'toiletType',
        value: form.toiletType,
        options: OPTION_LIST.toiletType,
      },
      {
        type: 'count',
        label: '화장실 개수',
        readOnly: true,
        name: 'count',
        value: [form.countMan, form.countWomen],
      },
      {
        type: 'select',
        label: '기저귀 교환대 여부',
        readOnly: true,
        name: 'babyYn',
        value: form.babyYn,
        options: OPTION_LIST.babyYn,
      },
      {
        type: 'select',
        label: '장애인 화장실 여부',
        readOnly: true,
        name: 'unusualYn',
        value: form.unusualYn,
        options: OPTION_LIST.unusualYn,
      },
      {
        type: 'select',
        label: 'CCTV 여부',
        readOnly: true,
        name: 'cctvYn',
        value: form.cctvYn,
        options: OPTION_LIST.cctvYn,
      },
      {
        type: 'select',
        label: '비상벨 여부',
        readOnly: true,
        name: 'alarmYn',
        value: form.alarmYn,
        options: OPTION_LIST.alarmYn,
      },
      {
        type: 'select',
        label: '비밀번호 여부',
        readOnly: true,
        name: 'pwdYn',
        value: form.pwdYn,
        options: OPTION_LIST.pwdYn,
      },
      {
        type: 'input',
        label: '비고',
        readOnly: true,
        name: 'etc',
        value: form.etc,
      },
      {
        type: 'radio',
        readOnly: true,
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

  return {
    pageType,
    fieldList,
    handleOnChange,
    handleOnSubmit,
    handleGoList,
  };
};

const LocationDetailPage = () => {
  const { pageType, fieldList, handleOnChange, handleOnSubmit, handleGoList } =
    useLocationDetailPage();

  return (
    <Container>
      <Text size="20px" lineHeight="24px" fontWeight="600">
        장소{pageType}
      </Text>
      <FormContainer>
        {fieldList.map(({ label, ...field }, i) => (
          <FormWrapper key={`detail-location-field-${i}`}>
            <LabelWrapper>
              <Text size="16px" lineHeight="20px">
                {label}
              </Text>
            </LabelWrapper>
            <FieldWrapper>
              <FieldItem {...field} onChange={handleOnChange} />
            </FieldWrapper>
          </FormWrapper>
        ))}
      </FormContainer>
      <CustomWrapper $mt="20px">
        <Button size="large" onClick={handleOnSubmit}>
          {pageType}
        </Button>
        <Button size="large" buttonType="outlined" onClick={handleGoList}>
          취소
        </Button>
      </CustomWrapper>
    </Container>
  );
};

export default LocationDetailPage;

const Container = styled.div`
  padding: 20px;
  flex: 1;
  overflow-y: auto;
`;

const FormContainer = styled.div`
  margin-top: 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const FormWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 8px;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 200px;
`;

const FieldWrapper = styled.div`
  flex: 1;
`;

const FieldItem = memo(({ type, ...props }) => {
  switch (type) {
    case 'input': {
      return <Input {...props} />;
    }
    case 'select': {
      return <Select {...props} />;
    }
    case 'checkbox': {
      return <CheckBox {...props} />;
    }
    case 'radio': {
      return <Radio {...props} />;
    }
    case 'time': {
      const [open, close] = props.value;

      return (
        <CustomWrapper>
          <Input width="300px" type="time" {...props} name="openTime" value={open} />
          <Input width="300px" type="time" {...props} name="closeTime" value={close} />
        </CustomWrapper>
      );
    }
    case 'count': {
      const [man, women] = props.value;
      return (
        <CustomWrapper>
          <Text>남자</Text>
          <Input width="150px" type="number" {...props} name="countMan" value={man} />
          <Text>여자</Text>
          <Input width="150px" type="number" {...props} name="countWomen" value={women} />
        </CustomWrapper>
      );
    }
    case 'customMap': {
      const { value, onChange, ...options } = props;
      const [latitude, longitude, address] = value;

      const { isLoading, error } = useScript(NAVER_MAP_SDK_URL);
      const [isLoadingSubmodule, setIsLoadingSubmodule] = useState(true);

      useEffect(() => {
        if (isLoading || error) return;

        naver.maps.onJSContentLoaded = () => {
          setIsLoadingSubmodule(false);
        };
      }, [isLoading, error]);

      useEffect(() => {
        if (isLoadingSubmodule) return;

        naver.maps.Service.reverseGeocode(
          {
            coords: new naver.maps.LatLng(latitude, longitude),
            orders: naver.maps.Service.OrderType.ROAD_ADDR,
          },
          (status, response) => {
            if (status === naver.maps.Service.Status.ERROR) return;
            onChange({
              target: {
                name: 'address',
                value: response.v2.address.roadAddress.replaceAll('  ', ' '),
              },
            });
          },
        );
      }, [isLoadingSubmodule, latitude, longitude]);

      return (
        <CustomMapWrapper>
          <Map {...options} latitude={latitude} longitude={longitude} src={NAVER_MAP_SDK_URL} />
          <Text>{address}</Text>
        </CustomMapWrapper>
      );
    }
    default:
      null;
  }
});

const CustomWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;
  margin-top: ${({ $mt }) => $mt ?? '0px'};
`;

const CustomMapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
