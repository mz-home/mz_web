@echo off
title Portfolio 预览服务器 (http://localhost:5173)
REM 把 D 盘的 Node 加入 PATH（重启后也生效），确保能找到 node / npm
set PATH=D:\portfolio-react\node20\node-v20.19.0-win-x64;%PATH%
cd /d D:\portfolio-react
echo 正在启动预览服务器...
npm run dev
pause
