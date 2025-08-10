// ===== 语言切换功能 =====
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中的语言偏好
    const savedLang = localStorage.getItem('userLang');
    let currentLang = savedLang || 'zh';
    
    // 获取切换按钮
    const zhBtn = document.getElementById('zhBtn');
    const enBtn = document.getElementById('enBtn');
    
    // 设置初始语言
    setLanguage(currentLang);
    updateButtonState(currentLang);
    
    // 中文按钮点击事件
    zhBtn?.addEventListener('click', function() {
        setLanguage('zh');
        currentLang = 'zh';
        localStorage.setItem('userLang', 'zh');
        updateButtonState('zh');
    });
    
    // 英文按钮点击事件
    enBtn?.addEventListener('click', function() {
        setLanguage('en');
        currentLang = 'en';
        localStorage.setItem('userLang', 'en');
        updateButtonState('en');
    });
    
    // 更新按钮状态函数
    function updateButtonState(lang) {
        if (lang === 'zh') {
            zhBtn.classList.add('active');
            enBtn.classList.remove('active');
        } else {
            enBtn.classList.add('active');
            zhBtn.classList.remove('active');
        }
    }
    
    // 设置页面语言
    function setLanguage(lang) {
        // 设置body的lang属性
        document.body.setAttribute('lang', lang);
        
        const langElements = document.querySelectorAll('.lang-element');
        
        // 添加淡出效果
        langElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(10px)';
        });
        
        // 延迟执行文本切换和淡入效果
        setTimeout(() => {
            langElements.forEach(el => {
                // 跳过研究兴趣部分的特殊处理
                if (!el.classList.contains('research-interest')) {
                    if (lang === 'en') {
                        el.textContent = el.getAttribute('data-en');
                    } else {
                        el.textContent = el.getAttribute('data-zh');
                    }
                }
                
                // 特殊处理研究兴趣部分
                if (el.classList.contains('research-interest')) {
                    const line1 = el.querySelector('.research-interest-line1');
                    const line2 = el.querySelector('.research-interest-line2');
                    if (line1 && line2) {
                        if (lang === 'en') {
                            // 英文版本显示为一行？？？
                            line1.textContent = "Computational communication, International communication.";
                            line2.textContent = "Including exploring information diffusion and media effects on digital platforms through methods such as NLP and social media data analysis; also focusing on cross-cultural narratives, East Asian media and communication.";
                        } else {
                            // 中文版本显示为两行？？？
                            line1.textContent = "计算传播、国际传播";
                            line2.textContent = "包括基于自然语言处理、社交媒体数据分析等方法的数字平台信息扩散与媒介效应；同时关注跨文化叙事、东亚媒体与东亚传播";
                        }
                    }
                }
                
                // 淡入效果
                setTimeout(() => {
                    el.style.opacity = '1';
                    el.style.transform = 'translateY(0)';
                }, 50);
            });
        }, 300);
    }
});

// 原有的功能 （保留）
// Toggle project details
document.querySelectorAll('.toggle-details').forEach(button => {
    button.addEventListener('click', () => {
        const details = button.previousElementSibling;
        const icon = button.querySelector('i');
        
        if (details.style.maxHeight) {
            details.style.maxHeight = null;
            button.innerHTML = 'View Details <i class="fas fa-chevron-down"></i>';
        } else {
            details.style.maxHeight = details.scrollHeight + "px";
            button.innerHTML = 'Hide Details <i class="fas fa-chevron-up"></i>';
        }
        
        // Toggle icon rotation
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    });
});

// 平滑滚动到导航链接
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});


// 移动端侧边栏功能
const sidebar = document.querySelector('.sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const mobileToggle = document.querySelector('.mobile-nav-toggle');

// 统一侧边栏切换逻辑
function toggleSidebar() {
    sidebar.classList.toggle('active');
    sidebarOverlay.classList.toggle('active');
}

// 按钮点击事件
mobileToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleSidebar();
});

// 遮罩层点击事件
sidebarOverlay?.addEventListener('click', toggleSidebar);

// 滑动关闭功能
let touchStartX = 0;

sidebar?.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
}, {passive: true});

sidebar?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    if (touchStartX - touchEndX > 50) {
        toggleSidebar();
    }
}, {passive: true});