import { appWindow, PhysicalSize,LogicalSize } from '@tauri-apps/api/window'
/**更改窗口大小
 * 
 * 传入参数不合法时，自动设置为800x600
 * @param width 
 * @param height 
 */
export const changeWindowSize = async (width: number | string | null, height: number | string | null,isPhysical:boolean=true) => {
    let checkedWidth = width == null ? 800 : parseInt("" + width)
    let checkedHeight = width == null ? 700 : parseInt("" + height)
    if(isPhysical){
        await appWindow.setSize(new PhysicalSize(checkedWidth, checkedHeight))
    }else{
        await appWindow.setSize(new LogicalSize(checkedWidth, checkedHeight))
    }
    
}
export const setResizeable = async (swit: boolean) => {
    await appWindow.setResizable(swit)
}