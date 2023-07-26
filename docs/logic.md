## 启动流程

启动MO的实质是：和对应的 tunnel 服务器（在 cnc 开房间时选的）通讯获取端口列表，生成对应的 spawn.ini 和 spawnmap.ini，最后传入固定的参数给 syringe.exe

```bash
.\Syringe.exe "gamemd.exe" -SPAWN -CD -SPEEDCONTROL -LOG -AFFINITY:65535
```

然后，被启动的 gamemd 会读取同级目录下的 spawn.ini 中的相关参数，初始化游戏。

## 获取 Tunnel 列表

```
GET http://cncnet.org/master-list
```

## 从 Tunnel 获取端口

```
GET http://[ip]:[port]/request?clients=[端口号数量]
```

