import React, { memo, useMemo, useState } from 'react';
import styled from 'styled-components';
import { CheckBox, Input, Radio, Select, Text } from '../components';

const OPTION_LIST = {
  tolietType: [
    { label: '공중화장실', value: 'normal' },
    { label: '개방화장실', value: 'open' },
  ],
  babyYn: [
    { label: '가능', value: 'Y' },
    { label: '불가능', value: 'N' },
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
  manageYn: [
    { label: '예', value: 'true' },
    { label: '아니오', value: 'false' },
  ],
};

const useLocationDetailPage = () => {
  const [form, setForm] = useState({
    name: '',
    address: '',
    openTime: '',
    closeTime: '',
    tolietType: '',
    countMan: '',
    countWomen: '',
    babyYn: '',
    unusualYn: '',
    cctvYn: '',
    alarmYn: '',
    pwdYn: '',
    etc: '',
    manageYn: '',
  });

  const fieldList = useMemo(
    () => [
      { type: 'input', label: '장소명', name: 'name', value: form.name },
      { type: 'input', label: '주소', name: 'address', value: form.address },
      {
        type: '',
        label: '개방시간',
        name: 'time',
        value: [form.openTime, form.closeTime],
      },
      {
        type: 'select',
        label: '화장실 종류',
        name: 'tolietType',
        value: form.tolietType,
        options: OPTION_LIST.tolietType,
      },
      {
        type: '',
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
      { type: 'input', label: '비고', name: 'etc', value: form.etc },
      {
        type: 'radio',
        label: '승인여부',
        name: 'manageYn',
        value: form.manageYn,
        options: OPTION_LIST.manageYn,
      },
    ],
    [form],
  );

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  return { fieldList, handleOnChange };
};

const LocationDetailPage = () => {
  const { fieldList, handleOnChange } = useLocationDetailPage();

  return (
    <Container>
      <Text size="20px" lineHeight="24px" fontWeight="600">
        장소등록
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
    </Container>
  );
};

export default LocationDetailPage;

const Container = styled.div`
  padding: 20px;
  flex: 1;
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
  width: 200px;
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
      return <div>시간</div>;
    }
    case 'count': {
      return <div>개수</div>;
    }
    default:
      null;
  }
});
