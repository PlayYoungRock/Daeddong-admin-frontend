import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, CheckBox, Input, Select } from '../components';

const SI_LIST = [
  { label: '서울', value: 'seoul' },
  { label: '대전', value: 'daejeon' },
  { label: '경기', value: 'gyeonggi' },
];

const GUNGU_LIST = [
  { label: '은평', value: 'eunpyeong' },
  { label: '강북', value: 'gangbuk' },
  { label: '서대문', value: 'seodaemun' },
];

const SIZE_LIST = [
  { label: '10개씩 보기', value: '10' },
  { label: '20개씩 보기', value: '20' },
  { label: '30개씩 보기', value: '30' },
];

const MOCK_ROW_LIST = [
  {
    seq: '1',
    name: '장소1',
    address: '주소1',
    tolietType: '화장실1',
    manageAgency: 'X',
  },
  {
    seq: '2',
    name: '장소2',
    address: '주소2',
    tolietType: '화장실2',
    manageAgency: 'X',
  },
  {
    seq: '3',
    name: '장소3',
    address: '주소3',
    tolietType: '화장실3',
    manageAgency: 'X',
  },
];

const useLocationListPage = () => {
  const [filter, setFilter] = useState({
    si: SI_LIST[0].value,
    gungu: GUNGU_LIST[0].value,
    value: '',
    size: SIZE_LIST[0].value,
  });

  const handleOnChange = (key) => (value) =>
    setFilter((filter) => ({
      ...filter,
      [key]: key === 'value' ? value.target.value : value,
    }));

  const [checkList, setCheckList] = useState(MOCK_ROW_LIST.map(() => false));

  const handleOnToggle = (index) => (e) => {
    setCheckList((checkList) =>
      checkList.map((check, i) =>
        index === 'all' || index === i ? e.target.checked : check,
      ),
    );
  };

  return { filter, checkList, handleOnChange, handleOnToggle };
};

const LocationListPage = () => {
  const { filter, checkList, handleOnChange, handleOnToggle } =
    useLocationListPage();

  return (
    <Container>
      <div>
        <FilterWrapper>
          <Select
            width="200px"
            value={filter.si}
            options={SI_LIST}
            onChange={handleOnChange('si')}
          />
          <Select
            width="200px"
            value={filter.gungu}
            options={GUNGU_LIST}
            onChange={handleOnChange('gungu')}
          />
          <Input
            $width="100%"
            value={filter.value}
            onChange={handleOnChange('value')}
          />
          <Button width="100px" buttonType="outline">
            초기화
          </Button>
          <Button width="100px">검색</Button>
        </FilterWrapper>
        <FilterWrapper isreverse="true" mt="20px">
          <Button width="100px" buttonType="outline">
            다운로드
          </Button>
          <Select
            width="200px"
            value={filter.size}
            options={SIZE_LIST}
            onChange={handleOnChange('size')}
          />
        </FilterWrapper>
      </div>
      <Divider />
      <Table>
        <THead>
          <tr>
            <Th>
              <CheckBox
                checked={checkList.every((check) => check)}
                onChange={handleOnToggle('all')}
              />
            </Th>
            <Th>번호</Th>
            <Th>장소명</Th>
            <Th>주소</Th>
            <Th>화장실종류</Th>
            <Th>승인여부</Th>
          </tr>
        </THead>
        <tbody>
          {MOCK_ROW_LIST.map((r, i) => (
            <tr key={`location-table-row-${i}`}>
              <Td>
                <CheckBox checked={checkList[i]} onChange={handleOnToggle(i)} />
              </Td>
              <Td>{r.seq}</Td>
              <Td>{r.name}</Td>
              <Td>{r.address}</Td>
              <Td>{r.tolietType}</Td>
              <Td>{r.manageAgency}</Td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default LocationListPage;

const Container = styled.div`
  padding: 20px;
  flex: 1;
`;

const FilterWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 20px;
  margin-top: ${({ mt }) => (mt ? mt : 0)};
  justify-content: ${({ isreverse }) => (isreverse ? 'end' : 'start')};
`;

const Divider = styled.div`
  margin-top: 20px;
  border-top: 1px solid gainsboro;
`;

const Table = styled.table`
  margin-top: 20px;
  width: 100%;
  border-collapse: collapse;
  border: 0;
`;

const THead = styled.thead`
  font-weight: bold;
  color: #fff;
  background: #73685d;
`;

const Th = styled.th`
  padding: 8px;
  vertical-align: middle;
`;

const Td = styled.td`
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
`;