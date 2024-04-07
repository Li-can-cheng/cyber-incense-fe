const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const cors = require('cors');
app.use(cors());

// 解析JSON格式的请求体
app.use(bodyParser.json());

// 处理POST请求
app.post('/api/login', (req, res) => {
    // 从请求体中获取数据
    const { email, password } = req.body;

    // 这里可以添加你的登录逻辑
    console.log(`Email: ${email}, Password: ${password}`);

    // 响应
    res.status(200).send({ message: '登录成功' });
});

app.listen(PORT, () => {
    console.log(`服务器运行在 http://localhost:${PORT}`);
});
