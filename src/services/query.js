import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useDispatch } from 'react-redux';

import axios from './axios';
import { setUser } from '../store/slices/authSlice';

export function useOneNovel(novelId) {
    return useQuery("useOneNovel", () =>
        axios.get(`/api/novel/${novelId}`)
    );
}

export function useNovels() {
    return useQuery("useNovels", () =>
        axios.get(`/api/novel`)
    );
}

export function useMyNovels() {
    return useQuery("useMyNovels", () =>
        axios.get(`/api/novel/mynovel`, { withCredentials: true })
    );
}

export function useCreateNovel() {
    return useMutation('useCreateNovel', (formData) =>
        axios.post(`/api/novel/create`, formData, { withCredentials: true }), {
        onError: (error) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useEditNovel(novelId) {
    const queryClient = useQueryClient();
    return useMutation('useEditNovel', (formData) =>
        axios.patch(`/api/novel/${novelId}`, formData, { withCredentials: true }), {
        onSuccess: () => queryClient.invalidateQueries('useMyNovels'),
        onError: (error) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useDeleteNovel() {
    const queryClient = useQueryClient();
    return useMutation("useDeleteNovel", (novelId) =>
        axios.delete(`/api/novel/${novelId}`, { withCredentials: true }), {
        onSuccess: () => queryClient.invalidateQueries('useMyNovels')
    }
    );
}

export function useEpisode(novelId, episodeNumber) {
    return useQuery("useEpisode", () =>
        axios.get(`/api/episode/${novelId}/${episodeNumber}`, { withCredentials: true })
    );
}

export function useEpisodes(novelId) {
    return useQuery("useEpisodes", () =>
        axios.get(`/api/episode/${novelId}`, { withCredentials: true })
    );
}

export function useCreateEpisode(novelId) {
    return useMutation('useCreateEpisode', ({ episodeTitle, paragraphs }) =>
        axios.post(`/api/episode/${novelId}`, { episodeTitle, paragraphs }, { withCredentials: true }), {});
}

export function useUpdateEpisode(novelId, episodeNumber) {
    const queryClient = useQueryClient();
    return useMutation('useUpdateEpisode', ({ episodeTitle, paragraphs }) =>
        axios.patch(`/api/episode/${novelId}/${episodeNumber}`, { episodeTitle, paragraphs }, { withCredentials: true }), {
        onSuccess: () => queryClient.invalidateQueries('useEpisodes')
    });
}

export function useDeleteEpisode() {
    const queryClient = useQueryClient();
    return useMutation("useDeleteEpisode", (episodeId) =>
        axios.delete(`/api/episode/${episodeId}`, { withCredentials: true }), {
        onSuccess: () => queryClient.invalidateQueries('useEpisodes')
    }
    );
}

export function useUser() {
    const dispatch = useDispatch();
    return useMutation('useUser', () =>
        axios.get(`/api/user/info`, { withCredentials: true }), {
        onSuccess: ({ data }) => {
            dispatch(setUser(data));
        },
    });
}

export function useLogin() {
    return useMutation('useLogin', ({ email, password }) =>
        axios.post(`/api/user/signin`, { email, password }, { withCredentials: true }), {});
}

export function useRegister() {
    return useMutation('useRegister', (formData) =>
        axios.post(`/api/user/signup`, formData, { withCredentials: true }), {
        onError: (error) => {
            console.log({ message: error.response.data });
        }
    });
}

export function useProfile() {
    return useMutation('useProfile', (formData) =>
        axios.patch(`/api/user/profile`, formData, { withCredentials: true }), {
        onError: (error) => {
            console.log({ message: error.response.data });
        }
    });
}