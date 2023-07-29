import { postForm } from '@/api/request'
export const register = async(username: string, password: string) => {
    const result = await postForm("/register",{username,password})
    console.log("[INFO]注册结果：",result.data)
    return result
}