// Roblox Studio AI Assistant - Main JavaScript
class RobloxAIAssistant {
    constructor() {
        this.courseData = [];
        this.chatHistory = [];
        this.settings = {
            googleSheetUrl: 'https://docs.google.com/spreadsheets/d/1iLXLskYiOdDmnTC_2jbz8ypK6Sj6qzJOkGGUayQcpZ4/export?format=csv&gid=0',
            apiEndpoint: '/api/chat' // 使用後端API端點
        };
        
        this.init();
    }

    async init() {
        this.loadSettings();
        this.setupEventListeners();
        this.updateStats();
        await this.loadCourseData();
        
        // 不再自動打開設定面板，因為已經內建連結
    }

    setupEventListeners() {
        // 發送按鈕事件
        document.getElementById('sendButton').addEventListener('click', () => this.sendQuestion());
        
        // 輸入框事件
        const input = document.getElementById('questionInput');
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendQuestion();
            }
        });

        // 設定相關事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeSettings();
            }
        });
    }

    loadSettings() {
        const saved = localStorage.getItem('robloxAI_settings');
        if (saved) {
            const savedSettings = JSON.parse(saved);
            // 保持預設的Google Sheets URL，但允許覆蓋其他設定
            this.settings = { ...this.settings, ...savedSettings };
        }
    }

    saveSettings() {
        const googleSheetUrl = document.getElementById('googleSheetUrl').value.trim();
        const apiEndpoint = document.getElementById('apiEndpoint').value.trim() || '/api/chat';
        
        if (!googleSheetUrl) {
            alert('請輸入Google Sheet URL');
            return;
        }

        this.settings.googleSheetUrl = googleSheetUrl;
        this.settings.apiEndpoint = apiEndpoint;
        
        localStorage.setItem('robloxAI_settings', JSON.stringify(this.settings));
        this.closeSettings();
        this.loadCourseData();
        
        this.showNotification('設定已儲存', 'success');
    }

    openSettings() {
        document.getElementById('settingsPanel').style.display = 'flex';
        document.getElementById('googleSheetUrl').value = this.settings.googleSheetUrl;
        document.getElementById('apiEndpoint').value = this.settings.apiEndpoint || '/api/chat';
    }

    closeSettings() {
        document.getElementById('settingsPanel').style.display = 'none';
    }

    async loadCourseData() {
        // 即使沒有設定，也會使用預設的Google Sheets URL
        if (!this.settings.googleSheetUrl) {
            console.warn('Google Sheet URL not configured');
            this.courseData = this.getDefaultCourseData();
            return;
        }

        try {
            this.showLoading(true);
            
            // 嘗試從Google Sheets載入資料
            const response = await fetch(this.settings.googleSheetUrl);
            if (!response.ok) {
                throw new Error('無法載入課程資料');
            }
            
            const csvData = await response.text();
            this.courseData = this.parseCSV(csvData);
            
            console.log(`已載入 ${this.courseData.length} 筆課程資料`);
            this.showNotification(`已載入 ${this.courseData.length} 筆課程資料`, 'success');
            
        } catch (error) {
            console.error('載入課程資料失敗:', error);
            
            // 如果無法從Google Sheets載入，使用預設資料
            this.courseData = this.getDefaultCourseData();
            this.showNotification('使用預設課程資料', 'warning');
        } finally {
            this.showLoading(false);
        }
    }

    parseCSV(csvText) {
        const lines = csvText.split('\n');
        const headers = lines[0].split('\t'); // 假設使用Tab分隔
        
        const data = [];
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split('\t');
                const item = {};
                headers.forEach((header, index) => {
                    item[header.trim()] = values[index] ? values[index].trim() : '';
                });
                data.push(item);
            }
        }
        return data;
    }

    getDefaultCourseData() {
        // 基於提供的教材資料創建預設資料
        return [
            {
                keyword: "Roblox Studio",
                summary: "Roblox的免費3D遊戲開發工具，支援Windows和Mac，提供完整的IDE環境讓創作者建造夢想中的遊戲世界",
                page: "P.02-03",
                chapter: "Roblox Studio安裝與操作"
            },
            {
                keyword: "Luau",
                summary: "Roblox使用的程式語言，衍生自Lua 5.1，具有漸進式型別系統和效能優化",
                page: "P.34-35",
                chapter: "Roblox遊戲設計程式語言"
            },
            {
                keyword: "工具箱",
                summary: "Roblox內建模型庫，包含數千種預製物件、材質和音效",
                page: "P.28",
                chapter: "Roblox工具箱"
            },
            {
                keyword: "Baseplate",
                summary: "底板範本地圖，作為遊戲世界的基礎平台，所有物件的起始建構基礎",
                page: "P.04-05",
                chapter: "Roblox Studio安裝與操作"
            },
            {
                keyword: "Script",
                summary: "伺服器端程式腳本，處理遊戲邏輯，在ServerScriptService中執行",
                page: "P.34-35",
                chapter: "Roblox遊戲設計程式語言"
            },
            {
                keyword: "LocalScript",
                summary: "客戶端程式腳本，處理玩家個人互動，在StarterPlayerScripts中執行",
                page: "P.36-37",
                chapter: "Roblox遊戲設計程式語言"
            },
            {
                keyword: "Block",
                summary: "基礎方塊，用於建構遊戲場景的基本幾何圖形，最常用的建築元素",
                page: "P.10-11",
                chapter: "Roblox Studio 3D建模與屬性"
            },
            {
                keyword: "Obby",
                summary: "Roblox中最流行的障礙跑酷遊戲類型，包含Classic、Story-based、Tower等子類型",
                page: "P.34",
                chapter: "基礎操作體驗"
            },
            {
                keyword: "EventBlocks",
                summary: "官方認證的圖形化程式編輯器，類似Scratch，提供積木式程式設計",
                page: "P.20-21",
                chapter: "Scratch程式編輯器"
            },
            {
                keyword: "Code Assistant",
                summary: "Roblox官方AI程式助理，提供自動程式碼生成、即時調試和語法建議",
                page: "P.42-43",
                chapter: "Roblox遊戲設計AI應用"
            }
        ];
    }

    async sendQuestion() {
        const input = document.getElementById('questionInput');
        const question = input.value.trim();
        
        if (!question) return;
        
        // 檢查API端點是否可用
        if (!this.settings.apiEndpoint) {
            this.showNotification('請先設定API端點', 'error');
            this.openSettings();
            return;
        }

        // 清空輸入框並禁用按鈕
        input.value = '';
        this.setInputEnabled(false);
        
        // 顯示用戶訊息
        this.addMessage(question, 'user');
        
        // 顯示載入狀態
        this.showLoading(true);
        
        try {
            // 搜尋相關課程內容
            const relevantContent = this.searchRelevantContent(question);
            
            // 呼叫Grok API
            const response = await this.callGrokAPI(question, relevantContent);
            
            // 顯示AI回應
            this.addMessage(response, 'bot');
            
            // 更新統計
            this.updateStats();
            
        } catch (error) {
            console.error('AI回應錯誤:', error);
            this.addMessage('抱歉，我現在無法回答您的問題。請稍後再試。', 'bot');
        } finally {
            this.showLoading(false);
            this.setInputEnabled(true);
            input.focus();
        }
    }

    searchRelevantContent(question) {
        const keywords = question.toLowerCase().split(/\s+/);
        const relevantItems = [];
        
        for (const item of this.courseData) {
            let score = 0;
            const itemText = `${item.keyword} ${item.summary}`.toLowerCase();
            
            // 計算關鍵字匹配分數
            for (const keyword of keywords) {
                if (itemText.includes(keyword)) {
                    score += keyword.length;
                }
            }
            
            if (score > 0) {
                relevantItems.push({ ...item, score });
            }
        }
        
        // 按分數排序並取前5名
        return relevantItems
            .sort((a, b) => b.score - a.score)
            .slice(0, 5);
    }

    async callGrokAPI(question, relevantContent) {
        // 使用安全的後端API端點
        const response = await fetch(this.settings.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                question: question,
                relevantContent: relevantContent
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ error: '未知錯誤' }));
            throw new Error(errorData.error || `API請求失敗: ${response.status}`);
        }

        const data = await response.json();
        return data.response;
    }

    addMessage(content, type) {
        const messagesContainer = document.getElementById('chatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${type}-message`;
        
        const avatar = type === 'user' ? 
            '<i class="fas fa-user"></i>' : 
            '<i class="fas fa-robot"></i>';
            
        messageDiv.innerHTML = `
            <div class="message-content">
                <div class="avatar ${type}-avatar">
                    ${avatar}
                </div>
                <div class="text">
                    ${this.formatMessage(content)}
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        // 添加到聊天歷史
        this.chatHistory.push({ type, content, timestamp: new Date() });
    }

    formatMessage(content) {
        // 簡單的Markdown格式化
        return content
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>')
            .replace(/`(.*?)`/g, '<code>$1</code>')
            .replace(/\n/g, '<br>');
    }

    setInputEnabled(enabled) {
        const input = document.getElementById('questionInput');
        const button = document.getElementById('sendButton');
        
        input.disabled = !enabled;
        button.disabled = !enabled;
    }

    showLoading(show) {
        const overlay = document.getElementById('loadingOverlay');
        overlay.style.display = show ? 'flex' : 'none';
    }

    showNotification(message, type = 'info') {
        // 創建通知元素
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--surface-color);
            border: 1px solid var(--border-color);
            border-radius: 10px;
            padding: 15px 20px;
            color: var(--text-primary);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            animation: slideInRight 0.3s ease-out;
            max-width: 300px;
        `;
        
        if (type === 'success') {
            notification.style.borderColor = 'var(--success-color)';
        } else if (type === 'error') {
            notification.style.borderColor = 'var(--error-color)';
        } else if (type === 'warning') {
            notification.style.borderColor = 'var(--warning-color)';
        }
        
        notification.textContent = message;
        document.body.appendChild(notification);
        
        // 3秒後自動移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOutRight 0.3s ease-in';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 3000);
    }

    updateStats() {
        const today = new Date().toDateString();
        const todayMessages = this.chatHistory.filter(msg => 
            msg.type === 'user' && msg.timestamp.toDateString() === today
        ).length;
        
        const totalMessages = this.chatHistory.filter(msg => msg.type === 'user').length;
        
        document.getElementById('todayCount').textContent = todayMessages;
        document.getElementById('totalCount').textContent = totalMessages;
    }

    filterByChapter(chapter) {
        const question = `請介紹${chapter}的相關內容`;
        document.getElementById('questionInput').value = question;
        this.sendQuestion();
    }
}

// 全域函數
function askQuestion(question) {
    document.getElementById('questionInput').value = question;
    window.aiAssistant.sendQuestion();
}

function filterByChapter(chapter) {
    window.aiAssistant.filterByChapter(chapter);
}

function openSettings() {
    window.aiAssistant.openSettings();
}

function closeSettings() {
    window.aiAssistant.closeSettings();
}

function saveSettings() {
    window.aiAssistant.saveSettings();
}

// 添加CSS動畫
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification {
        font-size: 0.9rem;
        font-weight: 500;
    }
`;
document.head.appendChild(style);

// 初始化應用
document.addEventListener('DOMContentLoaded', () => {
    window.aiAssistant = new RobloxAIAssistant();
});
