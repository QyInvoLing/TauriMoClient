# WebSocket 与 RPC

这个项目需要用 WebSocket 交换的信息无非两种：单向消息和 RPC。单向消息很简单，鉴权消息就属于这一种；RPC 也很简单。

## 消息

在讨论单向消息和 RPC 消息之前，首先要明确什么是消息。本项目规定的消息结构如下：

> name:string 消息名，用于让服务端知道这条消息是来干嘛的，如 chat
>
> data:object 负载，携带任何额外信息

普通消息可以由客户端发给服务端，也可以由服务端发给客户端。

## 客户端 RPC 

与普通消息不同，客户端发送的 RPC 消息应当携带上 id；客户端自行维护 id，确保每次发的 id 不同以区分返回消息。

#### 发送消息格式

>id:number 消息的 id。返回消息的 id 应当与发送消息时的相同，表示二者对应
>
>name:string 普通消息就要有的字段，返回消息的 name 也应当与发送消息时相同
>
>data:object 负载，携带任何额外信息

#### 返回消息格式

> id:number 
>
> name:string 消息名，感觉没啥用，以后说不定会删掉
>
> data:object 负载，携带任何额外信息