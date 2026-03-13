#!/bin/bash

# 前端构建脚本
echo "开始构建前端项目..."

# 安装依赖
echo "安装依赖..."
npm install

# 构建项目
echo "构建项目..."
npm run build

echo "前端构建完成！"
