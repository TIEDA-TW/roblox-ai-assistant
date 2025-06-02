# 快速部署設定指南

## 🚀 您的專案已準備就緒！

### 📋 設定資訊
- **Google Sheets CSV**: `https://docs.google.com/spreadsheets/d/1iLXLskYiOdDmnTC_2jbz8ypK6Sj6qzJOkGGUayQcpZ4/export?format=csv&gid=0`
- **API模型**: `grok-3-latest`
- **安全部署**: 已配置Vercel/Netlify後端保護

### ⚠️ 安全提醒
**您的API Key已在對話中暴露，請立即：**
1. 前往 [X.AI Console](https://console.x.ai)
2. 刪除當前API Key: `xai-0QhgqKwFlBcJpiwboOnpXXPrPEyohCM1C0R44nofqIgccdLUhVWN6L7q3OMVwegOIlICe62QNzyT5KdD`
3. 生成新的API Key
4. 將新Key設定到部署平台的環境變數中

### 🎯 立即部署步驟

#### 方法1：Vercel部署（推薦）
```bash
# 1. 上傳到GitHub
git init
git add .
git commit -m "初始化Roblox AI助教系統"
git remote add origin https://github.com/yourusername/roblox-ai-assistant.git
git push -u origin main

# 2. 部署到Vercel
# - 前往 vercel.com
# - 連結GitHub Repository
# - 設定環境變數 GROK_API_KEY
# - 自動部署完成
```

#### 方法2：一鍵設定
1. **GitHub**: 建立新Repository並上傳所有檔案
2. **Vercel**: 匯入Repository並部署
3. **環境變數**: 設定 `GROK_API_KEY` 為您的新API金鑰
4. **測試**: 開啟網站並測試問答功能

### ✅ 部署完成後
您的AI助教將具備：
- 🤖 智能問答（使用Grok-3-latest）
- 📚 完整課程資料庫（從您的Google Sheets載入）
- 🔒 安全的API Key管理
- 📱 響應式設計
- 🌍 全球CDN加速

### 🎮 測試問題建議
- "如何安裝Roblox Studio？"
- "什麼是Luau程式語言？"
- "如何建立跑酷遊戲？"
- "EventBlocks怎麼使用？"

---
**準備好開始您的Roblox AI助教之旅了嗎？** 🚀