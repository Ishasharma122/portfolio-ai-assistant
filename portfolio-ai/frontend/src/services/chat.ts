import axios, { AxiosError } from 'axios';

const API_BASE_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '');

export interface ChatResponse {
    response: string;
}

export const chatService = {
    async sendMessage(message: string): Promise<string> {
        try {
            const response = await axios.post<ChatResponse>(`${API_BASE_URL}/chat`, { message });
            return response.data.response;
        } catch (error) {
            const axiosError = error as AxiosError<{ detail?: string }>;
            const apiMessage = axiosError.response?.data?.detail;
            throw new Error(apiMessage || 'Failed to get response from AI.');
        }
    }
};
