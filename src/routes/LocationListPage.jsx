import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Button, CheckBox, Input, Select, Text } from '../components';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [filter, setFilter] = useState({
    si: SI_LIST[0].value,
    gungu: GUNGU_LIST[0].value,
    value: '',
    size: SIZE_LIST[0].value,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFilter((filter) => ({
      ...filter,
      [name]: value,
    }));
  };

  const [checkList, setCheckList] = useState(MOCK_ROW_LIST.map(() => false));

  const handleOnToggle = (index) => (e) => {
    setCheckList((checkList) =>
      checkList.map((check, i) =>
        index === 'all' || index === i ? e.target.checked : check,
      ),
    );
  };

  const handleGoDetail = useCallback(
    (locationId) => navigate(`${locationId}`),
    [navigate],
  );

  return { filter, checkList, handleOnChange, handleOnToggle, handleGoDetail };
};

const LocationListPage = () => {
  const { filter, checkList, handleOnChange, handleOnToggle, handleGoDetail } =
    useLocationListPage();

  return (
    <Container>
      <div>
        <FilterWrapper>
          <SideWrapper>
            <Select
              width="100%"
              name="si"
              value={filter.si}
              options={SI_LIST}
              onChange={handleOnChange}
            />
            <Select
              name="gungu"
              value={filter.gungu}
              options={GUNGU_LIST}
              onChange={handleOnChange}
            />
          </SideWrapper>
          <Input
            name="value"
            value={filter.value}
            onChange={handleOnChange}
            style={{ flex: 2 }}
          />
          <SideWrapper>
            <Button buttonType="outline">초기화</Button>
            <Button>검색</Button>
          </SideWrapper>
        </FilterWrapper>
        <FilterWrapper isreverse="true" mt="20px">
          <Button width="100px" buttonType="outline">
            다운로드
          </Button>
          <Select
            width="200px"
            name="size"
            value={filter.size}
            options={SIZE_LIST}
            onChange={handleOnChange}
          />
          <Button width="100px" onClick={() => handleGoDetail('new')}>
            등록하기
          </Button>
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
              <Td onClick={() => handleGoDetail(r.seq)}>
                <CustomText>{r.name}</CustomText>
              </Td>
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
  overflow-y: auto;
`;

const SideWrapper = styled.div`
  flex: 1;
  flex-basis: 200px;
  display: flex;
  gap: 8px;
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

const CustomText = styled(Text)`
  color: cornflowerblue;
  cursor: pointer;
`;
