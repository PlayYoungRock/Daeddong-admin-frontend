import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

import { NAVER_MAP_SDK_URL } from '@constants';
import { Button, CheckBox, Input, Radio, Select, Text, Map } from '@components';
import { useScript } from '@hooks';

import { useLocationDetailPage } from './useLocationDetailPage';

export const LocationDetailPage = memo(() => {
  const { text, fieldList, isDisabledSubmitButton, handleOnChange, handleOnSubmit, handleGoList } =
    useLocationDetailPage();

  return (
    <Container>
      <Text size="20px" lineHeight="24px" fontWeight="600">
        {text.title}
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
        <Button size="large" onClick={handleOnSubmit} disabled={isDisabledSubmitButton}>
          {text.submitButton}
        </Button>
        <Button size="large" buttonType="outlined" onClick={handleGoList}>
          취소
        </Button>
      </CustomWrapper>
    </Container>
  );
});

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
