import React, { memo, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { useScript } from '@hooks';
import { NAVER_MAP_SDK_URL } from '@constants';

export const Map = memo(({ latitude, longitude, onClick }) => {
  const [isLoading] = useScript({ src: NAVER_MAP_SDK_URL, checkForExisting: true });

  const [isFirstRender, setIsFirstRender] = useState(true);
  const map = useRef(null);

  // 초기 렌더링을 담당한다.
  useEffect(() => {
    if (!isFirstRender || isLoading) return;

    map.current = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 17,
    });

    setIsFirstRender(false);
  }, [isLoading, isFirstRender, latitude, longitude]);

  useEffect(() => {
    if (isFirstRender || isLoading) return;

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map.current,
    });

    const listener = naver.maps.Event.addListener(map.current, 'click', (e) => onClick(e.coord));

    return () => {
      naver.maps.Event.removeListener(listener);
      marker.setMap(null);
    };
  }, [isLoading, isFirstRender, latitude, longitude, onClick]);

  if (isLoading) return null;

  return <Container id="map" />;
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
`;
