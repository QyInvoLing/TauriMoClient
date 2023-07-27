/*
 * @Author: QyInvoLing
 * @Date: 2023-07-24 14:55:44
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-24 14:55:50
 * @FilePath: \EduMP\test.js
 * @Description: 
 */

import { server } from "./server.ts"
import { fetch, Body, ResponseType } from '@tauri-apps/api/http'
export const post = async (url: string, data: any, headers = {}) => {
    try {
        const response = await fetch<ResponseType.JSON>(`${server}${url}`, {
            method: "POST",
            headers: Object.assign({
                "Content-Type": "application/json",
            }, headers),
            body: Body.json(data),
        });

        console.log("POST:", response);
        return response
    } catch (error) {
        console.error("Error:", error);
    }
}
export const postForm = async (url: string, data: any, headers = {}) => {
    try {
        const response = await fetch<ResponseType.JSON>(`${server}${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                ...headers,
            },
            body: Body.form(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }


        return response;
    } catch (error) {
        console.error('Error sending POST request:', error);
        throw error;
    }
}

export const get = async (url: string, headers = {}) => {
    try {
        const response = await fetch<ResponseType.JSON>(`${server}${url}`, {
            method: "GET",
            headers: Object.assign({
                "Content-Type": "application/json",
            }, headers),
        });
        return response
    } catch (error) {
        console.error("Error:", error);
    }
}
