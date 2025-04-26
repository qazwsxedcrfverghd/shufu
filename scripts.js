// 获取DOM元素
const resourceList = document.getElementById('resource-list');
const categoryList = document.getElementById('category-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const favoritesBtn = document.getElementById('favorites-btn');
const navLinks = document.querySelectorAll('nav ul li a');

// 保存当前筛选条件
let currentFilter = {
    category: 'all',
    searchTerm: ''
};

// 合并所有资源数据
let allResources = [];

// 添加收藏状态标记
let showingFavorites = false;

// 添加API接口，用于将来与后端服务交互
const API = {
    // 获取远程数据
    fetchData: async function(endpoint) {
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error('网络响应不正常');
            }
            return await response.json();
        } catch (error) {
            console.error('获取数据失败:', error);
            return null;
        }
    },
    
    // 提交数据到远程服务器
    submitData: async function(endpoint, data) {
        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('提交数据失败');
            }
            
            return await response.json();
        } catch (error) {
            console.error('提交数据失败:', error);
            return null;
        }
    }
};

// 用于Vercel无服务器函数的示例
// 可以在将来实现动态数据获取
function loadDynamicData() {
    // 示例：获取最新资源
    API.fetchData('/api/latest-resources')
        .then(data => {
            if (data) {
                // 更新显示
                console.log('获取到最新资源:', data);
                // 处理获取到的数据
            }
        });
}

// 添加用户交互功能
function setupUserInteractions() {
    // 实现收藏功能
    document.querySelectorAll('.favorite-btn').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = this.getAttribute('data-resource-id');
            toggleFavorite(resourceId);
        });
    });
}

// 初始化页面
function initPage() {
    console.log("初始化页面...");
    // 合并所有资源数据
    combineResources();
    
    // 渲染分类标签
    renderCategories();
    
    // 渲染所有资源
    renderResources(allResources);
    
    // 设置事件监听器
    setupEventListeners();
}

// 合并资源数据
function combineResources() {
    console.log("合并资源数据...");
    
    // 检查资源数据是否存在
    if (typeof resourcesData === 'undefined') {
        console.error("resourcesData 未定义!");
        resourcesData = { books: [] };
    }
    
    if (typeof additionalResources === 'undefined') {
        console.error("additionalResources 未定义!");
        additionalResources = { 
            blogs: [], 
            podcasts: [], 
            newsletters: [], 
            practice: [], 
            datascience: [], 
            math: [], 
            security: [] 
        };
    }
    
    if (typeof courseResources === 'undefined') {
        console.error("courseResources 未定义!");
        courseResources = { courses: [] };
    }
    
    if (typeof meetupResources === 'undefined') {
        console.error("meetupResources 未定义!");
        meetupResources = { meetups: [] };
    }
    
    if (typeof learningPathResources === 'undefined') {
        console.error("learningPathResources 未定义!");
        learningPathResources = { beginner_path: [] };
    }
    
    console.log("resourcesData:", resourcesData);
    console.log("additionalResources:", additionalResources);
    console.log("courseResources:", courseResources);
    console.log("meetupResources:", meetupResources);
    console.log("learningPathResources:", learningPathResources);
    
    // 添加书籍资源
    if (resourcesData.books && resourcesData.books.length > 0) {
        console.log(`添加 ${resourcesData.books.length} 本书籍`);
        resourcesData.books.forEach(book => {
            allResources.push({
                title: book.title,
                link: book.link,
                description: book.description,
                category: book.category,
                type: book.type || "Book"
            });
        });
    }
    
    // 添加博客资源
    if (additionalResources.blogs && additionalResources.blogs.length > 0) {
        console.log(`添加 ${additionalResources.blogs.length} 个博客`);
        additionalResources.blogs.forEach(blog => {
            allResources.push({
                title: blog.title,
                link: blog.link,
                description: blog.description,
                category: blog.category,
                type: "Blog"
            });
        });
    }
    
    // 添加播客资源
    if (additionalResources.podcasts && additionalResources.podcasts.length > 0) {
        console.log(`添加 ${additionalResources.podcasts.length} 个播客`);
        additionalResources.podcasts.forEach(podcast => {
            allResources.push({
                title: podcast.title,
                link: podcast.link,
                description: podcast.description,
                category: podcast.category,
                type: "Podcast"
            });
        });
    }
    
    // 添加通讯资源
    if (additionalResources.newsletters && additionalResources.newsletters.length > 0) {
        console.log(`添加 ${additionalResources.newsletters.length} 个通讯`);
        additionalResources.newsletters.forEach(newsletter => {
            allResources.push({
                title: newsletter.title,
                link: newsletter.link,
                description: newsletter.description,
                category: newsletter.category,
                type: "Newsletter"
            });
        });
    }
    
    // 添加练习题资源
    if (additionalResources.practice && additionalResources.practice.length > 0) {
        console.log(`添加 ${additionalResources.practice.length} 个练习题资源`);
        additionalResources.practice.forEach(practice => {
            allResources.push({
                title: practice.title,
                link: practice.link,
                description: practice.description,
                category: practice.category,
                type: "Practice"
            });
        });
    }
    
    // 添加数据科学资源
    if (additionalResources.datascience && additionalResources.datascience.length > 0) {
        console.log(`添加 ${additionalResources.datascience.length} 个数据科学资源`);
        additionalResources.datascience.forEach(ds => {
            allResources.push({
                title: ds.title,
                link: ds.link,
                description: ds.description,
                category: ds.category,
                type: "Website"
            });
        });
    }
    
    // 添加数学资源
    if (additionalResources.math && additionalResources.math.length > 0) {
        console.log(`添加 ${additionalResources.math.length} 个数学资源`);
        additionalResources.math.forEach(math => {
            allResources.push({
                title: math.title,
                link: math.link,
                description: math.description,
                category: math.category,
                type: "Website"
            });
        });
    }
    
    // 添加安全资源
    if (additionalResources.security && additionalResources.security.length > 0) {
        console.log(`添加 ${additionalResources.security.length} 个安全资源`);
        additionalResources.security.forEach(security => {
            allResources.push({
                title: security.title,
                link: security.link,
                description: security.description,
                category: security.category,
                type: "Website"
            });
        });
    }
    
    // 添加课程资源
    if (courseResources.courses && courseResources.courses.length > 0) {
        console.log(`添加 ${courseResources.courses.length} 个课程`);
        courseResources.courses.forEach(course => {
            allResources.push({
                title: course.title,
                link: course.link,
                description: course.description,
                category: course.category,
                type: course.type || "在线课程"
            });
        });
    }
    
    // 添加线下活动资源
    if (meetupResources.meetups && meetupResources.meetups.length > 0) {
        console.log(`添加 ${meetupResources.meetups.length} 个线下活动`);
        meetupResources.meetups.forEach(meetup => {
            allResources.push({
                title: meetup.title,
                link: meetup.link,
                description: meetup.description,
                category: meetup.category,
                location: meetup.location,
                type: meetup.type || "线下活动"
            });
        });
    }
    
    // 添加学习路径资源
    if (learningPathResources.beginner_path && learningPathResources.beginner_path.length > 0) {
        console.log(`添加 ${learningPathResources.beginner_path.length} 个学习路径资源`);
        learningPathResources.beginner_path.forEach(path => {
            allResources.push({
                title: path.title,
                link: path.link,
                description: path.description,
                category: path.category,
                step: path.step,
                type: path.type || "学习路径"
            });
        });
    }
    
    console.log(`合并了总共 ${allResources.length} 个资源`);
}

// 渲染分类标签
function renderCategories() {
    console.log("渲染分类标签...");
    // 获取所有唯一分类
    const categories = [...new Set(allResources.map(resource => resource.category))];
    console.log("可用分类:", categories);
    
    // 创建"全部"分类标签
    const allTag = document.createElement('span');
    allTag.className = 'category-tag active';
    allTag.dataset.category = 'all';
    allTag.textContent = '全部';
    categoryList.appendChild(allTag);
    
    // 创建其他分类标签
    categories.forEach(category => {
        if (category) {  // 确保分类存在
            const categoryTag = document.createElement('span');
            categoryTag.className = 'category-tag';
            categoryTag.dataset.category = category;
            categoryTag.textContent = category;
            categoryList.appendChild(categoryTag);
        }
    });
    
    // 创建资源类型分类
    const typeCategories = ['Book', 'Blog', 'Podcast', 'Newsletter', 'Website', '免费课程', '付费课程', '在线课程', '线下活动', '免费参加', '入门课程', '基础教材', '进阶教材', '通俗读物'];
    
    typeCategories.forEach(type => {
        const typeTag = document.createElement('span');
        typeTag.className = 'category-tag';
        typeTag.dataset.category = type;
        typeTag.textContent = type;
        categoryList.appendChild(typeTag);
    });
    
    // 创建地点分类
    const locations = [...new Set(allResources
        .filter(resource => resource.location)
        .map(resource => resource.location))];
    
    if (locations.length > 0) {
        console.log("可用地点:", locations);
        
        locations.forEach(location => {
            const locationTag = document.createElement('span');
            locationTag.className = 'category-tag location-tag';
            locationTag.dataset.category = location;
            locationTag.textContent = location;
            categoryList.appendChild(locationTag);
        });
    }
}

// 渲染资源列表
function renderResources(resources) {
    console.log(`渲染 ${resources.length} 个资源...`);
    // 清空列表
    resourceList.innerHTML = '';
    
    // 如果没有资源，显示提示信息
    if (resources.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-result';
        noResult.textContent = '没有找到相关资源';
        resourceList.appendChild(noResult);
        return;
    }
    
    // 检查是否需要按学习路径步骤排序
    const hasLearningPath = resources.some(resource => resource.category === "学习路径" && resource.step);
    
    // 如果存在学习路径资源，按步骤排序
    if (hasLearningPath && currentFilter.category === "学习路径") {
        resources.sort((a, b) => (a.step || 0) - (b.step || 0));
    }
    
    // 渲染每个资源卡片
    resources.forEach(resource => {
        const card = document.createElement('div');
        card.className = 'resource-card';
        
        // 对于学习路径资源，添加特殊的类
        if (resource.category === "学习路径") {
            card.classList.add('learning-path-card');
            if (resource.step) {
                card.classList.add(`step-${resource.step}`);
            }
        }
        
        // 构建卡片HTML
        let cardHTML = `
            <h3>${resource.title}</h3>
            <span class="category">${resource.category}</span>
            ${resource.type ? `<span class="type" data-type="${resource.type}">${resource.type}</span>` : ''}
        `;
        
        // 如果有地点信息，添加地点标签
        if (resource.location) {
            cardHTML += `<span class="location">${resource.location}</span>`;
        }
        
        // 如果有学习步骤信息，添加步骤标签
        if (resource.step) {
            cardHTML += `<span class="step">步骤 ${resource.step}</span>`;
        }
        
        // 添加描述和链接
        cardHTML += `
            <p class="description">${resource.description}</p>
            <a href="${resource.link}" class="link" target="_blank">查看详情</a>
        `;
        
        card.innerHTML = cardHTML;
        resourceList.appendChild(card);
    });
}

// 筛选资源
function filterResources() {
    let filteredResources = allResources;
    
    // 按分类筛选
    if (currentFilter.category !== 'all') {
        filteredResources = filteredResources.filter(resource => {
            // 检查资源的分类或类型是否匹配当前筛选条件
            return resource.category === currentFilter.category || 
                   resource.type === currentFilter.category ||
                   resource.location === currentFilter.category;
        });
    }
    
    // 按搜索词筛选
    if (currentFilter.searchTerm) {
        const searchTerm = currentFilter.searchTerm.toLowerCase();
        filteredResources = filteredResources.filter(resource => 
            resource.title.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm) ||
            (resource.type && resource.type.toLowerCase().includes(searchTerm)) ||
            (resource.location && resource.location.toLowerCase().includes(searchTerm))
        );
    }
    
    // 渲染筛选后的结果
    renderResources(filteredResources);
}

// 设置事件监听器
function setupEventListeners() {
    console.log("设置事件监听器...");
    // 导航栏点击事件
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 更新导航栏激活状态
            navLinks.forEach(item => item.classList.remove('active'));
            e.target.classList.add('active');
            
            // 更新分类并筛选
            currentFilter.category = e.target.dataset.category;
            updateCategoryTags(currentFilter.category);
            filterResources();
        });
    });
    
    // 分类标签点击事件
    categoryList.addEventListener('click', (e) => {
        if (e.target.classList.contains('category-tag')) {
            // 更新标签激活状态
            document.querySelectorAll('.category-tag').forEach(tag => 
                tag.classList.remove('active')
            );
            e.target.classList.add('active');
            
            // 更新分类并筛选
            currentFilter.category = e.target.dataset.category;
            
            // 更新导航栏激活状态
            updateNavLinks(currentFilter.category);
            
            filterResources();
        }
    });
    
    // 搜索按钮点击事件
    searchBtn.addEventListener('click', () => {
        currentFilter.searchTerm = searchInput.value.trim();
        filterResources();
    });
    
    // 搜索框回车事件
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            currentFilter.searchTerm = searchInput.value.trim();
            filterResources();
        }
    });
}

// 更新分类标签激活状态
function updateCategoryTags(category) {
    document.querySelectorAll('.category-tag').forEach(tag => {
        tag.classList.remove('active');
        if (tag.dataset.category === category) {
            tag.classList.add('active');
        }
    });
}

// 更新导航链接激活状态
function updateNavLinks(category) {
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.dataset.category === category) {
            link.classList.add('active');
        }
    });
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log("=== 页面加载完成 ===");
    
    // 初始化页面
    initializeApp();
    
    // 输出当前状态
    console.log(`当前是否为收藏视图: ${showingFavorites}`);
    console.log(`当前分类: ${currentFilter.category}`);
    console.log(`当前搜索词: ${currentFilter.searchTerm || '无'}`);
    
    // 设置收藏按钮事件
    setupFavoritesView();
    
    // 设置返回按钮事件
    setupBackButton();
    
    // 确保收藏按钮正确响应点击
    const favBtn = document.getElementById('favorites-btn');
    if (favBtn) {
        // 移除旧的事件监听器（防止多次绑定）
        favBtn.removeEventListener('click', toggleFavoritesView);
        
        // 添加新的事件监听器
        favBtn.addEventListener('click', function() {
            console.log("收藏按钮被点击");
            toggleFavoritesView();
        });
    }
    
    // 手动为所有资源卡片添加收藏按钮
    setTimeout(function() {
        console.log("开始手动添加收藏按钮");
        
        const allCards = document.querySelectorAll('.resource-card');
        console.log(`找到 ${allCards.length} 张资源卡片`);
        
        allCards.forEach(card => {
            const resourceId = card.getAttribute('data-resource-id');
            
            // 检查卡片是否已有收藏按钮
            if (card.querySelector('.favorite-btn')) {
                console.log(`卡片 ${resourceId} 已有收藏按钮`);
                return;
            }
            
            console.log(`为卡片 ${resourceId} 添加收藏按钮`);
            
            // 创建新的收藏按钮
            const favoriteBtn = document.createElement('button');
            favoriteBtn.className = 'favorite-btn';
            favoriteBtn.setAttribute('data-resource-id', resourceId);
            
            // 设置初始状态
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            if (favorites.includes(resourceId)) {
                favoriteBtn.classList.add('active');
                favoriteBtn.textContent = '❤';
            } else {
                favoriteBtn.textContent = '♡';
            }
            
            // 添加点击事件
            favoriteBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleFavorite(resourceId);
                return false;
            };
            
            // 插入到卡片最前面
            card.insertBefore(favoriteBtn, card.firstChild);
        });
        
        console.log("收藏按钮添加完成");
    }, 500); // 延迟500毫秒确保DOM已完全加载
});

// 设置收藏功能
function setupFavoritesView() {
    console.log("设置收藏视图...");
    
    // 重新绑定收藏按钮事件，避免多次绑定
    favoritesBtn.removeEventListener('click', toggleFavoritesView);
    favoritesBtn.addEventListener('click', toggleFavoritesView);
    
    // 检查URL参数中是否有view=favorites
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('view') === 'favorites') {
        console.log("URL指定了收藏视图");
        showingFavorites = true;
        favoritesBtn.classList.add('active');
        
        // 在收藏视图中隐藏"我的收藏"按钮
        favoritesBtn.style.display = 'none';
        
        // 设置标题为"我的收藏"
        const resourceSectionTitle = document.querySelector('.resource-section h2');
        if (resourceSectionTitle) {
            resourceSectionTitle.setAttribute('data-original-text', resourceSectionTitle.textContent);
            resourceSectionTitle.textContent = '我的收藏';
            resourceSectionTitle.className = 'favorites-title';
        }
        
        // 显示收藏内容
        displayFavorites();
    } else {
        // 确保当前不是收藏视图
        showingFavorites = false;
        favoritesBtn.classList.remove('active');
        
        // 确保"我的收藏"按钮可见
        favoritesBtn.style.display = '';
    }
}

// 切换收藏视图
function toggleFavoritesView() {
    console.log(`切换收藏视图，当前状态: ${showingFavorites ? '收藏' : '普通'} -> ${showingFavorites ? '普通' : '收藏'}`);
    
    // 切换状态标志
    showingFavorites = !showingFavorites;
    
    // 获取资源部分的标题
    const resourceSectionTitle = document.querySelector('.resource-section h2');
    
    // 获取返回按钮
    const backBtn = document.getElementById('back-btn');
    
    if (showingFavorites) {
        // 显示收藏页面
        console.log("进入收藏视图");
        favoritesBtn.classList.add('active');
        
        // 在收藏视图中隐藏"我的收藏"按钮
        favoritesBtn.style.display = 'none';
        
        // 显示返回按钮
        if (backBtn) {
            backBtn.classList.add('active');
        }
        
        // 保存原始标题
        if (resourceSectionTitle && !resourceSectionTitle.hasAttribute('data-original-text')) {
            resourceSectionTitle.setAttribute('data-original-text', resourceSectionTitle.textContent);
        }
        
        // 设置标题为"我的收藏"
        if (resourceSectionTitle) {
            resourceSectionTitle.textContent = '我的收藏';
            resourceSectionTitle.className = 'favorites-title';
        }
        
        // 重置分类选择，选中"全部"分类并设置URL
        updateCategoryButtons('全部');
        
        // 更新URL，可以通过分享链接直接进入收藏视图
        updateURLWithView('favorites');
        
        // 显示收藏内容
        // 注意：我们先设置showingFavorites为true，然后调用displayFavorites，这很重要
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        console.log(`准备显示 ${favorites.length} 个收藏资源`);
        
        if (favorites.length > 0) {
            // 有收藏资源，显示收藏内容
            filterFavoritesByCategory('全部');
        } else {
            // 没有收藏资源，显示提示
            displayEmptyFavorites();
        }
    } else {
        // 返回所有资源视图
        console.log("返回普通视图");
        favoritesBtn.classList.remove('active');
        
        // 在普通视图中显示"我的收藏"按钮
        favoritesBtn.style.display = '';
        
        // 隐藏返回按钮
        if (backBtn) {
            backBtn.classList.remove('active');
        }
        
        // 恢复原始标题
        if (resourceSectionTitle && resourceSectionTitle.hasAttribute('data-original-text')) {
            resourceSectionTitle.textContent = resourceSectionTitle.getAttribute('data-original-text');
            resourceSectionTitle.className = ''; // 移除特殊样式类
        } else {
            // 默认标题
            resourceSectionTitle.textContent = '推荐资源';
            resourceSectionTitle.className = '';
        }
        
        // 更新URL
        updateURLWithView(null);
        
        // 重置分类选择，选中"全部"分类
        updateCategoryButtons('全部');
        
        // 显示所有资源
        displayAllResources();
    }
}

// 显示收藏资源
function displayFavorites() {
    console.log("显示收藏资源，筛选条件：全部");
    
    // 如果不是收藏视图，先切换到收藏视图
    if (!showingFavorites) {
        console.log("不在收藏视图中，切换到收藏视图");
        toggleFavoritesView();
        return; // toggleFavoritesView会再次调用displayFavorites
    }
    
    // 从本地存储获取所有收藏的资源ID
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log(`已收藏资源数量: ${favorites.length}`);
    
    // 清空资源列表
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    // 如果没有收藏任何资源，显示提示
    if (favorites.length === 0) {
        displayEmptyFavorites();
        return;
    }
    
    // 创建已收藏资源的卡片
    let hasDisplayedCards = false;
    
    // 对所有资源进行遍历，查找已收藏的项目
    allResources.forEach(resource => {
        // 为每个资源创建唯一ID
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        
        // 检查该资源是否已收藏
        if (favorites.includes(resourceId)) {
            console.log(`添加已收藏资源卡片: ${resourceId}`);
            const type = resource.type || '资源';
            const card = createResourceCard(resource, type, resourceId);
            resourceList.appendChild(card);
            hasDisplayedCards = true;
        }
    });
    
    // 如果没有匹配的收藏资源
    if (!hasDisplayedCards) {
        const noResult = document.createElement('div');
        noResult.className = 'no-favorites';
        
        const message = document.createElement('p');
        message.textContent = '未找到已收藏的资源';
        
        const hint = document.createElement('p');
        hint.textContent = '可能需要重新收藏或刷新页面';
        hint.style.fontSize = '0.9rem';
        hint.style.color = '#888';
        
        noResult.appendChild(message);
        noResult.appendChild(hint);
        
        resourceList.appendChild(noResult);
    }
}

// 加载所有收藏状态
function loadFavoritesState() {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // 为所有卡片更新收藏状态
    document.querySelectorAll('.resource-card').forEach(card => {
        const resourceId = card.getAttribute('data-resource-id');
        if (resourceId && favorites.includes(resourceId)) {
            const favoriteBtn = card.querySelector('.favorite-btn');
            if (favoriteBtn) {
                favoriteBtn.classList.add('active');
                favoriteBtn.innerHTML = '❤'; // 实心心形
            }
        }
    });
}

// 修改应用初始化函数，添加收藏视图检查
function initializeApp() {
    // 合并所有资源数据
    combineResources();
    
    // 生成分类标签
    generateCategories();
    
    // 确保页面加载时标题是"推荐资源"
    const resourceSectionTitle = document.querySelector('.resource-section h2');
    if (resourceSectionTitle) {
        resourceSectionTitle.textContent = '推荐资源';
        resourceSectionTitle.className = '';
    }
    
    // 设置收藏功能
    setupFavoritesView();
    
    // 如果不是收藏视图，显示所有资源
    if (!showingFavorites) {
        displayAllResources();
    }
    
    // 设置搜索功能
    setupSearch();
    
    // 添加事件监听器
    addEventListeners();
}

// 收藏/取消收藏资源
function toggleFavorite(resourceId) {
    console.log("触发收藏函数 - 资源ID:", resourceId);
    
    // 从本地存储获取当前收藏列表
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // 检查资源是否已收藏
    const index = favorites.indexOf(resourceId);
    let isFavorited = index === -1; // 如果不在列表中，将被收藏
    
    if (isFavorited) {
        // 添加到收藏
        favorites.push(resourceId);
        console.log('已收藏:', resourceId);
    } else {
        // 从收藏中移除
        favorites.splice(index, 1);
        console.log('已取消收藏:', resourceId);
        
        // 如果当前是收藏视图，需要移除这个卡片
        if (showingFavorites) {
            const cardToRemove = document.querySelector(`.resource-card[data-resource-id="${resourceId}"]`);
            if (cardToRemove) {
                cardToRemove.classList.add('removing');
                // 添加动画效果
                setTimeout(() => {
                    cardToRemove.remove();
                    
                    // 检查是否还有收藏的资源
                    if (document.querySelectorAll('.resource-grid .resource-card').length === 0) {
                        // 如果没有更多卡片，显示空收藏提示
                        displayFavorites();
                    }
                }, 300);
            }
        }
    }
    
    // 保存到本地存储
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // 更新所有相同resourceId的按钮状态
    document.querySelectorAll(`.favorite-btn[data-resource-id="${resourceId}"]`).forEach(btn => {
        if (isFavorited) {
            // 添加收藏状态
            btn.classList.add('active');
        } else {
            // 移除收藏状态
            btn.classList.remove('active');
        }
    });
    
    console.log("收藏函数执行完毕");
    
    // 返回true表示已收藏，false表示已取消收藏
    return isFavorited;
}

// 创建资源卡片
function createResourceCard(resource, type, customId = null) {
    console.log(`创建资源卡片: ${resource.title}`);
    
    const card = document.createElement('div');
    card.className = 'resource-card';
    
    // 添加资源ID用于收藏功能
    const resourceId = customId || `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
    card.setAttribute('data-resource-id', resourceId);
    
    // 添加收藏按钮
    const favoriteBtn = document.createElement('button');
    favoriteBtn.className = 'favorite-btn';
    favoriteBtn.setAttribute('data-resource-id', resourceId);
    
    // 检查是否已收藏
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (favorites.includes(resourceId)) {
        favoriteBtn.classList.add('active');
        console.log(`资源已收藏: ${resourceId}`);
    } else {
        console.log(`资源未收藏: ${resourceId}`);
    }
    
    // 设置收藏按钮点击事件
    favoriteBtn.onclick = function(e) {
        e.preventDefault(); // 防止事件冒泡
        e.stopPropagation();
        toggleFavorite(resourceId);
        return false; // 阻止默认行为
    };
    
    card.appendChild(favoriteBtn);
    
    // 添加资源类型标签
    const typeTag = document.createElement('span');
    typeTag.className = 'resource-type';
    typeTag.textContent = type;
    card.appendChild(typeTag);
    
    // 添加资源标题
    const title = document.createElement('h3');
    title.textContent = resource.title || '未命名资源';
    card.appendChild(title);
    
    // 添加资源描述（如果有）
    if (resource.description) {
        const description = document.createElement('p');
        description.textContent = resource.description;
        card.appendChild(description);
    }
    
    // 添加资源链接
    if (resource.link) {
        const link = document.createElement('a');
        link.href = resource.link;
        link.target = '_blank';
        link.textContent = '查看详情';
        card.appendChild(link);
    }
    
    // 添加资源标签（如果有）
    if (resource.category) {
        const category = document.createElement('span');
        category.className = 'resource-category';
        category.textContent = resource.category;
        card.appendChild(category);
    }
    
    // 添加资源类型标签（如果有type且不等于传入的type）
    if (resource.type && resource.type !== type) {
        const resType = document.createElement('span');
        resType.className = 'resource-category';
        resType.textContent = resource.type;
        card.appendChild(resType);
    }
    
    return card;
}

// 设置搜索功能
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    const searchBtn = document.getElementById('search-btn');
    
    // 点击搜索按钮时搜索
    searchBtn.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        searchResources(searchTerm);
    });
    
    // 按回车键时搜索
    searchInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            const searchTerm = searchInput.value.toLowerCase().trim();
            searchResources(searchTerm);
        }
    });
}

// 搜索资源
function searchResources(searchTerm) {
    currentFilter.searchTerm = searchTerm;
    
    // 重置分类按钮
    updateCategoryButtons('全部');
    
    // 更新URL以保存搜索状态
    const url = new URL(window.location);
    if (searchTerm) {
        url.searchParams.set('search', searchTerm);
    } else {
        url.searchParams.delete('search');
    }
    // 使用pushState更新URL，不会触发页面刷新但支持前进后退
    window.history.pushState({search: searchTerm}, '', url);
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    if (!searchTerm) {
        // 根据当前视图显示相应内容
        if (showingFavorites) {
            displayFavorites();
        } else {
            displayAllResources();
        }
        return;
    }
    
    // 搜索条件
    searchTerm = searchTerm.toLowerCase();
    
    // 根据当前视图选择搜索范围
    let filteredResources = [];
    
    if (showingFavorites) {
        // 获取已收藏的资源ID
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        
        // 在收藏视图中，只搜索已收藏的资源
        filteredResources = allResources.filter(resource => {
            const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
            
            // 确保资源已被收藏，并且符合搜索条件
            return favorites.includes(resourceId) && (
                (resource.title && resource.title.toLowerCase().includes(searchTerm)) || 
                (resource.description && resource.description.toLowerCase().includes(searchTerm)) ||
                (resource.category && resource.category.toLowerCase().includes(searchTerm)) ||
                (resource.type && resource.type.toLowerCase().includes(searchTerm))
            );
        });
    } else {
        // 在普通视图中，搜索所有资源
        filteredResources = allResources.filter(resource => 
            (resource.title && resource.title.toLowerCase().includes(searchTerm)) || 
            (resource.description && resource.description.toLowerCase().includes(searchTerm)) ||
            (resource.category && resource.category.toLowerCase().includes(searchTerm)) ||
            (resource.type && resource.type.toLowerCase().includes(searchTerm))
        );
    }
    
    if (filteredResources.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = showingFavorites ? 'no-favorites' : 'no-result';
        noResult.textContent = showingFavorites 
            ? `在您收藏的资源中没有找到包含"${searchTerm}"的内容` 
            : `没有找到包含"${searchTerm}"的资源`;
        resourceList.appendChild(noResult);
        return;
    }
    
    filteredResources.forEach(resource => {
        const type = resource.type || '资源';
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        resourceList.appendChild(createResourceCard(resource, type, resourceId));
    });
}

// 添加其他事件监听器
function addEventListeners() {
    // 检查URL中是否有查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');
    
    // 如果有category参数，按分类筛选
    if (categoryParam) {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const matchingBtn = Array.from(categoryBtns).find(btn => btn.textContent === categoryParam);
        if (matchingBtn) {
            matchingBtn.click();
        }
    }
    
    // 如果有search参数，执行搜索
    if (searchParam) {
        document.getElementById('search-input').value = searchParam;
        searchResources(searchParam);
    }
}

// 生成分类标签
function generateCategories() {
    console.log("生成分类标签");
    const categoryList = document.getElementById('category-list');
    categoryList.innerHTML = ''; // 清空现有内容
    
    const categories = new Set();
    
    // 从所有数据源收集分类
    allResources.forEach(resource => {
        if (resource.category) categories.add(resource.category);
    });
    
    // 添加"全部"按钮，注意这里不再直接调用displayAllResources
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', () => {
        console.log("点击了'全部'分类按钮");
        updateCategoryButtons('全部');
        
        // 根据当前视图状态决定显示内容
        if (showingFavorites) {
            console.log("当前是收藏视图，显示所有收藏");
            displayFavorites();
        } else {
            console.log("当前是普通视图，显示所有资源");
            displayAllResources();
        }
    });
    categoryList.appendChild(allBtn);
    
    // 创建分类按钮，现在分类按钮处理也需要考虑收藏视图
    Array.from(categories).sort().forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.textContent = category;
        categoryBtn.addEventListener('click', () => {
            console.log(`点击了'${category}'分类按钮`);
            updateCategoryButtons(category);
            
            // 根据当前视图状态决定如何筛选
            if (showingFavorites) {
                console.log(`在收藏视图中筛选'${category}'分类`);
                filterFavoritesByCategory(category);
            } else {
                console.log(`在普通视图中筛选'${category}'分类`);
                filterAllResourcesByCategory(category);
            }
        });
        categoryList.appendChild(categoryBtn);
    });
}

// 筛选所有资源（用于普通视图）
function filterAllResourcesByCategory(category) {
    console.log(`筛选所有资源，分类: ${category}`);
    
    // 更新URL以保存分类状态
    const url = new URL(window.location);
    if (category === '全部') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', category);
    }
    // 使用pushState更新URL，不会触发页面刷新但支持前进后退
    window.history.pushState({category: category}, '', url);
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    // 普通视图下的筛选逻辑
    const filteredResources = allResources.filter(resource => 
        category === '全部' || resource.category === category
    );
    
    if (filteredResources.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-result';
        noResult.textContent = `没有找到分类为"${category}"的资源`;
        resourceList.appendChild(noResult);
        return;
    }
    
    // 对筛选后的结果按标题排序
    const sortedResources = [...filteredResources].sort((a, b) => {
        const titleA = a.title || '';
        const titleB = b.title || '';
        return titleA.localeCompare(titleB, 'zh-CN');
    });
    
    sortedResources.forEach(resource => {
        const type = resource.type || '资源';
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        resourceList.appendChild(createResourceCard(resource, type, resourceId));
    });
}

// 筛选收藏资源（用于收藏视图）
function filterFavoritesByCategory(category) {
    console.log(`筛选收藏资源，分类: ${category}`);
    
    // 更新URL以保存分类状态
    const url = new URL(window.location);
    url.searchParams.set('view', 'favorites'); // 确保保持在收藏视图
    if (category === '全部') {
        url.searchParams.delete('category');
    } else {
        url.searchParams.set('category', category);
    }
    // 使用pushState更新URL，不会触发页面刷新但支持前进后退
    window.history.pushState({view: 'favorites', category: category}, '', url);
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    // 获取已收藏的资源ID
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    console.log(`已收藏资源数量: ${favorites.length}`);
    
    if (favorites.length === 0) {
        // 显示没有收藏资源的提示
        displayEmptyFavorites();
        return;
    }
    
    // 筛选已收藏且符合分类的资源
    const filteredResources = allResources.filter(resource => {
        // 为资源创建ID
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        
        // 只保留已收藏的资源
        return favorites.includes(resourceId) && 
              (category === '全部' || resource.category === category);
    });
    
    console.log(`筛选后的收藏资源数量: ${filteredResources.length}`);
    
    if (filteredResources.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-favorites';
        
        const message = document.createElement('p');
        message.textContent = category === '全部' 
            ? '您还没有收藏任何资源' 
            : `没有找到分类为"${category}"的已收藏资源`;
        
        noResult.appendChild(message);
        resourceList.appendChild(noResult);
        return;
    }
    
    // 对筛选后的收藏资源按标题排序
    const sortedResources = [...filteredResources].sort((a, b) => {
        const titleA = a.title || '';
        const titleB = b.title || '';
        return titleA.localeCompare(titleB, 'zh-CN');
    });
    
    // 显示筛选后的收藏资源
    sortedResources.forEach(resource => {
        const type = resource.type || '资源';
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        resourceList.appendChild(createResourceCard(resource, type, resourceId));
    });
}

// 显示空收藏提示
function displayEmptyFavorites() {
    console.log("显示空收藏提示");
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    const noResult = document.createElement('div');
    noResult.className = 'no-favorites';
    
    const heartIcon = document.createElement('span');
    heartIcon.className = 'heart-icon';
    heartIcon.textContent = '♡';
    
    const message = document.createElement('p');
    message.textContent = '您还没有收藏任何资源';
    
    const hint = document.createElement('p');
    hint.textContent = '浏览资源时，点击左上角的心形图标即可收藏喜欢的内容';
    hint.style.fontSize = '0.9rem';
    hint.style.color = '#888';
    
    noResult.appendChild(heartIcon);
    noResult.appendChild(message);
    noResult.appendChild(hint);
    
    resourceList.appendChild(noResult);
}

// 更新分类按钮样式
function updateCategoryButtons(selectedCategory) {
    console.log(`更新分类按钮，选中: ${selectedCategory}`);
    
    // 保存当前选中的分类
    currentFilter.category = selectedCategory;
    
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.textContent === selectedCategory) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// 显示所有资源
function displayAllResources() {
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    if (allResources.length === 0) {
        const noResult = document.createElement('div');
        noResult.className = 'no-result';
        noResult.textContent = '暂无资源';
        resourceList.appendChild(noResult);
        return;
    }
    
    // 按资源标题的首字母排序（中英文混合）
    const sortedResources = [...allResources].sort((a, b) => {
        // 获取标题，如果没有则使用空字符串
        const titleA = a.title || '';
        const titleB = b.title || '';
        
        // 使用本地化比较，考虑中英文混合情况
        return titleA.localeCompare(titleB, 'zh-CN');
    });
    
    console.log("资源已按标题首字母排序");
    
    sortedResources.forEach(resource => {
        const type = resource.type || '资源';
        // 为每个资源创建唯一ID，基于标题
        const resourceId = `resource-${resource.title.replace(/\s+/g, '-').toLowerCase()}`;
        resourceList.appendChild(createResourceCard(resource, type, resourceId));
    });
}

// 添加浏览器历史导航支持
window.addEventListener('popstate', function(event) {
    console.log("检测到浏览器历史导航事件");
    // 根据当前URL状态重新加载页面状态
    
    const urlParams = new URLSearchParams(window.location.search);
    const viewParam = urlParams.get('view');
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');
    
    // 获取返回按钮
    const backBtn = document.getElementById('back-btn');
    
    // 第一步：检查是否是收藏视图
    if (viewParam === 'favorites') {
        if (!showingFavorites) {
            console.log("切换到收藏视图");
            
            // 设置为收藏视图状态
            showingFavorites = true;
            favoritesBtn.classList.add('active');
            favoritesBtn.style.display = 'none';
            
            // 显示返回按钮
            if (backBtn) {
                backBtn.classList.add('active');
            }
            
            // 设置标题
            const resourceSectionTitle = document.querySelector('.resource-section h2');
            if (resourceSectionTitle) {
                if (!resourceSectionTitle.hasAttribute('data-original-text')) {
                    resourceSectionTitle.setAttribute('data-original-text', resourceSectionTitle.textContent);
                }
                resourceSectionTitle.textContent = '我的收藏';
                resourceSectionTitle.className = 'favorites-title';
            }
        }
    } else {
        if (showingFavorites) {
            console.log("切换到普通视图");
            
            // 设置为普通视图状态
            showingFavorites = false;
            favoritesBtn.classList.remove('active');
            favoritesBtn.style.display = '';
            
            // 隐藏返回按钮
            if (backBtn) {
                backBtn.classList.remove('active');
            }
            
            // 恢复标题
            const resourceSectionTitle = document.querySelector('.resource-section h2');
            if (resourceSectionTitle) {
                if (resourceSectionTitle.hasAttribute('data-original-text')) {
                    resourceSectionTitle.textContent = resourceSectionTitle.getAttribute('data-original-text');
                } else {
                    resourceSectionTitle.textContent = '推荐资源';
                }
                resourceSectionTitle.className = '';
            }
        }
    }
    
    // 第二步：处理分类筛选
    if (categoryParam && categoryParam !== 'all') {
        console.log(`从URL中恢复分类: ${categoryParam}`);
        updateCategoryButtons(categoryParam);
        
        // 根据当前视图状态使用不同的筛选方法
        if (showingFavorites) {
            filterFavoritesByCategory(categoryParam);
        } else {
            filterAllResourcesByCategory(categoryParam);
        }
    } else {
        // 如果没有分类参数，显示所有分类
        console.log("没有分类参数，恢复到'全部'分类");
        updateCategoryButtons('全部');
        
        // 根据当前视图状态决定显示内容
        if (showingFavorites) {
            displayFavorites();
        } else {
            displayAllResources();
        }
    }
    
    // 第三步：处理搜索
    if (searchParam) {
        document.getElementById('search-input').value = searchParam;
        searchResources(searchParam);
    }
});

// 修改URL更新函数，确保它们使用pushState而不是replaceState
function updateURLWithView(view) {
    const url = new URL(window.location);
    
    if (view) {
        url.searchParams.set('view', view);
    } else {
        url.searchParams.delete('view');
    }
    
    // 使用pushState而不是replaceState，这样才能支持浏览器的前进和后退
    window.history.pushState({
        view: view
    }, '', url);
}

// 设置返回按钮功能
function setupBackButton() {
    console.log("设置返回按钮功能");
    
    const backBtn = document.getElementById('back-btn');
    if (!backBtn) {
        console.error("未找到返回按钮");
        return;
    }
    
    // 根据当前视图状态设置返回按钮的可见性
    if (showingFavorites) {
        backBtn.classList.add('active');
    } else {
        backBtn.classList.remove('active');
    }
    
    // 移除之前的事件监听器以避免重复绑定
    backBtn.removeEventListener('click', handleBackButtonClick);
    
    // 绑定返回按钮的点击事件 - 直接回到初始主界面
    backBtn.addEventListener('click', function() {
        console.log("返回按钮被点击 - 直接返回到初始主界面");
        
        if (showingFavorites) {
            // 切换标志
            showingFavorites = false;
            
            // 更新收藏按钮状态
            const favBtn = document.getElementById('favorites-btn');
            if (favBtn) {
                favBtn.classList.remove('active');
                favBtn.style.display = ''; // 显示收藏按钮
            }
            
            // 隐藏返回按钮
            backBtn.classList.remove('active');
            
            // 恢复标题
            const resourceSectionTitle = document.querySelector('.resource-section h2');
            if (resourceSectionTitle) {
                resourceSectionTitle.textContent = '推荐资源';
                resourceSectionTitle.className = '';
                // 清除保存的原始标题，确保完全重置
                if (resourceSectionTitle.hasAttribute('data-original-text')) {
                    resourceSectionTitle.removeAttribute('data-original-text');
                }
            }
            
            // 完全重置URL，删除所有查询参数
            window.history.pushState({}, '', window.location.pathname);
            
            // 重置所有筛选条件
            currentFilter.category = 'all';
            currentFilter.searchTerm = '';
            
            // 清空搜索框
            const searchInput = document.getElementById('search-input');
            if (searchInput) {
                searchInput.value = '';
            }
            
            // 重置所有分类按钮，只激活"全部"按钮
            updateCategoryButtons('全部');
            
            // 重新显示所有资源（不带任何筛选）
            displayAllResources();
            
            console.log("已完全重置回初始主界面状态");
        }
    });
    
    console.log("返回按钮设置完成");
}

// 处理返回按钮点击事件
function handleBackButtonClick() {
    console.log("返回按钮被点击");
    
    if (showingFavorites) {
        // 如果当前是收藏视图，返回主页
        showingFavorites = false; // 直接修改状态而不是调用toggleFavoritesView，防止可能的状态混乱
        
        // 更新收藏按钮状态
        const favBtn = document.getElementById('favorites-btn');
        if (favBtn) {
            favBtn.classList.remove('active');
            favBtn.style.display = ''; // 显示收藏按钮
        }
        
        // 隐藏返回按钮
        const backBtn = document.getElementById('back-btn');
        if (backBtn) {
            backBtn.classList.remove('active');
        }
        
        // 恢复标题
        const resourceSectionTitle = document.querySelector('.resource-section h2');
        if (resourceSectionTitle) {
            if (resourceSectionTitle.hasAttribute('data-original-text')) {
                resourceSectionTitle.textContent = resourceSectionTitle.getAttribute('data-original-text');
            } else {
                resourceSectionTitle.textContent = '推荐资源';
            }
            resourceSectionTitle.className = '';
        }
        
        // 重置URL
        const url = new URL(window.location);
        url.searchParams.delete('view');
        window.history.pushState({}, '', url);
        
        // 恢复到全部分类
        updateCategoryButtons('全部');
        
        // 显示所有资源
        displayAllResources();
        
        console.log("已返回主页视图");
    }
} 
