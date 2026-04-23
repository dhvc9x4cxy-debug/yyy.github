// ========================================
// 梨园华服 · 滑动展示组件
// 文件：costume-slider.js
// ========================================

// 全局变量：存储当前服装信息（供弹窗使用）
let costumeSliderData = {
    currentModalImg: 'img/mlfgfzj.jpg',
    currentTitle: '贵妃凤冠 · 点翠戏服'
};

// 1. 初始化服装滑动组件
function initCostumeSlider() {
    const slider = document.getElementById('costumeSlider');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const costumeItems = document.querySelectorAll('.costume-item');
    
    if (!costumeItems.length) return;
    
    // 绑定点击事件
    costumeItems.forEach(item => {
        item.addEventListener('click', function() {
            updateCostumeMainDisplay(this);
        });
    });
    
    // 绑定滑动按钮
    if (prevBtn) {
        prevBtn.addEventListener('click', () => scrollCostumeThumbnails('prev'));
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => scrollCostumeThumbnails('next'));
    }
    
    // 设置默认激活项
    updateCostumeMainDisplay(costumeItems[0]);
}

// 2. 更新主图展示区域
function updateCostumeMainDisplay(selectedItem) {
    const currentImg = document.getElementById('currentCostumeImg');
    const currentDesc = document.getElementById('currentCostumeDesc');
    const costumeItems = document.querySelectorAll('.costume-item');
    
    const imgSrc = selectedItem.getAttribute('data-img');
    const modalSrc = selectedItem.getAttribute('data-modal');
    const title = selectedItem.getAttribute('data-title');
    const desc = selectedItem.getAttribute('data-desc');
    
    // 更新全局变量（供弹窗使用）
    costumeSliderData.currentModalImg = modalSrc;
    costumeSliderData.currentTitle = title;
    
    // 更新DOM
    if (currentImg) currentImg.src = imgSrc;
    if (currentDesc) currentDesc.innerHTML = desc + '<br>';
    
    // 更新激活样式
    costumeItems.forEach(item => item.classList.remove('active'));
    selectedItem.classList.add('active');
}

// 3. 滑动缩略图列表
function scrollCostumeThumbnails(direction) {
    const slider = document.getElementById('costumeSlider');
    if (!slider) return;
    
    const scrollAmount = 120;
    if (direction === 'prev') {
        slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else if (direction === 'next') {
        slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}

// 4. 获取当前服装信息（供外部弹窗调用）
function getCurrentCostumeInfo() {
    return {
        imgSrc: costumeSliderData.currentModalImg,
        title: costumeSliderData.currentTitle
    };
}

// 5. 图片模态框弹窗函数
function openImageModal(imageUrl, titleText) {
    let existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    
    modal.innerHTML = `
        <div class="modal-content-wrapper">
            <span class="close-modal">&times;</span>
            <img class="modal-image" src="${imageUrl}" alt="${titleText}" onerror="this.src='https://placehold.co/800x600?text=戏韵·华服待展'">
            <div class="modal-caption">
                <i class="fas fa-feather-alt"></i> ${titleText || '梨园瑰宝'}
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    modal.style.display = 'block';
    
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.onclick = function() {
        modal.style.display = 'none';
        setTimeout(() => modal.remove(), 200);
    };
    
    modal.onclick = function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            setTimeout(() => modal.remove(), 200);
        }
    };
    
    const escHandler = function(e) {
        if (e.key === 'Escape') {
            if (modal && modal.style.display === 'block') {
                modal.style.display = 'none';
                setTimeout(() => modal.remove(), 200);
                document.removeEventListener('keydown', escHandler);
            }
        }
    };
    document.addEventListener('keydown', escHandler);
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initCostumeSlider();
});