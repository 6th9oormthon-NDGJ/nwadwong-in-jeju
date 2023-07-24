import { useMutation, useQuery } from '@tanstack/react-query';
import { Organization } from '../types/organization';

export const getAllOrganizations = async () => {
  const response = await (await fetch('https://goormtone6th.com/organization/list')).json();
  return response;
};

export const getOrganizationById = async (organizationId: string) => {
  const response = await (await fetch(`https://goormtone6th.com/organization?organizationId=${organizationId}`)).json();
  return response;
};

export const postDonation = async (organizationId: string, donationPoint: number) => {
  const token = localStorage.getItem('token');
  try {
    const request = await fetch('https://goormtone6th.com/donation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token!,
      },
      body: JSON.stringify({
        donationPoint,
        organizationId,
      }),
    });
    const result = await request.json();
    return result;
  } catch (err) {
    throw new Error('포인트 기부에 실!');
  }
};

export const useGetAllOrganizations = (options?: object) => {
  return useQuery<{ organizations: Organization[]; size: number }>(['allOrganizations'], getAllOrganizations, options);
};

export const useGetOrganizationById = (organizationId: string, options?: object) => {
  return useQuery<Organization>(['organization', organizationId], () => getOrganizationById(organizationId), options);
};

export const usePostDonation = (organizationId: string, donationPoint: number, option?: object) => {
  return useMutation(() => postDonation(organizationId, donationPoint), option);
};
