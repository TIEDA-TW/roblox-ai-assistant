# 🔒 安全部署指南 - 保護API Key

**⚠️ 重要提醒：您提供的API Key已經在此對話中暴露，建議完成部署後立即到X.AI控制台重新生成新的API Key以確保安全性。**

## 📋 您的設定資訊

### Google Sheets CSV連結
```
https://docs.google.com/spreadsheets/d/1iLXLskYiOdDmnTC_2jbz8ypK6Sj6qzJOkGGUayQcpZ4/export?format=csv&gid=0
```

### API模型更新
根據您提供的資訊，已更新為使用 `grok-3-latest` 模型（較新版本）。

本指南解決GitHub Pages部署時API Key暴露的安全問題，提供三種安全的部署方案。

## ⚠️ 安全問題說明

直接在前端程式碼中使用API Key會有以下風險：
- **API Key暴露**：任何人都能在瀏覽器中查看原始碼取得API Key
- **濫用風險**：惡意用戶可能盜用您的API配額
- **費用問題**：可能產生意外的API使用費用

## 🛡️ 解決方案

### 方案1：Vercel部署（推薦）

Vercel提供免費的Serverless Functions，完美解決API Key安全問題。

#### 步驟1：準備Vercel帳號
1. 前往 [Vercel.com](https://vercel.com)
2. 使用GitHub帳號註冊/登入
3. 連結您的GitHub Repository

#### 步驟2：設定環境變數
1. 在Vercel專案控制台
2. 前往 Settings → Environment Variables
3. 新增環境變數：
   ```
   名稱: GROK_API_KEY
   值: 您的新Grok API金鑰（請重新生成）
   ```

#### 步驟3：部署
1. 將所有檔案推送到GitHub
2. 在Vercel中匯入Repository
3. 自動部署完成

**優點**：
- ✅ 完全免費
- ✅ 自動HTTPS
- ✅ 全球CDN加速
- ✅ 自動部署
- ✅ 環境變數安全管理

### 方案2：Netlify部署

#### 步驟1：準備Netlify帳號
1. 前往 [Netlify.com](https://netlify.com)
2. 使用GitHub帳號註冊/登入

#### 步驟2：設定環境變數
1. 在Netlify專案控制台
2. 前往 Site settings → Environment variables
3. 新增環境變數：
   ```
   名稱: GROK_API_KEY
   值: 您的新Grok API金鑰（請重新生成）
   ```

#### 步驟3：部署
1. 將所有檔案推送到GitHub
2. 在Netlify中連結Repository
3. 自動部署完成

## 🚀 快速部署流程（針對您的專案）

### 1. 立即安全措施
1. **前往 [X.AI Console](https://console.x.ai)**
2. **刪除當前API Key**
3. **生成新的API Key**
4. **妥善保存新Key（不要再分享）**

### 2. 使用您的Google Sheets
您的試算表已經準備就緒，CSV連結為：
```
https://docs.google.com/spreadsheets/d/1iLXLskYiOdDmnTC_2jbz8ypK6Sj6qzJOkGGUayQcpZ4/export?format=csv&gid=0
```

### 3. 部署到Vercel（推薦）

**步驟1：建立GitHub Repository**
```bash
# 在GitHub建立新的Repository，命名為 roblox-ai-assistant
# 將D:\Roblox AI\資料夾中的所有檔案上傳
```

**步驟2：連結Vercel**
1. 登入 [Vercel.com](https://vercel.com)
2. 點擊「New Project」
3. 選擇您的 `roblox-ai-assistant` Repository
4. 點擊「Deploy」

**步驟3：設定環境變數**
1. 部署完成後，前往專案設定
2. Settings → Environment Variables
3. 新增：
   ```
   Name: GROK_API_KEY
   Value: [您的新API金鑰]
   ```
4. 點擊「Save」

**步驟4：重新部署**
- 前往 Deployments → Redeploy

### 4. 測試您的AI助教

部署完成後：
1. 開啟Vercel提供的網址
2. 在設定中輸入您的Google Sheets CSV連結：
   ```
   https://docs.google.com/spreadsheets/d/1iLXLskYiOdDmnTC_2jbz8ypK6Sj6qzJOkGGUayQcpZ4/export?format=csv&gid=0
   ```
3. 測試問答功能

## ✅ 預期效果

您的AI助教將能夠：
- 📚 從您的Google Sheets載入完整的Roblox課程資料
- 🤖 使用Grok-3-latest模型提供智能回答
- 🔒 安全地保護API金鑰
- 🌐 在全球CDN上快速運行
- 📱 支援所有裝置的響應式設計

## 🎯 完成後的系統功能

### 智能問答示例
學員可以問：
- "如何建立Script腳本？"
- "什麼是Luau程式語言？"
- "Roblox Studio有哪些基本幾何圖形？"
- "如何使用EventBlocks？"

### 課程章節導航
- Roblox Studio安裝與操作
- 3D建模與屬性
- Scratch程式編輯器
- 程式語言設計
- 工具箱應用
- AI應用設計
- CodeCombat學習

## 🔐 安全檢查清單

部署完成後，請確認：
- [ ] 舊的API Key已刪除
- [ ] 新的API Key只存在於Vercel環境變數中
- [ ] 前端程式碼中沒有任何API金鑰
- [ ] Google Sheets資料正確載入
- [ ] AI問答功能正常運作
- [ ] 所有裝置上顯示正常

## 📞 如需協助

如果您在部署過程中遇到問題：
1. 檢查Vercel控制台的部署日誌
2. 確認環境變數設定正確
3. 測試Google Sheets連結是否可正常訪問
4. 檢查新的API Key是否有效

---

**記住：完成部署後，立即更換您的API Key以確保安全！**