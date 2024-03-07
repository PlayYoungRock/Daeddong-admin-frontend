import React, { memo, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import { Button, CheckBox, Input, Select, Text } from '@components';

import { SI_LIST, SIZE_LIST } from './constants';
import { useLocationListPage } from './useLocationListPage';

export const LocationListPage = memo(() => {
  const {
    filter,
    checkList,
    toiletList,
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
  } = useLocationListPage();

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
              options={gunguList}
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
            <Button buttonType="outline" onClick={handleOnReset}>
              초기화
            </Button>
            <Button onClick={handleOnSubmit}>검색</Button>
          </SideWrapper>
        </FilterWrapper>
        <FilterWrapper $isReverse="true" $mt="20px">
          <Button width="100px" buttonType="outline">
            다운로드
          </Button>
          <Select
            width="200px"
            name="size"
            value={size}
            options={SIZE_LIST}
            onChange={handleOnChangePageInfo}
          />
          <Button width="100px" onClick={() => handleGoDetail('new')}>
            등록하기
          </Button>
        </FilterWrapper>
      </div>
      <Divider />
      {toiletList && (
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
            {toiletList.map(({ name, address, toiletType, openYn }, i) => (
              <tr key={`location-table-row-${i}`}>
                <Td>
                  <CheckBox
                    checked={checkList[i]}
                    onChange={handleOnToggle(i)}
                  />
                </Td>
                <Td>{(page - 1) * size + i + 1}</Td>
                <Td>{name}</Td>
                <Td>{address}</Td>
                <Td>{toiletType}</Td>
                <Td>{openYn}</Td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
      <Pagination
        page={page}
        size={size}
        total={total}
        onChange={handleOnChangePageInfo}
      />
    </Container>
  );
});

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
  margin-top: ${({ $mt }) => ($mt ? $mt : 0)};
  justify-content: ${({ $isReverse }) => ($isReverse ? 'end' : 'start')};
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

const Pagination = memo(({ page, size, total, onChange }) => {
  const totalPage = useMemo(() => Math.ceil(total / size), [total, size]);
  const startPage = useMemo(() => Math.ceil(page / 10 - 1) * 10, [page]);
  const endPage = useMemo(
    () => (totalPage - startPage > 10 ? startPage + 10 : totalPage),
    [totalPage, startPage],
  );

  const pageList = useMemo(
    () =>
      Array.from({ length: endPage - startPage }, (_, i) => startPage + i + 1),
    [startPage, endPage],
  );

  const handleOnChange = useCallback(
    (page) => {
      if (onChange) {
        onChange({ target: { name: 'page', value: page } });
      }
    },
    [onChange],
  );

  return (
    <PaginationContainer>
      {startPage !== 0 && (
        <CustomText onClick={() => handleOnChange(startPage - 9)}>
          이전
        </CustomText>
      )}
      {pageList.map((p, i) => (
        <CustomText
          key={i + 1}
          $isSelected={p === page}
          onClick={() => handleOnChange(p)}
        >
          {p}
        </CustomText>
      ))}
      {endPage !== totalPage && (
        <CustomText onClick={() => handleOnChange(endPage + 1)}>
          다음
        </CustomText>
      )}
    </PaginationContainer>
  );
});

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const CustomText = styled(Text)`
  color: ${({ $isSelected }) => ($isSelected ? 'cornflowerblue' : '#111')};
  cursor: pointer;

  &:hover {
    color: cornflowerblue;
  }
`;
