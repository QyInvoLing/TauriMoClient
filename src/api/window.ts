import { appWindow, LogicalSize } from '@tauri-apps/api/window'
export const changeWindowSize = async (width: number, height: number) => {
    await appWindow.setSize(new LogicalSize(width, height))
    
}
export const setResizeable =async (swit:boolean)=>{
    await appWindow.setResizable(swit)
}