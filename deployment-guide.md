# GitHub Pages 部署指南

本指南將引導您將Roblox AI助教系統部署到GitHub Pages。

## 📋 部署前準備

### 1. 必要工具
- GitHub帳號
- Git工具（選用，也可直接使用GitHub網頁介面）
- 網頁瀏覽器

### 2. 必要資料
- ✅ Grok API Key
- ✅ Google Sheets的CSV公開連結
- ✅ 已準備好的網站檔案

## 🚀 步驟一：建立GitHub Repository

### 方法A：使用GitHub網頁介面

1. **登入GitHub**
   - 前往 [GitHub.com](https://github.com)
   - 使用您的帳號登入

2. **建立新Repository**
   - 點擊右上角的「+」按鈕
   - 選擇「New repository」
   - Repository名稱：`roblox-ai-assistant`（或您喜歡的名稱）
   - 勾選「Public」（GitHub Pages免費版需要公開repo）
   - 勾選「Add a README file」
   - 點擊「Create repository」

3. **上傳檔案**
   - 在新建立的repository頁面
   - 點擊「uploading an existing file」
   - 將以下檔案拖拉到上傳區域：
     - `index.html`
     - `styles.css`
     - `script.js`
     - `README.md`
   - 在commit訊息輸入：「初始化Roblox AI助教系統」
   - 點擊「Commit changes」

### 方法B：使用Git指令（進階）

```bash
# 1. 複製Repository
git clone https://github.com/你的用戶名/roblox-ai-assistant.git
cd roblox-ai-assistant

# 2. 複製檔案到資料夾
# 將D:\Roblox AI\中的所有檔案複製到此資料夾

# 3. 提交檔案
git add .
git commit -m "初始化Roblox AI助教系統"
git push origin main
```

## ⚙️ 步驟二：設定GitHub Pages

1. **進入Repository設定**
   - 在您的repository頁面
   - 點擊「Settings」標籤

2. **找到Pages設定**
   - 在左側選單中找到「Pages」
   - 點擊進入Pages設定頁面

3. **設定部署來源**
   - **Source**: 選擇「Deploy from a branch」
   - **Branch**: 選擇「main」
   - **Folder**: 選擇「/ (root)」
   - 點擊「Save」

4. **等待部署完成**
   - GitHub會顯示部署狀態
   - 通常需要5-10分鐘完成
   - 部署完成後會顯示網站連結

## 🔗 步驟三：取得網站連結

部署完成後，您會得到類似以下的連結：
```
https://你的用戶名.github.io/roblox-ai-assistant/
```

## 🛠️ 步驟四：設定API金鑰

### 取得Grok API Key

1. **註冊X.AI帳號**
   - 前往 [X.AI官網](https://x.ai)
   - 註冊新帳號或登入現有帳號

2. **取得API金鑰**
   - 進入API管理頁面
   - 建立新的API金鑰
   - 複製並安全保存API Key

### 設定Google Sheets

1. **建立Google試算表**
   - 開啟Google Sheets
   - 建立新的試算表
   - 命名為「Roblox課程資料庫」

2. **設定資料格式**
   ```
   A欄: 關鍵字（Keyword）
   B欄: 教材摘要說明（Summary）
   C欄: 頁碼（Page）
   D欄: 所屬章節（Chapter）
   ```

3. **輸入課程資料**
   - 參考提供的教材內容
   - 確保資料格式正確
   - 檢查是否有遺漏或錯誤

4. **設定公開分享**
   - 點擊右上角「共用」按鈕
   - 變更為「知道連結的使用者」
   - 權限設定為「檢視者」
   - 複製分享連結

5. **取得CSV連結**
   - 將分享連結中的 `/edit#gid=0` 改為 `/export?format=csv&gid=0`
   - 範例：
     ```
     原始: https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=0
     CSV:  https://docs.google.com/spreadsheets/d/SHEET_ID/export?format=csv&gid=0
     ```

## 🔧 步驟五：初始化AI助教

1. **開啟網站**
   - 使用瀏覽器開啟您的GitHub Pages連結
   - 首次開啟會顯示設定面板

2. **輸入API設定**
   - **Grok API Key**: 貼上您的API金鑰
   - **Google Sheet URL**: 貼上CSV格式的連結
   - 點擊「儲存設定」

3. **測試功能**
   - 嘗試問一個簡單問題，如：「什麼是Roblox Studio？」
   - 確認AI能正常回應
   - 檢查課程資料是否正確載入

## ✅ 步驟六：驗證部署

### 功能檢查清單

- [ ] 網站能正常開啟
- [ ] 設定面板能正常顯示和儲存
- [ ] Google Sheets資料能正確載入
- [ ] AI問答功能正常運作
- [ ] 章節導航功能正常
- [ ] 響應式設計在手機上正常顯示
- [ ] 統計功能正常計算

### 常見問題排查

**1. 網站無法開啟**
```
檢查項目：
- GitHub Pages是否已啟用
- index.html是否在根目錄
- 等待5-10分鐘讓部署完成
```

**2. API連線失敗**
```
檢查項目：
- API Key是否正確輸入
- 是否有餘額或配額限制
- 網路連線是否正常
```

**3. 課程資料載入失敗**
```
檢查項目：
- Google Sheets是否設為公開
- CSV連結格式是否正確
- 資料欄位是否符合格式要求
```

## 🎯 步驟七：自訂設定

### 修改網站標題和描述

編輯 `index.html`：
```html
<title>您的自訂標題</title>
<h1>您的AI助教名稱</h1>
<p>您的自訂描述</p>
```

### 調整主題色彩

編輯 `styles.css` 中的色彩變數：
```css
:root {
    --primary-color: #您的主色調;
    --secondary-color: #您的次要色調;
    /* 其他色彩設定 */
}
```

### 新增課程章節

在側邊欄新增章節，編輯 `index.html`：
```html
<li onclick="filterByChapter('新章節名稱')">
    <i class="fas fa-新圖示"></i>
    新章節顯示名稱
</li>
```

## 📊 步驟八：監控和維護

### 使用統計監控

1. **GitHub Pages流量**
   - 在Repository的Insights中查看流量統計
   - 監控訪問量和來源

2. **API使用量**
   - 定期檢查Grok API的使用量
   - 注意配額限制和費用

3. **用戶反饋**
   - 可在GitHub Repository建立Issues頁面
   - 收集用戶建議和錯誤報告

### 定期更新

1. **課程內容更新**
   - 直接在Google Sheets中更新資料
   - 新資料會自動被系統載入

2. **程式碼更新**
   - 在GitHub中直接編輯檔案
   - 或使用Git推送更新
   - GitHub Pages會自動重新部署

## 🔒 安全最佳實踐

### API金鑰安全

1. **不要公開API Key**
   - 避免在程式碼中硬編碼
   - 使用用戶設定功能
   - 定期更換API金鑰

2. **設定使用限制**
   - 在API提供商設定使用配額
   - 監控異常使用情況
   - 設定警報通知

### 資料隱私

1. **不記錄敏感資料**
   - 避免記錄學員個人資訊
   - 聊天記錄只存在本地
   - 遵守資料保護法規

## 📞 技術支援

### 常用資源

- **GitHub Pages文件**: https://docs.github.com/pages
- **X.AI API文件**: https://docs.x.ai
- **Google Sheets API**: https://developers.google.com/sheets

### 社群支援

- GitHub Issues頁面
- Roblox開發者論壇
- Stack Overflow

## 🎉 完成部署

恭喜！您已成功部署Roblox AI助教系統。

**下一步建議：**
1. 分享網站連結給學員
2. 收集使用反饋
3. 持續優化課程資料
4. 探索更多AI功能整合

**記住要定期：**
- 更新課程內容
- 檢查API使用狀況
- 備份重要資料
- 監控系統運行狀態

---

**如需技術協助，請檢查GitHub Repository的Issues頁面或參考README文件。**