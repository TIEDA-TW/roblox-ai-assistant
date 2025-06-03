// Vercel/Netlify Functions - 保護API Key的後端函數
export default async function handler(req, res) {
    // 設定CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }
    
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }
    
    try {
        const { question, relevantContent } = req.body;
        
        if (!question || !question.trim()) {
            return res.status(400).json({ error: '問題不能為空' });
        }
        
        // API Key從環境變數取得（不會暴露在前端）
        const API_KEY = process.env.GROK_API_KEY;
        
        // 增加詳細的診斷資訊
        console.log('Environment check:', {
            hasApiKey: !!API_KEY,
            apiKeyLength: API_KEY ? API_KEY.length : 0,
            apiKeyPrefix: API_KEY ? API_KEY.substring(0, 10) + '...' : 'undefined'
        });
        
        if (!API_KEY) {
            console.error('GROK_API_KEY environment variable not found');
            return res.status(500).json({ 
                error: 'API配置錯誤：環境變數未設定',
                debug: 'GROK_API_KEY not found'
            });
        }
        
        const systemPrompt = `你是一個專業的Roblox Studio AI助教，專門回答關於Roblox遊戲開發的問題。

你的職責：
1. 基於提供的課程資料回答學員問題
2. 提供詳細、實用的解答
3. 使用繁體中文回答
4. 如果可能，提供步驟式的指導
5. 鼓勵學員繼續學習和實作

課程資料：
${relevantContent ? relevantContent.map(item => 
    `關鍵字：${item.keyword}\n說明：${item.summary}\n頁碼：${item.page}\n章節：${item.chapter}\n`
).join('\n') : ''}

請基於以上資料回答學員的問題，如果資料不足，請基於你對Roblox的知識補充說明。`;

        console.log('Making request to Grok API...');
        
        const response = await fetch('https://api.x.ai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: question }
                ],
                model: "grok-3-latest",
                stream: false,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        console.log('Grok API response status:', response.status);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Grok API Error:', {
                status: response.status,
                statusText: response.statusText,
                errorText: errorText
            });
            
            return res.status(response.status).json({ 
                error: `API請求失敗: ${response.status} ${response.statusText}`,
                details: errorText
            });
        }

        const data = await response.json();
        console.log('Grok API success, response length:', data.choices[0].message.content.length);
        
        return res.status(200).json({
            response: data.choices[0].message.content,
            usage: data.usage
        });
        
    } catch (error) {
        console.error('Chat API Error:', error);
        return res.status(500).json({ 
            error: '服務暫時無法使用，請稍後再試',
            details: error.message
        });
    }
}
