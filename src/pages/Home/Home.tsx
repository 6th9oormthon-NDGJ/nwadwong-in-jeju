import { useEffect, useState } from 'react';
import useGeolocation from './useGeolocation';
import { styled } from 'styled-components';
import { getDistance } from './getDistance';
import { useGetCupStoreByCoord } from '../../api/cupStoreApi';
import FindCurrentPositon from './FindCurrentPositon';
import { CupStore } from '../../types/CupStore';
import CupStoreItem from './CupStoreItem';

declare global {
  interface Window {
    kakao: any;
  }
}

export interface Coord {
  lat: number;
  lng: number;
}

interface Marker {
  setMap(deleted?: null): () => void;
}

interface Bounds {
  getSouthWest(): {
    La: number;
    Ma: number;
  };
}

export interface Map {
  getCenter(): {
    Ma: number;
    La: number;
    getLat(): number;
    getLng(): number;
  };
  getLevel(): number;
  getBounds(): Bounds;
  setCenter(coord: Coord): () => void;
  panTo(coord: Coord): () => void;
}

export default function Home() {
  const [map, setMap] = useState<Map | null>(null);
  const [center, setCenter] = useState<Coord>({
    lat: 33.45030799569717,
    lng: 126.91804302601074,
  });
  const [, setCurrentLocation] = useState<Coord>({
    lat: 33.45030799569717,
    lng: 126.91804302601074,
  });
  const [visibleFindButton, setVisibleFindButton] = useState<boolean>(false);

  const [zoom, setZoom] = useState(5);
  const [distance, setDistance] = useState<number>(1300);
  const location = useGeolocation();
  const [markers, setMarkers] = useState<Marker[]>([]);
  const [selectedId, setSlectedId] = useState<number | null>(null);

  const { data, refetch } = useGetCupStoreByCoord(center, distance, {
    onSuccess: (result: { cupStores: CupStore[]; size: number }) => {
      createMarkers(result.cupStores);
    },
  });

  // 현재 위치 활성화
  useEffect(() => {
    if (location.loaded && !location.error?.code) {
      setCurrentLocation(location.coordinates!);
      const centerPosition = new window.kakao.maps.LatLng(location.coordinates?.lat, location.coordinates?.lng);
      map?.setCenter(centerPosition);

      const content = document.createElement('div');
      content.className = 'current-location';

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        position: centerPosition,
      });

      overlay.setMap(map);
    }
  }, [location.loaded]);

  // 최초 맵 렌더링
  useEffect(() => {
    const container = document.getElementById('map'); // 지도를 표시할 div

    const options = {
      center: new window.kakao.maps.LatLng(center.lat, center.lng),
      level: zoom,
      maxLevel: 8,
    };

    const createdMap = new window.kakao.maps.Map(container, options);
    createdMap.relayout();

    window.kakao.maps.event.addListener(createdMap, 'zoom_changed', () => {
      const level = createdMap!.getLevel();
      setZoom(level);
    });

    window.kakao.maps.event.addListener(createdMap, 'dragend', () => {
      const lat = createdMap!.getCenter().getLat();
      const lng = createdMap!.getCenter().getLng();
      setCenter({
        lat,
        lng,
      });
    });

    setMap(createdMap);
  }, []);

  useEffect(() => {
    if (!data) return;
    createMarkers(data.cupStores);
  }, [selectedId]);

  // 지도 이벤트 발생
  useEffect(() => {
    if (!map) return;
    const boundPoint = map.getBounds();

    const { La: targetLng, Ma: targetLat } = boundPoint.getSouthWest();
    const distance = getDistance({
      centerLat: center.lat,
      centerLng: center.lng,
      targetLat,
      targetLng,
    });

    setVisibleFindButton(true);
    setDistance(distance);
  }, [center, zoom]);

  function createMarkers(data: CupStore[]) {
    markers.forEach((marker) => marker.setMap(null));
    const createdMarkers = data!.map((cupStore) => {
      const markerPosition = new window.kakao.maps.LatLng(cupStore.lat, cupStore.lng);
      const content = document.createElement('div');
      content.className = 'custom-overlay';
      if (selectedId === cupStore.cupStoreId) content.classList.add('selected');
      content.id = '' + cupStore.cupStoreId;
      const isDisposible = cupStore.groupName === '일회용';
      content.innerHTML = ` 
        <svg width="40" height="43" viewBox="0 0 40 43" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_226_13498)">
          <path d="M16.2916 16.6666C16.2916 18.707 17.9595 20.3749 19.9999 20.3749C22.0403 20.3749 23.7082 18.707 23.7082 16.6666C23.7082 14.6261 22.0403 12.9583 19.9999 12.9583C17.9595 12.9583 16.2916 14.6261 16.2916 16.6666ZM7.04156 16.9999C7.04156 8.9185 13.1953 3.70825 19.9999 3.70825C26.8045 3.70825 32.9582 8.9185 32.9582 16.9999C32.9582 19.6655 31.8857 22.6133 29.6875 25.854C27.5305 29.0338 24.3049 32.473 19.9999 36.1728C15.6949 32.473 12.4693 29.0338 10.3123 25.854C8.11408 22.6133 7.04156 19.6655 7.04156 16.9999Z" fill=${
            isDisposible ? '#96B490' : '#B4F3A8'
          } stroke="black" stroke-width="0.75"/>
          </g>
          <defs>
          <filter id="filter0_d_226_13498" x="-2" y="-2" width="48" height="48" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix"/>
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
          <feOffset dx="2" dy="2"/>
          <feGaussianBlur stdDeviation="2"/>
          <feComposite in2="hardAlpha" operator="out"/>
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_226_13498"/>
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_226_13498" result="shape"/>
          </filter>
          </defs>
        </svg>
      `;

      content.addEventListener('click', () => {
        map!.panTo(markerPosition);
        setSlectedId(cupStore.cupStoreId);
        setCenter({
          lat: cupStore.lat,
          lng: cupStore.lng,
        });
      });

      const overlay = new window.kakao.maps.CustomOverlay({
        content,
        position: markerPosition,
      });

      overlay.setMap(map);
      return overlay;
    });
    setMarkers(createdMarkers);
  }

  return (
    <Container>
      <div
        id="map"
        style={{
          position: 'absolute',
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
      {visibleFindButton && (
        <FindCurrentPositon
          onClick={() => {
            setVisibleFindButton(false);
            refetch();
          }}
        />
      )}
      {/* <CurrentPositonButton
        isUpPosition={selectedId === null ? false : true}
        setCurrentLocation={setCurrentLocation}
      /> */}
      {selectedId && <CupStoreItem cupStore={data!.cupStores.find((item) => item.cupStoreId === selectedId)!} />}
    </Container>
  );
}

const Container = styled.div`
  .current-location {
    position: relative;
    width: 20px;
    aspect-ratio: 1/1;
    background-color: #f86363;
    border: 2px solid #fff;
    border-radius: 50%;
    box-shadow: 0px 0px 21px 1px rgba(133, 68, 68, 0.68);
  }

  .custom-overlay {
    transition: all 0.4s;
    animation: appearOverlay 0.3s forwards;
    z-index: 899;

    svg {
      fill: #fff;
    }

    &:hover,
    &.selected {
      transform: scale(1.4);
    }

    &.selected {
      background-color: var(--color-main);
      z-index: 900;
    }
  }

  @keyframes appearOverlay {
    0% {
      top: 10px;
      opacity: 0;
    }
    100% {
      top: 0;
      opacity: 1;
    }
  }
`;
