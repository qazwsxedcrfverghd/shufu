// Vercel无服务器函数示例
// 这个文件将作为API端点：/api/save-favorite

// 引入需要的库（如果需要连接数据库）
// const { MongoClient } = require('mongodb');

export default async function handler(req, res) {
  // 设置CORS头，允许跨域请求
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  // 处理OPTIONS请求（预检请求）
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 只接受POST和DELETE请求
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    return res.status(405).json({ message: '方法不允许' });
  }

  try {
    // 从请求中获取数据
    const { userId, resourceId } = req.body;

    // 验证必要的数据
    if (!userId || !resourceId) {
      return res.status(400).json({ 
        success: false, 
        message: '用户ID和资源ID是必需的' 
      });
    }

    // 这里可以连接数据库保存数据
    // 示例：假设将收藏信息保存到数据库

    // 如果使用MongoDB
    // const client = new MongoClient(process.env.MONGODB_URI);
    // await client.connect();
    // const db = client.db('ml-resources');
    // const favoritesCollection = db.collection('favorites');
    
    // if (req.method === 'POST') {
    //   // 添加收藏
    //   await favoritesCollection.updateOne(
    //     { userId },
    //     { $addToSet: { resources: resourceId } },
    //     { upsert: true }
    //   );
    // } else if (req.method === 'DELETE') {
    //   // 取消收藏
    //   await favoritesCollection.updateOne(
    //     { userId },
    //     { $pull: { resources: resourceId } }
    //   );
    // }
    
    // await client.close();

    // 模拟数据库操作
    console.log(`用户 ${userId} ${req.method === 'POST' ? '添加' : '删除'}收藏资源: ${resourceId}`);

    // 返回成功响应
    res.status(200).json({ 
      success: true, 
      message: req.method === 'POST' ? '成功添加到收藏' : '成功从收藏中删除',
      data: {
        userId,
        resourceId,
        action: req.method === 'POST' ? 'add' : 'remove',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('API错误:', error);
    
    // 返回错误响应
    res.status(500).json({ 
      success: false, 
      error: '处理收藏操作失败', 
      message: error.message 
    });
  }
} 