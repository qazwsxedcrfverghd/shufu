// Vercel无服务器函数示例
// 这个文件将作为API端点：/api/latest-resources

// 引入需要的库（如果需要连接数据库）
// const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
  // 设置CORS头，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    // 这里可以连接数据库获取数据
    // 示例：假设从数据库中获取最新资源
    
    // 如果使用MongoDB
    // const client = new MongoClient(process.env.MONGODB_URI);
    // await client.connect();
    // const db = client.db('ml-resources');
    // const latestResources = await db.collection('resources')
    //   .find()
    //   .sort({ createdAt: -1 })
    //   .limit(10)
    //   .toArray();
    // await client.close();
    
    // 模拟获取最新资源的数据
    const latestResources = [
      {
        id: 'resource-1',
        title: 'ChatGPT进阶教程2024',
        description: '最新的ChatGPT使用技巧和提示工程指南',
        link: 'https://example.com/chatgpt-guide',
        category: '自然语言处理',
        type: '教程',
        createdAt: new Date().toISOString()
      },
      {
        id: 'resource-2',
        title: '机器学习系统设计实践',
        description: '从零到一构建生产级机器学习系统',
        link: 'https://example.com/ml-system-design',
        category: '机器学习',
        type: '实践指南',
        createdAt: new Date().toISOString()
      },
      {
        id: 'resource-3',
        title: '计算机视觉最新研究进展',
        description: '2024年计算机视觉领域突破性研究综述',
        link: 'https://example.com/cv-research',
        category: '计算机视觉',
        type: '研究报告',
        createdAt: new Date().toISOString()
      }
    ];

    // 返回JSON响应
    res.status(200).json({ 
      success: true, 
      data: latestResources 
    });
  } catch (error) {
    console.error('API错误:', error);
    
    // 返回错误响应
    res.status(500).json({ 
      success: false, 
      error: '获取最新资源失败', 
      message: error.message 
    });
  }
} 