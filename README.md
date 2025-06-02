# Roblox Studio AI助教系統

這是一個專為Roblox Studio課程設計的AI助教系統，能夠回答學員關於Roblox遊戲開發的各種問題。

## 🚀 功能特色

- **智能問答**：基於課程教材提供精準的技術解答
- **中文支援**：完整繁體中文介面和回答
- **章節導航**：快速瀏覽不同課程章節內容
- **即時統計**：追蹤學習進度和問答次數
- **響應式設計**：支援電腦、平板、手機等各種裝置
- **AI技術整合**：使用Grok API提供高品質回答

## 📁 檔案結構

```
Roblox AI/
├── index.html          # 主要HTML頁面
├── styles.css          # CSS樣式檔案
├── script.js           # JavaScript主程式
├── README.md           # 說明文件
└── deployment-guide.md # 部署指南
```

## 🛠️ 技術架構

- **前端**：HTML5 + CSS3 + Vanilla JavaScript
- **AI服務**：Grok API (X.AI)
- **資料來源**：Google Sheets
- **部署平台**：GitHub Pages
- **設計風格**：現代化深色主題，Roblox品牌色彩

## 📊 支援的課程章節

1. **Roblox Studio安裝與操作**
   - 系統需求與安裝步驟
   - 介面操作與快捷鍵
   - 專案建立與發佈

2. **3D建模與屬性**
   - 基本幾何圖形
   - 物件屬性設定
   - 材質與色彩管理

3. **Scratch程式編輯器**
   - EventBlocks積木程式
   - 事件驅動編程
   - 視覺化程式設計

4. **程式語言設計**
   - Luau語言基礎
   - Script與LocalScript
   - 變數與函數應用

5. **工具箱應用**
   - 內建模型庫使用
   - 載具與建築系統
   - 特效與互動元素

6. **AI應用設計**
   - Code Assistant使用
   - 生成式AI工具
   - 圖片與3D模型生成

7. **CodeCombat學習**
   - 遊戲化程式教學
   - Lua語言實戰
   - 專案實作練習

## ⚙️ 設定需求

### 1. Grok API Key
- 註冊 [X.AI](https://x.ai) 帳號
- 取得API金鑰
- 在系統設定中輸入API Key

### 2. Google Sheets設定
- 建立Google試算表
- 設定課程資料（關鍵字、摘要、頁碼、章節）
- 取得CSV公開連結
- 在系統設定中輸入連結

### 課程資料格式
Google Sheets應包含以下欄位：
- `關鍵字（Keyword）`：技術術語或概念名稱
- `教材摘要說明（Summary）`：詳細說明內容
- `頁碼（Page）`：參考頁碼
- `所屬章節（Chapter）`：課程章節分類

## 🚀 部署到GitHub Pages

### 步驟1：建立GitHub Repository
```bash
# 1. 在GitHub建立新的Repository
# 2. 將檔案上傳到Repository
# 3. 確保index.html在根目錄
```

### 步驟2：啟用GitHub Pages
1. 進入Repository的Settings
2. 找到Pages設定項目
3. 選擇Source為"Deploy from a branch"
4. 選擇Branch為"main"
5. 選擇資料夾為"/ (root)"
6. 點擊Save

### 步驟3：取得網站連結
- GitHub Pages會提供類似：`https://yourusername.github.io/repository-name`
- 等待幾分鐘讓部署完成

## 💡 使用方式

### 基本操作
1. **開啟網站**：訪問GitHub Pages提供的網址
2. **設定API**：首次使用需要設定Grok API Key和Google Sheets連結
3. **開始問答**：在輸入框輸入問題，AI會基於課程內容回答
4. **瀏覽章節**：點擊側邊欄的章節快速獲取相關資訊

### 問答技巧
- **具體問題**：問"如何建立Script腳本？"比問"程式設計"更容易得到精確答案
- **關鍵字使用**：使用課程中的專業術語，如"Luau"、"LocalScript"、"工具箱"等
- **分步驟詢問**：複雜問題可以拆分成多個小問題

### 常見問題類型
- 技術操作：「如何在Roblox Studio中建立新專案？」
- 概念解釋：「什麼是Anchored屬性？」
- 實作指導：「如何製作跑酷遊戲的移動平台？」
- 工具使用：「EventBlocks如何建立碰撞檢測？」

## 🔧 自訂修改

### 修改主題色彩
在`styles.css`中的`:root`區塊修改CSS變數：
```css
:root {
    --primary-color: #00A2FF;    /* 主要色彩 */
    --secondary-color: #FF6B35;  /* 次要色彩 */
    --accent-color: #4ECDC4;     /* 強調色彩 */
}
```

### 添加新的課程章節
在`script.js`的`getDefaultCourseData()`函數中添加新資料：
```javascript
{
    keyword: "新關鍵字",
    summary: "詳細說明",
    page: "頁碼",
    chapter: "章節名稱"
}
```

### 修改AI回答風格
在`script.js`的`callGrokAPI()`函數中修改系統提示詞(`systemPrompt`)。

## 📈 效能優化

### 載入速度優化
- 使用CDN載入外部資源
- 壓縮CSS和JavaScript檔案
- 優化圖片和字體載入

### API使用優化
- 實作請求緩存機制
- 設定適當的請求間隔
- 處理API配額限制

## 🛡️ 安全考量

### API Key保護
- 不要在前端程式碼中硬編碼API Key
- 使用環境變數或設定檔案
- 定期更換API金鑰

### 資料隱私
- 不記錄敏感的學員資訊
- 遵守相關資料保護法規
- 提供清除聊天記錄功能

## 🐛 常見問題解決

### API連線失敗
1. 檢查API Key是否正確
2. 確認網路連線正常
3. 查看瀏覽器控制台錯誤訊息

### Google Sheets載入失敗
1. 確認試算表為公開狀態
2. 檢查CSV連結格式
3. 驗證資料格式是否正確

### 頁面顯示異常
1. 清除瀏覽器快取
2. 檢查檔案是否正確上傳
3. 確認GitHub Pages部署狀態

## 📞 技術支援

如果您在使用過程中遇到問題，請：

1. 查看瀏覽器開發者工具的錯誤訊息
2. 檢查GitHub Pages的部署狀態
3. 確認API設定是否正確
4. 參考本文件的常見問題解決方案

## 📄 授權條款

本專案採用MIT授權條款，允許自由使用、修改和分發。

## 🔄 版本更新

### v1.0.0
- 基本問答功能
- 課程章節導航
- Grok API整合
- GitHub Pages部署支援

---

**建議使用最新版本的Chrome、Firefox或Safari瀏覽器以獲得最佳體驗**