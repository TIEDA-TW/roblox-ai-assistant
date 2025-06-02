// Netlify Functions版本
exports.handler = async (event, context) => {
    // 設定CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Content-Type': 'application/json'
    };
    
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }
    
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }
    
    try {
        const { question, relevantContent } = JSON.parse(event.body);
        
        if (!question || !question.trim()) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: '問題不能為空' })
            };
        }
        
        // API Key從環境變數取得
        const API_KEY = process.env.GROK_API_KEY;
        
        if (!API_KEY) {
            return {
                statusCode: 500,
                headers,
                body: JSON.stringify({ error: 'API配置錯誤' })
            };
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

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Grok API Error:', response.status, errorText);
            return {
                statusCode: response.status,
                headers,
                body: JSON.stringify({ error: `API請求失敗: ${response.status}` })
            };
        }

        const data = await response.json();
        
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                response: data.choices[0].message.content,
                usage: data.usage
            })
        };
        
    } catch (error) {
        console.error('Chat API Error:', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: '服務暫時無法使用，請稍後再試' })
        };
    }
};