// 获取DOM元素
const resourceList = document.getElementById('resource-list');
const categoryList = document.getElementById('category-list');
const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-btn');
const navLinks = document.querySelectorAll('nav ul li a');

// 保存当前筛选条件
let currentFilter = {
    category: 'all',
    searchTerm: ''
};

// 合并所有资源数据
let allResources = [];

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
    // 初始化页面
    initializeApp();
});

// 应用初始化
function initializeApp() {
    // 生成分类标签
    generateCategories();
    
    // 显示所有资源
    displayAllResources();
    
    // 设置搜索功能
    setupSearch();
    
    // 添加事件监听器
    addEventListeners();
}

// 生成分类标签
function generateCategories() {
    const categoryList = document.getElementById('category-list');
    const categories = new Set();
    
    // 从所有数据源收集分类
    if (resourcesData && resourcesData.books) {
        resourcesData.books.forEach(book => {
            if (book.category) categories.add(book.category);
        });
    }
    
    if (courseResources && courseResources.courses) {
        courseResources.courses.forEach(course => {
            if (course.category) categories.add(course.category);
        });
    }
    
    // 添加其他资源的分类
    for (const type in additionalResources) {
        if (additionalResources[type]) {
            additionalResources[type].forEach(resource => {
                if (resource.category) categories.add(resource.category);
            });
        }
    }
    
    // 创建分类按钮
    categories.forEach(category => {
        const categoryBtn = document.createElement('button');
        categoryBtn.className = 'category-btn';
        categoryBtn.textContent = category;
        categoryBtn.addEventListener('click', () => filterByCategory(category));
        categoryList.appendChild(categoryBtn);
    });
    
    // 添加"全部"按钮
    const allBtn = document.createElement('button');
    allBtn.className = 'category-btn active';
    allBtn.textContent = '全部';
    allBtn.addEventListener('click', displayAllResources);
    categoryList.prepend(allBtn);
}

// 显示所有资源
function displayAllResources() {
    // 移除所有分类按钮的active类
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 添加"全部"按钮的active类
    const allBtn = document.querySelector('.category-btn');
    if (allBtn) allBtn.classList.add('active');
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    // 显示书籍资源
    if (resourcesData && resourcesData.books) {
        resourcesData.books.forEach(book => {
            resourceList.appendChild(createResourceCard(book, '书籍'));
        });
    }
    
    // 显示课程资源
    if (courseResources && courseResources.courses) {
        courseResources.courses.forEach(course => {
            resourceList.appendChild(createResourceCard(course, '课程'));
        });
    }
    
    // 显示其他资源
    for (const type in additionalResources) {
        if (additionalResources[type]) {
            additionalResources[type].forEach(resource => {
                resourceList.appendChild(createResourceCard(resource, type));
            });
        }
    }
}

// 按分类筛选资源
function filterByCategory(category) {
    // 移除所有分类按钮的active类
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 添加当前选中分类按钮的active类
    document.querySelectorAll('.category-btn').forEach(btn => {
        if (btn.textContent === category) {
            btn.classList.add('active');
        }
    });
    
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    // 筛选并显示书籍资源
    if (resourcesData && resourcesData.books) {
        resourcesData.books.filter(book => book.category === category)
            .forEach(book => {
                resourceList.appendChild(createResourceCard(book, '书籍'));
            });
    }
    
    // 筛选并显示课程资源
    if (courseResources && courseResources.courses) {
        courseResources.courses.filter(course => course.category === category)
            .forEach(course => {
                resourceList.appendChild(createResourceCard(course, '课程'));
            });
    }
    
    // 筛选并显示其他资源
    for (const type in additionalResources) {
        if (additionalResources[type]) {
            additionalResources[type].filter(resource => resource.category === category)
                .forEach(resource => {
                    resourceList.appendChild(createResourceCard(resource, type));
                });
        }
    }
}

// 创建资源卡片
function createResourceCard(resource, type) {
    const card = document.createElement('div');
    card.className = 'resource-card';
    
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
    
    // 添加资源类型标签（如果有）
    if (resource.type) {
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
    const resourceList = document.getElementById('resource-list');
    resourceList.innerHTML = '';
    
    if (!searchTerm) {
        displayAllResources();
        return;
    }
    
    // 搜索书籍资源
    if (resourcesData && resourcesData.books) {
        resourcesData.books.filter(book => 
            (book.title && book.title.toLowerCase().includes(searchTerm)) || 
            (book.description && book.description.toLowerCase().includes(searchTerm)) ||
            (book.category && book.category.toLowerCase().includes(searchTerm))
        ).forEach(book => {
            resourceList.appendChild(createResourceCard(book, '书籍'));
        });
    }
    
    // 搜索课程资源
    if (courseResources && courseResources.courses) {
        courseResources.courses.filter(course => 
            (course.title && course.title.toLowerCase().includes(searchTerm)) || 
            (course.description && course.description.toLowerCase().includes(searchTerm)) ||
            (course.category && course.category.toLowerCase().includes(searchTerm))
        ).forEach(course => {
            resourceList.appendChild(createResourceCard(course, '课程'));
        });
    }
    
    // 搜索其他资源
    for (const type in additionalResources) {
        if (additionalResources[type]) {
            additionalResources[type].filter(resource => 
                (resource.title && resource.title.toLowerCase().includes(searchTerm)) || 
                (resource.description && resource.description.toLowerCase().includes(searchTerm)) ||
                (resource.category && resource.category.toLowerCase().includes(searchTerm))
            ).forEach(resource => {
                resourceList.appendChild(createResourceCard(resource, type));
            });
        }
    }
}

// 添加其他事件监听器
function addEventListeners() {
    // 这里可以添加更多的事件监听器
    
    // 添加学习路径跳转功能（如果有相关页面）
    const pathLinks = document.querySelectorAll('.learning-path-link');
    pathLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const pathId = link.getAttribute('data-path-id');
            // 跳转到学习路径页面或显示学习路径内容
            showLearningPath(pathId);
        });
    });
}

// 显示学习路径（如果有相关功能）
function showLearningPath(pathId) {
    // 这里可以实现学习路径的显示逻辑
    console.log('显示学习路径：', pathId);
    
    // 示例：可以实现模态窗口显示学习路径内容
    // 或者跳转到专门的学习路径页面
}

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
    document.querySelectorAll('.favorite-button').forEach(button => {
        button.addEventListener('click', function() {
            const resourceId = this.getAttribute('data-resource-id');
            toggleFavorite(resourceId);
        });
    });
}

// 收藏/取消收藏资源
function toggleFavorite(resourceId) {
    // 从本地存储获取当前收藏列表
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    
    // 检查资源是否已收藏
    const index = favorites.indexOf(resourceId);
    
    if (index === -1) {
        // 添加到收藏
        favorites.push(resourceId);
        console.log('已收藏:', resourceId);
    } else {
        // 从收藏中移除
        favorites.splice(index, 1);
        console.log('已取消收藏:', resourceId);
    }
    
    // 保存到本地存储
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // 更新UI显示
    updateFavoriteUI(resourceId, index === -1);
}

// 更新收藏按钮UI
function updateFavoriteUI(resourceId, isFavorited) {
    document.querySelectorAll(`.favorite-button[data-resource-id="${resourceId}"]`).forEach(button => {
        if (isFavorited) {
            button.classList.add('favorited');
            button.innerHTML = '❤️ 已收藏';
        } else {
            button.classList.remove('favorited');
            button.innerHTML = '🤍 收藏';
        }
    });
} 