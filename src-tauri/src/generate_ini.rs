/*
 * @Author: QyInvoLing
 * @Date: 2023-07-26 16:06:14
 * @LastEditors: QyInvoLing
 * @LastEditTime: 2023-07-26 16:41:42
 * @FilePath: \tauri-mo-client\src-tauri\src\generate_ini.rs
 * @Description: 
 */
fn generateSpawn() {//接受playerinfo对象数组
    //太长了，两百多行没注释，狗都不看
    /**
     //删掉旧的spawn.ini
 
    // 如果是coop，就把所有玩家和ai用户的TeamId都设置为1
    //总感觉ai应该是2，不明白

var teamStartMappings = new List<TeamStartMapping>(0); ...
这里创建了一个 TeamStartMapping 类型的空列表 teamStartMappings。之后，如果 PlayerExtraOptionsPanel 不为 null，它会从 PlayerExtraOptionsPanel 中获取团队起始点映射。

PlayerHouseInfo[] houseInfos = Randomize(teamStartMappings);
这一行调用一个未给出代码的 Randomize 方法，并传递了 teamStartMappings 列表作为参数。该方法返回一个 PlayerHouseInfo 类型的数组 houseInfos，用于存储随机化后的玩家信息。

IniFile spawnIni = new IniFile(spawnerSettingsFile.FullName);
这一行创建了一个 IniFile 对象 spawnIni，用于处理 "spawn.ini" 文件。

IniSection settings = new IniSection("Settings");
这一行创建了一个名为 "Settings" 的 IniSection 对象 settings。

settings.SetStringValue("Name", ProgramConstants.PLAYERNAME); ...
这一系列代码在 "Settings" 节下设置了各种键值对，用于配置初始游戏状态，如玩家名称、地图名称、游戏模式等。

    //if (Map.Official) settings.SetStringValue("MapID", Map.BaseFilePath);
    //如果地图是官方地图，就在 "Settings" 节下设置一个名为 "MapID" 的键，值为地图的 BaseFilePath。

spawnIni.AddSection(settings);
将 "Settings" 节添加到 "spawn.ini" 文件中。

    //WriteSpawnIniAdditions(spawnIni);
    //调用一个未给出代码的方法 WriteSpawnIniAdditions，可能是用来添加其他额外的设置到 "spawn.ini" 文件中。
    //这个函数什么也不做，他妈的，弱智


    //把房间设置写进去

List<string> forcedKeys = GameOptionsIni.GetSectionKeys("ForcedSpawnIniOptions"); ...
从 "GameOptions.ini" 文件中获取名为 "ForcedSpawnIniOptions" 的节的键列表，并将它们添加到 "spawn.ini" 文件中的 "Settings" 节。

GameMode.ApplySpawnIniCode(spawnIni);
调用 GameMode 对象的 ApplySpawnIniCode 方法，将强制选项（Forced Options）从游戏模式应用到 "spawn.ini" 文件。

Map.ApplySpawnIniCode(spawnIni, Players.Count + AIPlayers.Count, AIPlayers.Count, GameMode.CoopDifficultyLevel);
调用 Map 对象的 ApplySpawnIniCode 方法，将强制选项从地图应用到 "spawn.ini" 文件。

然后，代码继续处理玩家选项，并将它们添加到 "spawn.ini" 文件中。

最后，使用各种方式将玩家的起始位置、联盟信息、AI玩家信息等添加到 "spawn.ini" 文件中，并最终写入文件。

整个过程涉及地图和玩家的各种设置和选项，用于配置初始游戏状态和参数。
     */
}
fn generateSpawnMap() {
    //删除旧的

    //从Map.CompleteFilePath获取这个地图的mapini

    //从ProgramConstants.GamePath/INI/Map Code/GlobalCode.ini获取globalcode.ini

    //将对应模式的GameMode.GetMapRulesIniFile()应用到mapini

    //将globalcode.ini应用到mapini

    //如果是多人游戏，就将ProgramConstants.GamePath/INI/Map Code/MultiplayerGlobalCode.ini应用到mapini

    //将房间里的选项写进去

    //把MultiplayerDialogSettings这个段落移动到文件开始

    //把SupplementalMapfiles复制过来？看签名看不出来

    //最后写入到文件
}
