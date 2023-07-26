# 关于 spawn.ini 和 spawnmap.ini
spawn.ini 由 DXMainClient\DXGUI\Multiplayer\GameLobby\GameLobbyBase.cs 下的 WriteSpawnIni 生成，spawnmap.ini 由同文件内的 WriteMap 生成

在 spawn.ini 中，规定了如下重要的**用于通讯**的字段：
> Port，自己使用的端口。在[otherN]中则为对应玩家使用的端口
> 
> GameID，所有人必须一致，但是不知道怎么来的。
>
> [Tunnel]，有 Ip 和 Port 两个字段，代表 tunnel 服务器信息
>
> [otherN]，其他几位玩家的信息，N 为 1 ~ PlayerCount - 1 的正整数

## 内容
多人游戏时，房主 spawn.ini 内容如下：
```ini
[Settings]
Name=Rustup
Scenario=spawnmap.ini
UIGameMode=常规作战
UIMapName=(2) 作用反作用
PlayerCount=2
Side=3
IsSpectator=False
Color=3
CustomLoadScreen=Resources/l600s32.pcx
AIPlayers=0
Seed=734651963
FrameSendRate=7
Protocol=2
GameID=2671318
Host=True
Port=-27671
ShortGame=True
NoGarrisons=False
MCVRedeploy=True
BuildOffAlly=True
Crates=False
NavalCombat=True
AlliesAllowed=True
StolenTech=True
MentalAI=False
LimitedMCV=False
ImmuneDerricks=False
FreeRadar=False
NoSpawnPreviews=False
ConYardStart=False
NerfEights=False
UnitCount=0
GameSpeed=0
Credits=10000
TechLevel=10
FogOfWar=No
MultiEngineer=Yes

[Tunnel]
Ip=119.3.146.165
Port=50000

[Other1]
Name=Kei
Side=1
IsSpectator=False
Color=0
Ip=0.0.0.0
Port=-9671



```
其他玩家的ini如下：
```ini
[Settings]
Name=Kei
Scenario=spawnmap.ini
UIGameMode=常规作战
UIMapName=(2) 作用反作用
PlayerCount=2
Side=1
IsSpectator=False
Color=0
CustomLoadScreen=Resources/l600s11.pcx
AIPlayers=0
Seed=734651963
FrameSendRate=7
Protocol=2
GameID=2671318
Host=False
Port=-9671
ShortGame=True
NoGarrisons=False
MCVRedeploy=True
BuildOffAlly=True
Crates=False
NavalCombat=True
AlliesAllowed=True
StolenTech=True
MentalAI=False
LimitedMCV=False
ImmuneDerricks=False
FreeRadar=False
NoSpawnPreviews=False
ConYardStart=False
NerfEights=False
UnitCount=0
GameSpeed=0
Credits=10000
TechLevel=10
FogOfWar=No
MultiEngineer=Yes

[Tunnel]
Ip=119.3.146.165
Port=50000

[Other1]
Name=Rustup
Side=3
IsSpectator=False
Color=3
Ip=0.0.0.0
Port=-27671



```