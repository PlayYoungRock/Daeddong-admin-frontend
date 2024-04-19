import React, { memo, useEffect } from 'react';
import styled from 'styled-components';

import { Text } from '../Text';

import { useScript } from '@hooks';

export const Map = memo(({ src, latitude, longitude, onClick }) => {
  const { isLoading, error } = useScript(src ?? '');

  useEffect(() => {
    if (isLoading || error || !naver.maps) return;

    const map = new naver.maps.Map('map', {
      center: new naver.maps.LatLng(latitude, longitude),
      zoom: 17,
    });

    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(latitude, longitude),
      map: map,
    });

    const listener = naver.maps.Event.addListener(map, 'click', (e) => onClick(e.coord));

    return () => {
      naver.maps.Event.removeListener(listener);
      marker.setMap(null);
    };
  }, [isLoading, error, onClick]);

  if (isLoading)
    return (
      <Container>
        <Text>naver 지도 불러오는중..</Text>
      </Container>
    );

  return <Container id="map" />;
});

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 400px;
  height: 400px;
`;
