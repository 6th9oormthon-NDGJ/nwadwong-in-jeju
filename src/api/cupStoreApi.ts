import { useQuery } from '@tanstack/react-query';
import { CupStore } from '../types/CupStore';
import { Coord } from '../pages/Home/Home';
import { detailDataType } from '../pages/StoreDetail/StoreDetail';

export const getCupStoreDetailByID = async (id: string) => {
  const response = await (await fetch(`https://goormtone6th.com/detail?cupStoreId=${id}`)).json();
  return response;
};

export const getCupStoreByCoord = async (coord: Coord, distance: number) => {
  const response = await (
    await fetch(`https://goormtone6th.com/map/search?lat=${coord.lat}&lng=${coord.lng}&searchBoundary=${distance}`)
  ).json();
  return response;
};

export const useGetCupStoreByCoord = (coord: Coord, distance: number, options?: object) => {
  return useQuery<{ cupStores: CupStore[]; size: number }>(['cupStores'], () => getCupStoreByCoord(coord, distance), {
    enabled: false,
    ...options,
  });
};

export const useGetCupStoreDetailById = (id: string, options?: object) => {
  return useQuery<detailDataType>(['cupStoreDetail', id], () => getCupStoreDetailByID(id), options);
};
